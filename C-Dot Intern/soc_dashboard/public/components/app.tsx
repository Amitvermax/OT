import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  SummaryData,
  AlertTrendPoint,
  SeverityBucket,
  DeviceTypeBucket,
  DeviceHealthBucket,
  LogSourceBucket,
  FilterState,
  FilterOptions,
} from '../types';
import { HeaderBar } from './HeaderBar';
import { SummaryCards } from './SummaryCards';
import { AlertTrendChart } from './AlertTrendChart';
import { SeverityPieChart } from './SeverityPieChart';
import { DeviceDistributionChart } from './DeviceDistributionChart';
import { DeviceHealthChart } from './DeviceHealthChart';
import { LogsBySourceChart } from './LogsBySourceChart';

// ===== TIME RANGE PRESETS =====
const TIME_RANGES: Record<string, number> = {
  '15m': 15 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000,
};

export const SocDashboardApp: React.FC<{ http: any; notifications: any }> = ({ http, notifications }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // ── Filter state ──
  const [filters, setFilters] = useState<FilterState>({
    timeRange: '24h',
    deviceType: '',
    site: '',
    severity: '',
  });
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ types: [], sites: [], severities: [] });

  // ── Data state ──
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [alertTrend, setAlertTrend] = useState<AlertTrendPoint[]>([]);
  const [severityDist, setSeverityDist] = useState<SeverityBucket[]>([]);
  const [deviceDist, setDeviceDist] = useState<DeviceTypeBucket[]>([]);
  const [deviceHealth, setDeviceHealth] = useState<DeviceHealthBucket[]>([]);
  const [logSources, setLogSources] = useState<LogSourceBucket[]>([]);

  // ── Error state (per-widget) ──
  const [errors, setErrors] = useState<Record<string, string | null>>({
    summary: null,
    alertTrend: null,
    severity: null,
    deviceDist: null,
    deviceHealth: null,
    logSources: null,
    filters: null,
  });

  // ── Loading state ──
  const [loading, setLoading] = useState<Record<string, boolean>>({
    summary: true,
    alertTrend: true,
    severity: true,
    deviceDist: true,
    deviceHealth: true,
    logSources: true,
  });

  // ── Auto refresh ──
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const [alertTrendInterval, setAlertTrendInterval] = useState('24h');
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const refreshTimerRef = useRef<any>(null);

  // Build filter body for API calls
  const buildFilterBody = useCallback(() => {
    const body: any = {};
    const ms = TIME_RANGES[filters.timeRange];
    if (ms) {
      body.time_gte = new Date(Date.now() - ms).toISOString();
    }
    if (filters.deviceType) body.device_type = filters.deviceType;
    if (filters.site) body.site = filters.site;
    if (filters.severity) body.severity = filters.severity;
    return body;
  }, [filters]);

  // ── Fetch filter options (device types, sites, severities) ──
  const fetchFilterOptions = useCallback(async () => {
    try {
      const result = await http.post('/api/soc_dashboard/devices', {
        body: JSON.stringify({}),
      });
      setFilterOptions({
        types: result.types || [],
        sites: result.sites || [],
        severities: result.severities || [],
      });
      setErrors((prev) => ({ ...prev, filters: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Filter options fetch error:', err);
      setErrors((prev) => ({ ...prev, filters: err.message || 'Failed to fetch filter options' }));
    }
  }, [http]);

  // ── Fetch summary ──
  const fetchSummary = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, summary: true }));
      const result = await http.post('/api/soc_dashboard/summary', {
        body: JSON.stringify(buildFilterBody()),
      });
      setSummary(result);
      setErrors((prev) => ({ ...prev, summary: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Summary fetch error:', err);
      setErrors((prev) => ({ ...prev, summary: err.message || 'Failed to fetch summary data' }));
    } finally {
      setLoading((prev) => ({ ...prev, summary: false }));
    }
  }, [http, buildFilterBody]);

  // ── Fetch alert trend ──
  const fetchAlertTrend = useCallback(async (interval: string = alertTrendInterval) => {
    try {
      setLoading((prev) => ({ ...prev, alertTrend: true }));
      const filterBody = buildFilterBody();
      const result = await http.post('/api/soc_dashboard/alert_trend', {
        body: JSON.stringify({ ...filterBody, interval }),
      });
      setAlertTrend(result.trend || []);
      setErrors((prev) => ({ ...prev, alertTrend: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Alert trend fetch error:', err);
      setErrors((prev) => ({ ...prev, alertTrend: err.message || 'Failed to fetch alert trend' }));
    } finally {
      setLoading((prev) => ({ ...prev, alertTrend: false }));
    }
  }, [http, buildFilterBody, alertTrendInterval]);

  // ── Fetch severity distribution ──
  const fetchSeverityDist = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, severity: true }));
      const result = await http.post('/api/soc_dashboard/severity_distribution', {
        body: JSON.stringify(buildFilterBody()),
      });
      setSeverityDist(result.distribution || []);
      setErrors((prev) => ({ ...prev, severity: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Severity distribution fetch error:', err);
      setErrors((prev) => ({ ...prev, severity: err.message || 'Failed to fetch severity distribution' }));
    } finally {
      setLoading((prev) => ({ ...prev, severity: false }));
    }
  }, [http, buildFilterBody]);

  // ── Fetch device distribution ──
  const fetchDeviceDist = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, deviceDist: true }));
      const result = await http.post('/api/soc_dashboard/device_distribution', {
        body: JSON.stringify(buildFilterBody()),
      });
      setDeviceDist(result.distribution || []);
      setErrors((prev) => ({ ...prev, deviceDist: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Device distribution fetch error:', err);
      setErrors((prev) => ({ ...prev, deviceDist: err.message || 'Failed to fetch device distribution' }));
    } finally {
      setLoading((prev) => ({ ...prev, deviceDist: false }));
    }
  }, [http, buildFilterBody]);

  // ── Fetch device health ──
  const fetchDeviceHealth = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, deviceHealth: true }));
      const result = await http.post('/api/soc_dashboard/device_health', {
        body: JSON.stringify(buildFilterBody()),
      });
      setDeviceHealth(result.health || []);
      setErrors((prev) => ({ ...prev, deviceHealth: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Device health fetch error:', err);
      setErrors((prev) => ({ ...prev, deviceHealth: err.message || 'Failed to fetch device health' }));
    } finally {
      setLoading((prev) => ({ ...prev, deviceHealth: false }));
    }
  }, [http, buildFilterBody]);

  // ── Fetch logs by source ──
  const fetchLogSources = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, logSources: true }));
      const result = await http.post('/api/soc_dashboard/logs_by_source', {
        body: JSON.stringify(buildFilterBody()),
      });
      setLogSources(result.sources || []);
      setErrors((prev) => ({ ...prev, logSources: null }));
    } catch (err: any) {
      console.error('SOC Dashboard — Logs by source fetch error:', err);
      setErrors((prev) => ({ ...prev, logSources: err.message || 'Failed to fetch logs by source' }));
    } finally {
      setLoading((prev) => ({ ...prev, logSources: false }));
    }
  }, [http, buildFilterBody]);

  // ── Refresh all data ──
  const refreshAll = useCallback(() => {
    setLastRefresh(new Date());
    setCountdown(10);
    fetchSummary();
    fetchAlertTrend(alertTrendInterval);
    fetchSeverityDist();
    fetchDeviceDist();
    fetchDeviceHealth();
    fetchLogSources();
  }, [fetchSummary, fetchAlertTrend, fetchSeverityDist, fetchDeviceDist, fetchDeviceHealth, fetchLogSources, alertTrendInterval]);

  // ── Initial load ──
  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  // ── Fetch data when filters change ──
  useEffect(() => {
    refreshAll();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto refresh countdown ──
  useEffect(() => {
    if (autoRefresh) {
      refreshTimerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            refreshAll();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [autoRefresh, refreshAll]);

  // ── Handle alert trend interval change ──
  const handleAlertTrendIntervalChange = useCallback((interval: string) => {
    setAlertTrendInterval(interval);
    fetchAlertTrend(interval);
  }, [fetchAlertTrend]);

  return (
    <div className={`soc-root soc-theme-${theme}`}>
      <HeaderBar
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        filters={filters}
        filterOptions={filterOptions}
        onFiltersChange={setFilters}
        autoRefresh={autoRefresh}
        countdown={countdown}
        onToggleAutoRefresh={() => setAutoRefresh((p) => !p)}
        onManualRefresh={refreshAll}
        lastRefresh={lastRefresh}
      />

      <div className="soc-main">
        {/* ── Summary Cards ── */}
        <SummaryCards
          data={summary}
          loading={loading.summary}
          error={errors.summary}
        />

        {/* ── Charts Row 1: Alert Trend + Severity Distribution ── */}
        <div className="soc-charts-row">
          <AlertTrendChart
            theme={theme}
            data={alertTrend}
            loading={loading.alertTrend}
            error={errors.alertTrend}
            activeInterval={alertTrendInterval}
            onIntervalChange={handleAlertTrendIntervalChange}
          />
          <SeverityPieChart
            theme={theme}
            data={severityDist}
            loading={loading.severity}
            error={errors.severity}
          />
        </div>

        {/* ── Charts Row 2: Device Distribution + Device Health + Logs by Source ── */}
        <div className="soc-charts-row-3">
          <DeviceDistributionChart
            theme={theme}
            data={deviceDist}
            loading={loading.deviceDist}
            error={errors.deviceDist}
          />
          <DeviceHealthChart
            theme={theme}
            data={deviceHealth}
            loading={loading.deviceHealth}
            error={errors.deviceHealth}
          />
          <LogsBySourceChart
            theme={theme}
            data={logSources}
            loading={loading.logSources}
            error={errors.logSources}
          />
        </div>
      </div>

      {/* ── Original Footer (Commented out for easy undo) ── */}
      {/*
      <div className="soc-footer">
        <div className="soc-footer-items">
          <div className="soc-footer-item">
            Plugin: <span className="val">SOC Dashboard v1.0</span>
          </div>
          <div className="soc-footer-item">
            Index: <span className="val">rtu-events</span>
          </div>
          <div className="soc-footer-item">
            Last Refresh: <span className="val">{lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>
        <div style={{ fontSize: 10, color: '#6B7280' }}>
          त्रिनेत्र OT Security Platform
        </div>
      </div>
      */}

      {/* ── Customized Footer ── */}
      <div className="soc-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderTop: '1px solid var(--soc-border)', background: 'var(--soc-footer-bg)' }}>
        <div className="soc-footer-left" style={{ fontSize: 12, color: 'var(--soc-text-dim)', maxWidth: '60%', lineHeight: '1.4' }}>
          <strong>OT Powerplant SOC Dashboard:</strong> Real-time monitoring of operational technology infrastructure, security events, and device health across the powerplant.
        </div>
        <div className="soc-footer-right" style={{ fontSize: 12, display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div className="soc-footer-item">
            Selected Device: <strong style={{ color: 'var(--soc-text)', marginLeft: '6px' }}>{filters.deviceType || 'All Devices'}</strong>
          </div>
          <div className="soc-footer-item">
            Status: <span style={{ color: 'var(--soc-green)', marginLeft: '6px' }}>Active</span>
          </div>
          <div className="soc-footer-item" style={{ color: 'var(--soc-text-dim)' }}>
            Last Refresh: {lastRefresh.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};
