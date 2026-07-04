import React, { useRef, useEffect } from 'react';
import { LogSourceBucket } from '../types';

interface LogsBySourceChartProps {
  theme: 'dark' | 'light';
  data: LogSourceBucket[];
  loading: boolean;
  error: string | null;
}

function drawVerticalBarChart(canvas: HTMLCanvasElement, data: LogSourceBucket[], theme: 'dark' | 'light') {
  const isLight = theme === 'light';
  const textColor = isLight ? '#4B5563' : '#6B7280';
  const gridColor = isLight ? 'rgba(209, 213, 219, 0.8)' : 'rgba(75, 85, 99, 0.25)';
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
    ctx.fillText('No log data available', w / 2, h / 2);
    return;
  }

  const pad = { top: 20, right: 20, bottom: 40, left: 45 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  // Vertical bar chart
  const maxItems = Math.min(data.length, 12);
  const displayData = data.slice(0, maxItems);
  
  const barWidth = Math.min(24, (cw / displayData.length) * 0.6);
  const colWidth = cw / displayData.length;

  const maxV = Math.max(...displayData.map(d => d.count), 1);

  // Y-axis grid & labels
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  const gridLines = 4;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (ch / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();

    const val = maxV - (maxV / gridLines) * i;
    ctx.fillStyle = textColor;
    ctx.font = '10px "Arial", sans-serif';
    ctx.textAlign = 'right';
    
    // Format large numbers
    let valStr = val.toString();
    if (val >= 1000000) valStr = (val / 1000000).toFixed(1) + 'M';
    else if (val >= 1000) valStr = (val / 1000).toFixed(1) + 'K';
    else valStr = Math.round(val).toString();
    
    ctx.fillText(valStr, pad.left - 8, y + 4);
  }

  ctx.font = '9px "Arial", sans-serif';
  ctx.textAlign = 'center';

  displayData.forEach((d, i) => {
    const x = pad.left + (i * colWidth) + (colWidth / 2);
    const barHeight = (d.count / maxV) * ch;
    const y = pad.top + ch - barHeight;

    // Bar background
    ctx.fillStyle = barBg;
    ctx.beginPath();
    ctx.roundRect(x - barWidth / 2, pad.top, barWidth, ch, 3);
    ctx.fill();

    // Bar fill
    if (barHeight > 0) {
      ctx.fillStyle = '#00E5FF';
      ctx.beginPath();
      // Only round top corners if bar is tall enough
      if (barHeight > 6) {
        ctx.roundRect(x - barWidth / 2, y, barWidth, barHeight, [3, 3, 0, 0]);
      } else {
        ctx.rect(x - barWidth / 2, y, barWidth, barHeight);
      }
      ctx.fill();
    }

    // Label (rotated if needed)
    ctx.save();
    ctx.translate(x, h - pad.bottom + 14);
    if (displayData.length > 6) {
      ctx.rotate(-Math.PI / 6);
      ctx.textAlign = 'right';
      ctx.translate(-5, 0);
    }
    ctx.fillStyle = isLight ? '#4B5563' : '#9CA3AF';
    
    let label = d.source;
    if (label.length > 10) label = label.substring(0, 8) + '..';
    ctx.fillText(label, 0, 0);
    ctx.restore();
  });
}

export const LogsBySourceChart: React.FC<LogsBySourceChartProps> = ({ theme, data, loading, error }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      drawVerticalBarChart(canvas, data, theme);
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
        <div className="soc-section-title">Logs By Source</div>
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
      <div className="soc-section-title">Logs By Source</div>
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
