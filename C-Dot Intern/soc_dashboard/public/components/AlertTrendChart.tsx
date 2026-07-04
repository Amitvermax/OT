import React, { useRef, useEffect, useState } from 'react';
import { AlertTrendPoint } from '../types';

interface AlertTrendChartProps {
  theme: 'dark' | 'light';
  data: AlertTrendPoint[];
  loading: boolean;
  error: string | null;
  activeInterval: string;
  onIntervalChange: (interval: string) => void;
}

const INTERVALS = [
  { value: '1h', label: 'Last 1 Hour' },
  { value: '24h', label: 'Last 24 Hours' },
  { value: '7d', label: 'Last 7 Days' },
];

function drawLineChart(canvas: HTMLCanvasElement, data: AlertTrendPoint[], theme: 'dark' | 'light') {
  const isLight = theme === 'light';
  const textColor = isLight ? '#4B5563' : '#6B7280';
  const gridColor = isLight ? 'rgba(209, 213, 219, 0.8)' : 'rgba(75, 85, 99, 0.25)';

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);

  if (data.length < 2) {
    ctx.fillStyle = textColor;
    ctx.font = '12px "Arial", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No alert data available', w / 2, h / 2);
    return;
  }

  const pad = { top: 20, right: 20, bottom: 40, left: 55 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  const counts = data.map((d) => d.count);
  const maxV = Math.max(...counts, 1);
  const minV = 0;
  const range = maxV - minV || 1;

  const toX = (i: number) => pad.left + (i / (data.length - 1)) * cw;
  const toY = (v: number) => pad.top + ch - ((v - minV) / range) * ch;

  // Grid lines + Y labels
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (ch / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();

    const val = maxV - (range / gridLines) * i;
    ctx.fillStyle = textColor;
    ctx.font = '10px "Arial", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(val).toString(), pad.left - 8, y + 4);
  }

  // X labels (show a few timestamps)
  ctx.fillStyle = textColor;
  ctx.font = '9px "Arial", sans-serif';
  ctx.textAlign = 'center';
  const labelInterval = Math.max(1, Math.floor(data.length / 6));
  for (let i = 0; i < data.length; i += labelInterval) {
    const date = new Date(data[i].timestamp);
    const label = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    ctx.fillText(label, toX(i), h - pad.bottom + 16);
  }

  // Area gradient fill
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(counts[0]));
  for (let i = 1; i < counts.length; i++) {
    // Smooth curve using bezier
    const prevX = toX(i - 1);
    const currX = toX(i);
    const cpX = (prevX + currX) / 2;
    ctx.bezierCurveTo(cpX, toY(counts[i - 1]), cpX, toY(counts[i]), currX, toY(counts[i]));
  }
  ctx.lineTo(toX(counts.length - 1), pad.top + ch);
  ctx.lineTo(toX(0), pad.top + ch);
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
  grad.addColorStop(0, 'rgba(0, 229, 255, 0.25)');
  grad.addColorStop(1, 'rgba(0, 229, 255, 0.02)');
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(toX(0), toY(counts[0]));
  for (let i = 1; i < counts.length; i++) {
    const prevX = toX(i - 1);
    const currX = toX(i);
    const cpX = (prevX + currX) / 2;
    ctx.bezierCurveTo(cpX, toY(counts[i - 1]), cpX, toY(counts[i]), currX, toY(counts[i]));
  }
  ctx.strokeStyle = '#00E5FF';
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();

  // Data points dots
  for (let i = 0; i < counts.length; i++) {
    ctx.beginPath();
    ctx.arc(toX(i), toY(counts[i]), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00E5FF';
    ctx.fill();
  }

  // Glow on last point
  const lastI = counts.length - 1;
  ctx.beginPath();
  ctx.arc(toX(lastI), toY(counts[lastI]), 6, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

export const AlertTrendChart: React.FC<AlertTrendChartProps> = ({
  theme, data, loading, error, activeInterval, onIntervalChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      if (data.length > 0) {
        drawLineChart(canvas, data, theme);
      }
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

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pad = 55;
    const cw = rect.width - pad - 20;
    const idx = Math.round(((x - pad) / cw) * (data.length - 1));
    if (idx < 0 || idx >= data.length) { setTooltip(null); return; }
    const dp = data[idx];
    const date = new Date(dp.timestamp);
    setTooltip({
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 35,
      text: `${date.toLocaleString()}  |  ${dp.count} alerts`,
    });
  };

  if (error) {
    return (
      <div className="soc-panel">
        <div className="soc-section-title">Alert Trend</div>
        <div className="soc-error-panel">
          <div className="soc-error-icon">⚠</div>
          <div className="soc-error-title">Data Unavailable</div>
          <div className="soc-error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="soc-panel soc-fade-in" style={{ position: 'relative' }}>
      <div className="soc-section-title">Alert Trend</div>
      <div className="soc-chart-tabs">
        {INTERVALS.map((int) => (
          <button
            key={int.value}
            className={`soc-chart-tab ${activeInterval === int.value ? 'active' : ''}`}
            onClick={() => onIntervalChange(int.value)}
          >
            {int.label}
          </button>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          className="soc-chart-canvas"
          style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTooltip(null)}
        />
        {tooltip && (
          <div className="soc-chart-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
            {tooltip.text}
          </div>
        )}
        {loading && (
          <div className="soc-loading" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(11,15,26,0.3)' }}>
            <div className="soc-loading-spinner" />
          </div>
        )}
      </div>
    </div>
  );
};
