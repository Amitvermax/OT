import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

export interface SocDashboardPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SocDashboardPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}

// ===== Data Model Types =====

export interface SummaryData {
  totalDevices: number;
  onlineDevices: number;
  offlineDevices: number;
  totalAlertsToday: number;
  criticalAlerts: number;
  totalLogsToday: number;
  eps: number;
  datadiodeStatus: string;
  opensearchStatus: string;
}

export interface AlertTrendPoint {
  timestamp: string;
  count: number;
}

export interface SeverityBucket {
  severity: string;
  count: number;
}

export interface DeviceTypeBucket {
  type: string;
  count: number;
}

export interface DeviceHealthBucket {
  status: string;
  count: number;
}

export interface LogSourceBucket {
  source: string;
  count: number;
}

export interface FilterState {
  timeRange: string;
  deviceType: string;
  site: string;
  severity: string;
}

export interface FilterOptions {
  types: string[];
  sites: string[];
  severities: string[];
}
