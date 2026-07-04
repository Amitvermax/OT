import React, { useRef, useEffect } from 'react';
import { DeviceTypeBucket } from '../types';

interface DeviceDistributionChartProps {
  theme: 'dark' | 'light';
  data: DeviceTypeBucket[];
  loading: boolean;
  error: string | null;
}

const BAR_COLORS = [
  '#00E5FF', '#2979FF', '#B388FF', '#FF1744', '#FF9100', '#FFD600', '#00FF88', '#1DE9B6',
];

function drawBarChart(canvas: HTMLCanvasElement, data: DeviceTypeBucket[], theme: 'dark' | 'light') {
  const isLight = theme === 'light';
  const textColor = isLight ? '#4B5563' : '#9CA3AF';
  const valColor = isLight ? '#111827' : '#E5E7EB';
  const barBg = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  if (data.length === 0) {
    ctx.fillStyle = textColor;
    ctx.font = '12px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No device data available', w / 2, h / 2);
    return;
  }

  const pad = { top: 20, right: 30, bottom: 20, left: 90 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  // Horizontal bar chart
  const barHeight = Math.min(24, (ch / data.length) * 0.7);
  const rowHeight = ch / data.length;

  const maxV = Math.max(...data.map(d => d.count), 1);

  ctx.font = '10px "Arial", sans-serif';
  ctx.textBaseline = 'middle';

  data.forEach((d, i) => {
    const y = pad.top + (i * rowHeight) + (rowHeight / 2);
    const barWidth = (d.count / maxV) * cw;
    const color = BAR_COLORS[i % BAR_COLORS.length];

    // Label
    ctx.fillStyle = textColor;
    ctx.textAlign = 'right';
    // Truncate label if too long
    let label = d.type;
    if (label.length > 12) label = label.substring(0, 10) + '..';
    ctx.fillText(label, pad.left - 10, y);

    // Bar background
    ctx.fillStyle = barBg;
    ctx.beginPath();
    ctx.roundRect(pad.left, y - barHeight / 2, cw, barHeight, 4);
    ctx.fill();

    // Bar fill
    if (barWidth > 0) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(pad.left, y - barHeight / 2, Math.max(4, barWidth), barHeight, 4);
      ctx.fill();
    }

    // Value text
    ctx.fillStyle = valColor;
    ctx.textAlign = 'left';
    ctx.fillText(d.count.toString(), pad.left + Math.max(10, barWidth) + 8, y);
  });
}

export const DeviceDistributionChart: React.FC<DeviceDistributionChartProps> = ({ theme, data, loading, error }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      drawBarChart(canvas, data, theme);
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
        <div className="soc-section-title">Device Distribution</div>
        <div className="soc-error-panel">
          <div className="soc-error-icon">⚠</div>
          <div className="soc-error-title">Data Unavailable</div>
          <div className="soc-error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="soc-panel soc-fade-in">
      <div className="soc-section-title">Device Distribution</div>
      <div style={{ position: 'relative' }}>
        <canvas ref={canvasRef} className="soc-chart-canvas-sm" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }} />
        {loading && (
          <div className="soc-loading" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11,15,26,0.3)' }}>
            <div className="soc-loading-spinner" />
          </div>
        )}
      </div>
    </div>
  );
};
