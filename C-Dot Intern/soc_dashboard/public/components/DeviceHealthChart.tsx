import React, { useRef, useEffect } from 'react';
import { DeviceHealthBucket } from '../types';

interface DeviceHealthChartProps {
  theme: 'dark' | 'light';
  data: DeviceHealthBucket[];
  loading: boolean;
  error: string | null;
}

const HEALTH_COLORS: Record<string, string> = {
  Online: '#00FF88',
  Warning: '#FF9100',
  Critical: '#FF1744',
  Offline: '#EF4444', // slightly dimmer red for offline vs critical
};

function drawDonutChart(canvas: HTMLCanvasElement, data: DeviceHealthBucket[], theme: 'dark' | 'light') {
  const isLight = theme === 'light';
  const textColor = isLight ? '#4B5563' : '#6B7280';
  const borderColor = isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 26, 0.8)';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  const total = data.reduce((sum, d) => sum + d.count, 0);
  if (total === 0) {
    ctx.fillStyle = textColor;
    ctx.font = '12px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No health data available', w / 2, h / 2);
    return;
  }

  const cx = w / 2;
  const cy = h / 2 - 10;
  const outerR = Math.min(cx, cy) - 15;
  const innerR = outerR * 0.65; // Thinner donut

  let startAngle = -Math.PI / 2;

  data.forEach((d) => {
    if (d.count === 0) return;
    const sliceAngle = (d.count / total) * Math.PI * 2;
    const color = HEALTH_COLORS[d.status] || '#6B7280';

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Segment gap
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    startAngle += sliceAngle;
  });

  // Calculate percentage of online
  const onlineCount = data.find(d => d.status === 'Online')?.count || 0;
  const pct = Math.round((onlineCount / total) * 100);

  // Center text
  ctx.fillStyle = pct >= 90 ? '#00FF88' : pct >= 70 ? '#FF9100' : '#FF1744';
  ctx.font = 'bold 24px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${pct}%`, cx, cy - 4);
  ctx.fillStyle = isLight ? '#4B5563' : '#9CA3AF';
  ctx.font = '10px "Arial", sans-serif';
  ctx.fillText('HEALTHY', cx, cy + 14);
}

export const DeviceHealthChart: React.FC<DeviceHealthChartProps> = ({ theme, data, loading, error }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      drawDonutChart(canvas, data, theme);
    };

    draw();

    const ro = new ResizeObserver(() => {
      draw();
    });
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    } else {
      ro.observe(canvas);
    }

    return () => ro.disconnect();
  }, [data, theme]);

  if (error) {
    return (
      <div className="soc-panel">
        <div className="soc-section-title">Device Health</div>
        <div className="soc-error-panel">
          <div className="soc-error-icon">⚠</div>
          <div className="soc-error-title">Data Unavailable</div>
          <div className="soc-error-message">{error}</div>
        </div>
      </div>
    );
  }

  // Ensure all standard statuses exist in legend
  const allStatuses = ['Online', 'Warning', 'Critical', 'Offline'];
  const legendData = allStatuses.map(status => {
    const item = data.find(d => d.status === status);
    return { status, count: item ? item.count : 0 };
  }).filter(d => d.count > 0 || ['Online', 'Offline'].includes(d.status));

  return (
    <div className="soc-panel soc-fade-in">
      <div className="soc-section-title">Device Health</div>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} className="soc-chart-canvas-sm" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }} />
        {loading && (
          <div className="soc-loading" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11,15,26,0.3)' }}>
            <div className="soc-loading-spinner" />
          </div>
        )}
      </div>
      <div className="soc-legend">
        {legendData.map((d) => (
          <div key={d.status} className="soc-legend-item">
            <span className="soc-legend-dot" style={{ background: HEALTH_COLORS[d.status] || '#6B7280' }} />
            {d.status}
            <span className="soc-legend-count">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
