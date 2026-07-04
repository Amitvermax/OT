import React from 'react';
import { SummaryData } from '../types';

interface SummaryCardsProps {
  data: SummaryData | null;
  loading: boolean;
  error: string | null;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data, loading, error }) => {
  const renderValue = (value: any, colorClass: string, suffix?: string) => {
    if (error) {
      return <span className="soc-card-error">⚠ Error</span>;
    }
    if (loading || data === null) {
      return <div className="soc-shimmer" />;
    }
    return (
      <span className={`soc-summary-card-value ${colorClass}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix && <span style={{ fontSize: 11, marginLeft: 2, fontWeight: 400 }}>{suffix}</span>}
      </span>
    );
  };

  const renderStatus = (status: string) => {
    if (error) {
      return <span className="soc-card-error">⚠ Error</span>;
    }
    if (loading || data === null) {
      return <div className="soc-shimmer" />;
    }
    const isOnline = status === 'Online';
    return (
      <span className={`soc-status-indicator ${isOnline ? 'online' : 'offline'}`}>
        <span className={`soc-status-dot ${isOnline ? 'green' : 'red'}`} style={{ width: 8, height: 8, marginRight: 0 }} />
        {status}
      </span>
    );
  };

  return (
    <div className="soc-summary-row soc-fade-in">
      {/* Assets Group */}
      <div className="soc-summary-group assets">
        <div className="soc-summary-group-title">
          <span className="icon">🖥</span> Assets
        </div>
        <div className="soc-summary-cards">
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Total Devices</span>
            {renderValue(data?.totalDevices, 'cyan')}
          </div>
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Online Devices</span>
            {renderValue(data?.onlineDevices, 'green')}
          </div>
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Offline Devices</span>
            {renderValue(data?.offlineDevices, 'red')}
          </div>
        </div>
        {error && <div className="soc-card-error" style={{ marginTop: 8, fontSize: 10 }}>⚠ {error}</div>}
      </div>

      {/* Security Group */}
      <div className="soc-summary-group security">
        <div className="soc-summary-group-title">
          <span className="icon">🛡</span> Security
        </div>
        <div className="soc-summary-cards">
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Total Alerts Today</span>
            {renderValue(data?.totalAlertsToday, 'orange')}
          </div>
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Critical Alerts</span>
            {renderValue(data?.criticalAlerts, 'red')}
          </div>
        </div>
        {error && <div className="soc-card-error" style={{ marginTop: 8, fontSize: 10 }}>⚠ {error}</div>}
      </div>

      {/* Log Statistics Group */}
      <div className="soc-summary-group logs">
        <div className="soc-summary-group-title">
          <span className="icon">📊</span> Log Statistics
        </div>
        <div className="soc-summary-cards">
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Total Logs Today</span>
            {renderValue(data?.totalLogsToday, 'green')}
          </div>
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Events Per Second</span>
            {renderValue(data?.eps, 'cyan', 'EPS')}
          </div>
        </div>
        {error && <div className="soc-card-error" style={{ marginTop: 8, fontSize: 10 }}>⚠ {error}</div>}
      </div>

      {/* Infrastructure Group */}
      <div className="soc-summary-group infra">
        <div className="soc-summary-group-title">
          <span className="icon">⚙</span> Infrastructure
        </div>
        <div className="soc-summary-cards">
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">Data Diode Status</span>
            {renderStatus(data?.datadiodeStatus || '')}
          </div>
          <div className="soc-summary-card">
            <span className="soc-summary-card-label">OpenSearch Status</span>
            {renderStatus(data?.opensearchStatus || '')}
          </div>
        </div>
        {error && <div className="soc-card-error" style={{ marginTop: 8, fontSize: 10 }}>⚠ {error}</div>}
      </div>
    </div>
  );
};
