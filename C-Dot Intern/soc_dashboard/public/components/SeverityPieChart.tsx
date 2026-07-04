import React, { useRef, useEffect } from 'react';
import { SeverityBucket } from '../types';

interface SeverityPieChartProps {
  theme: 'dark' | 'light';
  data: SeverityBucket[];
  loading: boolean;
  error: string | null;
}

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: '#FF1744',
  HIGH: '#FF9100',
  MEDIUM: '#FFD600',
  LOW: '#00E5FF',
  INFORMATIONAL: '#B388FF',
  INFO: '#B388FF',
};

const SEVERITY_ORDER = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL', 'INFO'];

function drawDonutChart(canvas: HTMLCanvasElement, data: SeverityBucket[], theme: 'dark' | 'light') {
  const isLight = theme === 'light';
  const textColor = isLight ? '#4B5563' : '#6B7280';
  const centerColor = isLight ? '#111827' : '#E5E7EB';
  const borderColor = isLight ? 'rgba(255, 255, 255, 0.9)' : 'rgba(11, 15, 26, 0.6)';

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
    ctx.fillText('No severity data available', w / 2, h / 2);
    return;
  }

  const cx = w / 2;
  const cy = h / 2 - 5;
  const outerR = Math.min(cx, cy) - 20;
  const innerR = outerR * 0.55;

  let startAngle = -Math.PI / 2;

  // Sort by severity order
  const sortedData = [...data].sort((a, b) => {
    const ai = SEVERITY_ORDER.indexOf(a.severity);
    const bi = SEVERITY_ORDER.indexOf(b.severity);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  sortedData.forEach((d) => {
    const sliceAngle = (d.count / total) * Math.PI * 2;
    const color = SEVERITY_COLORS[d.severity] || '#6B7280';

    // Draw arc segment
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Segment border
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label if segment is big enough
    if (sliceAngle > 0.3) {
      const midAngle = startAngle + sliceAngle / 2;
      const labelR = (outerR + innerR) / 2;
      const lx = cx + Math.cos(midAngle) * labelR;
      const ly = cy + Math.sin(midAngle) * labelR;
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 11px "Arial", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(d.count.toString(), lx, ly);
    }

    startAngle += sliceAngle;
  });

  // Center text
  ctx.fillStyle = centerColor;
  ctx.font = 'bold 22px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total.toString(), cx, cy - 4);
  ctx.fillStyle = textColor;
  ctx.font = '10px "Arial", sans-serif';
  ctx.fillText('TOTAL', cx, cy + 14);
}

export const SeverityPieChart: React.FC<SeverityPieChartProps> = ({ theme, data, loading, error }) => {
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
        <div className="soc-section-title">Alert Severity Distribution</div>
        <div className="soc-error-panel">
          <div className="soc-error-icon">⚠</div>
          <div className="soc-error-title">Data Unavailable</div>
          <div className="soc-error-message">{error}</div>
        </div>
      </div>
    );
  }

  // Sort for legend
  const sortedData = [...data].sort((a, b) => {
    const ai = SEVERITY_ORDER.indexOf(a.severity);
    const bi = SEVERITY_ORDER.indexOf(b.severity);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <div className="soc-panel soc-fade-in">
      <div className="soc-section-title">Alert Severity Distribution</div>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} className="soc-chart-canvas" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }} />
        {loading && (
          <div className="soc-loading" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11,15,26,0.3)' }}>
            <div className="soc-loading-spinner" />
          </div>
        )}
      </div>
      <div className="soc-legend">
        {sortedData.map((d) => (
          <div key={d.severity} className="soc-legend-item">
            <span className="soc-legend-dot" style={{ background: SEVERITY_COLORS[d.severity] || '#6B7280' }} />
            {d.severity}
            <span className="soc-legend-count">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
