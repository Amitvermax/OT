import { schema } from '@osd/config-schema';
import https from 'https';
import { OPENSEARCH_HOST, OPENSEARCH_USERNAME, RTU_EVENTS_INDEX } from '../../common';

// Skip TLS verification for self-signed certs
const agent = new https.Agent({ rejectUnauthorized: false });

function queryOpenSearch(path: string, method: string, body: any, credentials: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = new URL(path, OPENSEARCH_HOST);
    const postData = body ? JSON.stringify(body) : '';

    const req = https.request(
      {
        hostname: url.hostname,
        port: url.port || 9200,
        path: url.pathname + (url.search || ''),
        method,
        agent,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${credentials}`,
          ...(postData ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse OpenSearch response: ${data.substring(0, 200)}`));
          }
        });
      }
    );

    req.on('error', (err) => reject(err));
    if (postData) req.write(postData);
    req.end();
  });
}

function getCredentials(): string {
  const password = process.env.OPENSEARCH_PASSWORD || 'cdot@siem@123';
  return Buffer.from(`${OPENSEARCH_USERNAME}:${password}`).toString('base64');
}

// Build bool filter array from common filter params
function buildFilters(body: any): any[] {
  const filters: any[] = [];

  // Time range
  if (body.time_gte || body.time_lte) {
    const rangeFilter: any = {};
    if (body.time_gte) rangeFilter.gte = body.time_gte;
    if (body.time_lte) rangeFilter.lte = body.time_lte;
    filters.push({ range: { '@timestamp': rangeFilter } });
  }

  // Device type filter
  if (body.device_type) {
    filters.push({ term: { 'device.type': body.device_type } });
  }

  // Site filter
  if (body.site) {
    filters.push({ term: { 'device.site': body.site } });
  }

  // Severity filter
  if (body.severity) {
    filters.push({ term: { 'event.severity': body.severity } });
  }

  return filters;
}

function buildQuery(filters: any[]): any {
  return filters.length > 0 ? { bool: { filter: filters } } : { match_all: {} };
}

// Common filter schema for POST routes
const filterSchema = schema.object({
  time_gte: schema.maybe(schema.string()),
  time_lte: schema.maybe(schema.string()),
  device_type: schema.maybe(schema.string()),
  site: schema.maybe(schema.string()),
  severity: schema.maybe(schema.string()),
});

export function defineRoutes(router: any) {
  const credentials = getCredentials();

  // ── Summary card data ──
  router.post(
    {
      path: '/api/soc_dashboard/summary',
      validate: { body: filterSchema },
    },
    async (context: any, request: any, response: any) => {
      try {
        const filters = buildFilters(request.body);

        // Today filter for "today" metrics
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayFilters = [
          ...filters.filter((f: any) => !f.range || !f.range['@timestamp']),
          { range: { '@timestamp': { gte: todayStart.toISOString() } } },
        ];

        // 1. Total devices + online/offline (cardinality + terms on status)
        const deviceAgg = {
          query: buildQuery(filters),
          size: 0,
          aggs: {
            total_devices: { cardinality: { field: 'device.id' } },
            by_status: { terms: { field: 'status', size: 10 } },
            unique_devices_with_status: {
              terms: { field: 'device.id', size: 500 },
              aggs: {
                latest: {
                  top_hits: {
                    size: 1,
                    sort: [{ '@timestamp': { order: 'desc' } }],
                    _source: ['status', 'device.id'],
                  },
                },
              },
            },
          },
        };

        // 2. Alerts today + critical alerts
        const alertAgg = {
          query: buildQuery(todayFilters),
          size: 0,
          aggs: {
            total_alerts: {
              filter: { exists: { field: 'event.severity' } },
            },
            critical_alerts: {
              filter: { term: { 'event.severity': 'CRITICAL' } },
            },
          },
        };

        // 3. Total logs today + EPS calculation
        const logsAgg = {
          query: buildQuery(todayFilters),
          size: 0,
          aggs: {
            log_count: { value_count: { field: '@timestamp' } },
            min_time: { min: { field: '@timestamp' } },
            max_time: { max: { field: '@timestamp' } },
          },
        };

        const [deviceResult, alertResult, logsResult] = await Promise.all([
          queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', deviceAgg, credentials),
          queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', alertAgg, credentials),
          queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', logsAgg, credentials),
        ]);

        // Process device status from latest records per device
        let onlineCount = 0;
        let offlineCount = 0;
        let totalDevices = 0;
        const deviceBuckets = deviceResult?.aggregations?.unique_devices_with_status?.buckets || [];
        totalDevices = deviceBuckets.length || deviceResult?.aggregations?.total_devices?.value || 0;
        deviceBuckets.forEach((bucket: any) => {
          const latestStatus = bucket?.latest?.hits?.hits?.[0]?._source?.status;
          if (latestStatus === 'Online') onlineCount++;
          else offlineCount++;
        });

        // If no buckets, fallback to total_devices count
        if (totalDevices === 0) {
          totalDevices = deviceResult?.aggregations?.total_devices?.value || 0;
        }

        // Alerts
        const totalAlertsToday = alertResult?.aggregations?.total_alerts?.doc_count || 0;
        const criticalAlerts = alertResult?.aggregations?.critical_alerts?.doc_count || 0;

        // Logs
        const totalLogsToday = logsResult?.aggregations?.log_count?.value || logsResult?.hits?.total?.value || 0;
        const minTime = logsResult?.aggregations?.min_time?.value || 0;
        const maxTime = logsResult?.aggregations?.max_time?.value || 0;
        const timeSpanSeconds = (maxTime - minTime) / 1000;
        const eps = timeSpanSeconds > 0 ? Math.round((totalLogsToday / timeSpanSeconds) * 100) / 100 : 0;

        // Infrastructure status checks
        let opensearchStatus = 'Online';
        try {
          const clusterHealth = await queryOpenSearch('/_cluster/health', 'GET', null, credentials);
          opensearchStatus = clusterHealth?.status === 'red' ? 'Critical' : 'Online';
        } catch {
          opensearchStatus = 'Offline';
        }

        return response.ok({
          body: {
            totalDevices,
            onlineDevices: onlineCount,
            offlineDevices: offlineCount,
            totalAlertsToday,
            criticalAlerts,
            totalLogsToday,
            eps,
            datadiodeStatus: 'Online', // Placeholder — real diode status would come from a separate source
            opensearchStatus,
          },
        });
      } catch (error: any) {
        console.error('SOC Dashboard — summary fetch error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch summary data' },
        });
      }
    }
  );

  // ── Alert Trend (time-bucketed) ──
  router.post(
    {
      path: '/api/soc_dashboard/alert_trend',
      validate: {
        body: schema.object({
          time_gte: schema.maybe(schema.string()),
          time_lte: schema.maybe(schema.string()),
          device_type: schema.maybe(schema.string()),
          site: schema.maybe(schema.string()),
          severity: schema.maybe(schema.string()),
          interval: schema.string({ defaultValue: '1h' }),
        }),
      },
    },
    async (context: any, request: any, response: any) => {
      try {
        const filters = buildFilters(request.body);
        const interval = request.body.interval;

        // Map interval labels to calendar_interval values
        let calendarInterval = '5m';
        let timeGte = request.body.time_gte;
        if (interval === '1h') {
          calendarInterval = '5m';
          if (!timeGte) timeGte = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        } else if (interval === '24h') {
          calendarInterval = '1h';
          if (!timeGte) timeGte = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        } else if (interval === '7d') {
          calendarInterval = '1d';
          if (!timeGte) timeGte = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        }

        // Ensure time filter exists
        const timeFilters = filters.filter((f: any) => !f.range || !f.range['@timestamp']);
        timeFilters.push({ range: { '@timestamp': { gte: timeGte } } });

        const searchBody = {
          query: buildQuery(timeFilters),
          size: 0,
          aggs: {
            alert_trend: {
              date_histogram: {
                field: '@timestamp',
                fixed_interval: calendarInterval,
                min_doc_count: 0,
                extended_bounds: {
                  min: timeGte,
                  max: request.body.time_lte || new Date().toISOString(),
                },
              },
            },
          },
        };

        const result = await queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', searchBody, credentials);

        if (result.error) {
          console.error('SOC Dashboard — alert_trend error:', JSON.stringify(result.error));
          return response.customError({
            statusCode: result.status || 500,
            body: { message: result.error?.reason || 'Alert trend query failed' },
          });
        }

        const buckets = result?.aggregations?.alert_trend?.buckets || [];
        const trendData = buckets.map((b: any) => ({
          timestamp: b.key_as_string,
          count: b.doc_count,
        }));

        return response.ok({ body: { trend: trendData } });
      } catch (error: any) {
        console.error('SOC Dashboard — alert_trend error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch alert trend' },
        });
      }
    }
  );

  // ── Severity Distribution ──
  router.post(
    {
      path: '/api/soc_dashboard/severity_distribution',
      validate: { body: filterSchema },
    },
    async (context: any, request: any, response: any) => {
      try {
        const filters = buildFilters(request.body);
        const searchBody = {
          query: buildQuery(filters),
          size: 0,
          aggs: {
            severity: {
              terms: { field: 'event.severity', size: 10 },
            },
          },
        };

        const result = await queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', searchBody, credentials);

        if (result.error) {
          console.error('SOC Dashboard — severity_distribution error:', JSON.stringify(result.error));
          return response.customError({
            statusCode: result.status || 500,
            body: { message: result.error?.reason || 'Severity distribution query failed' },
          });
        }

        const buckets = result?.aggregations?.severity?.buckets || [];
        const distribution = buckets.map((b: any) => ({
          severity: b.key,
          count: b.doc_count,
        }));

        return response.ok({ body: { distribution } });
      } catch (error: any) {
        console.error('SOC Dashboard — severity_distribution error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch severity distribution' },
        });
      }
    }
  );

  // ── Device Distribution ──
  router.post(
    {
      path: '/api/soc_dashboard/device_distribution',
      validate: { body: filterSchema },
    },
    async (context: any, request: any, response: any) => {
      try {
        const filters = buildFilters(request.body);
        const searchBody = {
          query: buildQuery(filters),
          size: 0,
          aggs: {
            device_types: {
              terms: { field: 'device.type', size: 20 },
            },
          },
        };

        const result = await queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', searchBody, credentials);

        if (result.error) {
          console.error('SOC Dashboard — device_distribution error:', JSON.stringify(result.error));
          return response.customError({
            statusCode: result.status || 500,
            body: { message: result.error?.reason || 'Device distribution query failed' },
          });
        }

        const buckets = result?.aggregations?.device_types?.buckets || [];
        const distribution = buckets.map((b: any) => ({
          type: b.key,
          count: b.doc_count,
        }));

        return response.ok({ body: { distribution } });
      } catch (error: any) {
        console.error('SOC Dashboard — device_distribution error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch device distribution' },
        });
      }
    }
  );

  // ── Device Health ──
  router.post(
    {
      path: '/api/soc_dashboard/device_health',
      validate: { body: filterSchema },
    },
    async (context: any, request: any, response: any) => {
      try {
        const filters = buildFilters(request.body);
        // Get latest status for each device
        const searchBody = {
          query: buildQuery(filters),
          size: 0,
          aggs: {
            devices: {
              terms: { field: 'device.id', size: 500 },
              aggs: {
                latest: {
                  top_hits: {
                    size: 1,
                    sort: [{ '@timestamp': { order: 'desc' } }],
                    _source: ['status'],
                  },
                },
              },
            },
          },
        };

        const result = await queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', searchBody, credentials);

        if (result.error) {
          console.error('SOC Dashboard — device_health error:', JSON.stringify(result.error));
          return response.customError({
            statusCode: result.status || 500,
            body: { message: result.error?.reason || 'Device health query failed' },
          });
        }

        // Count by status from latest record per device
        const statusCounts: Record<string, number> = { Online: 0, Offline: 0, Warning: 0, Critical: 0 };
        const deviceBuckets = result?.aggregations?.devices?.buckets || [];
        deviceBuckets.forEach((bucket: any) => {
          const latestStatus = bucket?.latest?.hits?.hits?.[0]?._source?.status || 'Offline';
          if (statusCounts[latestStatus] !== undefined) {
            statusCounts[latestStatus]++;
          } else {
            statusCounts[latestStatus] = 1;
          }
        });

        const health = Object.entries(statusCounts).map(([status, count]) => ({
          status,
          count,
        }));

        return response.ok({ body: { health } });
      } catch (error: any) {
        console.error('SOC Dashboard — device_health error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch device health' },
        });
      }
    }
  );

  // ── Logs by Source ──
  router.post(
    {
      path: '/api/soc_dashboard/logs_by_source',
      validate: { body: filterSchema },
    },
    async (context: any, request: any, response: any) => {
      try {
        const filters = buildFilters(request.body);
        const searchBody = {
          query: buildQuery(filters),
          size: 0,
          aggs: {
            by_source: {
              terms: { field: 'device.type', size: 20 },
            },
          },
        };

        const result = await queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', searchBody, credentials);

        if (result.error) {
          console.error('SOC Dashboard — logs_by_source error:', JSON.stringify(result.error));
          return response.customError({
            statusCode: result.status || 500,
            body: { message: result.error?.reason || 'Logs by source query failed' },
          });
        }

        const buckets = result?.aggregations?.by_source?.buckets || [];
        const sources = buckets.map((b: any) => ({
          source: b.key,
          count: b.doc_count,
        }));

        return response.ok({ body: { sources } });
      } catch (error: any) {
        console.error('SOC Dashboard — logs_by_source error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch logs by source' },
        });
      }
    }
  );

  // ── Devices list (for filter dropdowns) ──
  router.post(
    {
      path: '/api/soc_dashboard/devices',
      validate: { body: filterSchema },
    },
    async (context: any, request: any, response: any) => {
      try {
        const searchBody = {
          query: { match_all: {} },
          size: 0,
          aggs: {
            types: { terms: { field: 'device.type', size: 50 } },
            sites: { terms: { field: 'device.site', size: 50 } },
            severities: { terms: { field: 'event.severity', size: 10 } },
          },
        };

        const result = await queryOpenSearch(`/${RTU_EVENTS_INDEX}/_search`, 'POST', searchBody, credentials);

        if (result.error) {
          console.error('SOC Dashboard — devices error:', JSON.stringify(result.error));
          return response.customError({
            statusCode: result.status || 500,
            body: { message: result.error?.reason || 'Devices query failed' },
          });
        }

        const types = (result?.aggregations?.types?.buckets || []).map((b: any) => b.key);
        const sites = (result?.aggregations?.sites?.buckets || []).map((b: any) => b.key);
        const severities = (result?.aggregations?.severities?.buckets || []).map((b: any) => b.key);

        return response.ok({ body: { types, sites, severities } });
      } catch (error: any) {
        console.error('SOC Dashboard — devices fetch error:', error.message || error);
        return response.customError({
          statusCode: 500,
          body: { message: error.message || 'Failed to fetch device list' },
        });
      }
    }
  );

  // ── Health check ──
  router.get(
    {
      path: '/api/soc_dashboard/status',
      validate: false,
    },
    async (context: any, request: any, response: any) => {
      return response.ok({
        body: { status: 'ok', message: 'SOC Dashboard plugin is running' },
      });
    }
  );
}
