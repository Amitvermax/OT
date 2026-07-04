import React, { useState, useEffect } from 'react';
import { FilterState, FilterOptions } from '../types';

interface HeaderBarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  filters: FilterState;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: FilterState) => void;
  autoRefresh: boolean;
  countdown: number;
  onToggleAutoRefresh: () => void;
  onManualRefresh: () => void;
  lastRefresh: Date;
}

const TIME_RANGE_OPTIONS = [
  { value: '15m', label: '15 Min' },
  { value: '1h', label: '1 Hour' },
  { value: '6h', label: '6 Hours' },
  { value: '24h', label: '24 Hours' },
  { value: '7d', label: '7 Days' },
  { value: '30d', label: '30 Days' },
];

export const HeaderBar: React.FC<HeaderBarProps> = ({
  theme,
  onToggleTheme,
  filters,
  filterOptions,
  onFiltersChange,
  autoRefresh,
  countdown,
  onToggleAutoRefresh,
  onManualRefresh,
  lastRefresh,
}) => {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const time = now.toLocaleTimeString('en-IN', { hour12: false });
      setClock(`${date}  ${time}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <>
      {/* ── Main Header ── */}
      <div className="soc-header">
        <div className="soc-header-left">
          <div className="soc-header-title">
            ◈ Powerplant SOC Dashboard — OT Infrastructure Security
          </div>
        </div>
        <div className="soc-header-right">
          <div className="soc-clock">{clock}</div>
          <div
            className={`soc-auto-refresh-badge ${!autoRefresh ? 'paused' : ''}`}
            onClick={onToggleAutoRefresh}
            title={autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh PAUSED'}
          >
            <span className="soc-status-dot green" style={{ width: 6, height: 6, marginRight: 0, animation: autoRefresh ? 'soc-pulse-dot 1s ease-in-out infinite' : 'none', background: autoRefresh ? '#00FF88' : '#FF9100' }} />
            {autoRefresh ? `AUTO ${countdown}s` : 'PAUSED'}
          </div>
          <button className="soc-refresh-btn" onClick={onManualRefresh}>
            <span style={{ fontSize: 14 }}>⟳</span> REFRESH
          </button>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="soc-filter-bar">
        {/* Time Range */}
        <div className="soc-filter-group">
          <span className="soc-filter-label">Time Range</span>
          <select
            className="soc-filter-select"
            value={filters.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
          >
            {TIME_RANGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Device Type */}
        <div className="soc-filter-group">
          <span className="soc-filter-label">Device Type</span>
          <select
            className="soc-filter-select"
            value={filters.deviceType}
            onChange={(e) => handleFilterChange('deviceType', e.target.value)}
          >
            <option value="">All Types</option>
            {filterOptions.types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Site / Location */}
        <div className="soc-filter-group">
          <span className="soc-filter-label">Site / Location</span>
          <select
            className="soc-filter-select"
            value={filters.site}
            onChange={(e) => handleFilterChange('site', e.target.value)}
          >
            <option value="">All Sites</option>
            {filterOptions.sites.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Severity */}
        <div className="soc-filter-group">
          <span className="soc-filter-label">Severity</span>
          <select
            className="soc-filter-select"
            value={filters.severity}
            onChange={(e) => handleFilterChange('severity', e.target.value)}
          >
            <option value="">All Severities</option>
            {filterOptions.severities.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ flex: 1 }} />

        {/* Last refresh indicator */}
        <div style={{ fontSize: 10, color: '#6B7280', fontFamily: 'JetBrains Mono, monospace' }}>
          Last: {lastRefresh.toLocaleTimeString()}
        </div>
      </div>
    </>
  );
};
