(window["socDashboard_bundle_jsonpfunction"] = window["socDashboard_bundle_jsonpfunction"] || []).push([[0],{

/***/ "./public/application.tsx":
/*!********************************!*\
  !*** ./public/application.tsx ***!
  \********************************/
/*! exports provided: renderApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderApp", function() { return renderApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "react-dom");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app */ "./public/components/app.tsx");



const renderApp = (_ref, _ref2, _ref3) => {
  let {
    notifications,
    http
  } = _ref;
  let {
    navigation
  } = _ref2;
  let {
    appBasePath,
    element
  } = _ref3;
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_app__WEBPACK_IMPORTED_MODULE_2__["SocDashboardApp"], {
    http: http,
    notifications: notifications
  }), element);
  return () => react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.unmountComponentAtNode(element);
};

/***/ }),

/***/ "./public/components/AlertTrendChart.tsx":
/*!***********************************************!*\
  !*** ./public/components/AlertTrendChart.tsx ***!
  \***********************************************/
/*! exports provided: AlertTrendChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertTrendChart", function() { return AlertTrendChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const INTERVALS = [{
  value: '1h',
  label: 'Last 1 Hour'
}, {
  value: '24h',
  label: 'Last 24 Hours'
}, {
  value: '7d',
  label: 'Last 7 Days'
}];

function drawLineChart(canvas, data, theme) {
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

  const pad = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 55
  };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;
  const counts = data.map(d => d.count);
  const maxV = Math.max(...counts, 1);
  const minV = 0;
  const range = maxV - minV || 1;

  const toX = i => pad.left + i / (data.length - 1) * cw;

  const toY = v => pad.top + ch - (v - minV) / range * ch; // Grid lines + Y labels


  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  const gridLines = 5;

  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + ch / gridLines * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    const val = maxV - range / gridLines * i;
    ctx.fillStyle = textColor;
    ctx.font = '10px "Arial", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(val).toString(), pad.left - 8, y + 4);
  } // X labels (show a few timestamps)


  ctx.fillStyle = textColor;
  ctx.font = '9px "Arial", sans-serif';
  ctx.textAlign = 'center';
  const labelInterval = Math.max(1, Math.floor(data.length / 6));

  for (let i = 0; i < data.length; i += labelInterval) {
    const date = new Date(data[i].timestamp);
    const label = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    ctx.fillText(label, toX(i), h - pad.bottom + 16);
  } // Area gradient fill


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
  ctx.fill(); // Line

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
  ctx.stroke(); // Data points dots

  for (let i = 0; i < counts.length; i++) {
    ctx.beginPath();
    ctx.arc(toX(i), toY(counts[i]), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00E5FF';
    ctx.fill();
  } // Glow on last point


  const lastI = counts.length - 1;
  ctx.beginPath();
  ctx.arc(toX(lastI), toY(counts[lastI]), 6, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

const AlertTrendChart = _ref => {
  let {
    theme,
    data,
    loading,
    error,
    activeInterval,
    onIntervalChange
  } = _ref;
  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  const [tooltip, setTooltip] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
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

  const handleMouseMove = e => {
    const canvas = canvasRef.current;
    if (!canvas || data.length < 2) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pad = 55;
    const cw = rect.width - pad - 20;
    const idx = Math.round((x - pad) / cw * (data.length - 1));

    if (idx < 0 || idx >= data.length) {
      setTooltip(null);
      return;
    }

    const dp = data[idx];
    const date = new Date(dp.timestamp);
    setTooltip({
      x: e.clientX - rect.left + 12,
      y: e.clientY - rect.top - 35,
      text: `${date.toLocaleString()}  |  ${dp.count} alerts`
    });
  };

  if (error) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-section-title"
    }, "Alert Trend"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-icon"
    }, "\u26A0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-title"
    }, "Data Unavailable"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-message"
    }, error)));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-panel soc-fade-in",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-section-title"
  }, "Alert Trend"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-chart-tabs"
  }, INTERVALS.map(int => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    key: int.value,
    className: `soc-chart-tab ${activeInterval === int.value ? 'active' : ''}`,
    onClick: () => onIntervalChange(int.value)
  }, int.label))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
    ref: canvasRef,
    className: "soc-chart-canvas",
    style: {
      opacity: loading ? 0.5 : 1,
      transition: 'opacity 0.2s'
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: () => setTooltip(null)
  }), tooltip && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-chart-tooltip",
    style: {
      left: tooltip.x,
      top: tooltip.y
    }
  }, tooltip.text), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11,15,26,0.3)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading-spinner"
  }))));
};

/***/ }),

/***/ "./public/components/DeviceDistributionChart.tsx":
/*!*******************************************************!*\
  !*** ./public/components/DeviceDistributionChart.tsx ***!
  \*******************************************************/
/*! exports provided: DeviceDistributionChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceDistributionChart", function() { return DeviceDistributionChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const BAR_COLORS = ['#00E5FF', '#2979FF', '#B388FF', '#FF1744', '#FF9100', '#FFD600', '#00FF88', '#1DE9B6'];

function drawBarChart(canvas, data, theme) {
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

  const pad = {
    top: 20,
    right: 30,
    bottom: 20,
    left: 90
  };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom; // Horizontal bar chart

  const barHeight = Math.min(24, ch / data.length * 0.7);
  const rowHeight = ch / data.length;
  const maxV = Math.max(...data.map(d => d.count), 1);
  ctx.font = '10px "Arial", sans-serif';
  ctx.textBaseline = 'middle';
  data.forEach((d, i) => {
    const y = pad.top + i * rowHeight + rowHeight / 2;
    const barWidth = d.count / maxV * cw;
    const color = BAR_COLORS[i % BAR_COLORS.length]; // Label

    ctx.fillStyle = textColor;
    ctx.textAlign = 'right'; // Truncate label if too long

    let label = d.type;
    if (label.length > 12) label = label.substring(0, 10) + '..';
    ctx.fillText(label, pad.left - 10, y); // Bar background

    ctx.fillStyle = barBg;
    ctx.beginPath();
    ctx.roundRect(pad.left, y - barHeight / 2, cw, barHeight, 4);
    ctx.fill(); // Bar fill

    if (barWidth > 0) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(pad.left, y - barHeight / 2, Math.max(4, barWidth), barHeight, 4);
      ctx.fill();
    } // Value text


    ctx.fillStyle = valColor;
    ctx.textAlign = 'left';
    ctx.fillText(d.count.toString(), pad.left + Math.max(10, barWidth) + 8, y);
  });
}

const DeviceDistributionChart = _ref => {
  let {
    theme,
    data,
    loading,
    error
  } = _ref;
  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-section-title"
    }, "Device Distribution"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-icon"
    }, "\u26A0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-title"
    }, "Data Unavailable"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-message"
    }, error)));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-panel soc-fade-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-section-title"
  }, "Device Distribution"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
    ref: canvasRef,
    className: "soc-chart-canvas-sm",
    style: {
      opacity: loading ? 0.5 : 1,
      transition: 'opacity 0.2s'
    }
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11,15,26,0.3)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading-spinner"
  }))));
};

/***/ }),

/***/ "./public/components/DeviceHealthChart.tsx":
/*!*************************************************!*\
  !*** ./public/components/DeviceHealthChart.tsx ***!
  \*************************************************/
/*! exports provided: DeviceHealthChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceHealthChart", function() { return DeviceHealthChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const HEALTH_COLORS = {
  Online: '#00FF88',
  Warning: '#FF9100',
  Critical: '#FF1744',
  Offline: '#EF4444' // slightly dimmer red for offline vs critical

};

function drawDonutChart(canvas, data, theme) {
  var _data$find;

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
  data.forEach(d => {
    if (d.count === 0) return;
    const sliceAngle = d.count / total * Math.PI * 2;
    const color = HEALTH_COLORS[d.status] || '#6B7280';
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill(); // Segment gap

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    startAngle += sliceAngle;
  }); // Calculate percentage of online

  const onlineCount = ((_data$find = data.find(d => d.status === 'Online')) === null || _data$find === void 0 ? void 0 : _data$find.count) || 0;
  const pct = Math.round(onlineCount / total * 100); // Center text

  ctx.fillStyle = pct >= 90 ? '#00FF88' : pct >= 70 ? '#FF9100' : '#FF1744';
  ctx.font = 'bold 24px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${pct}%`, cx, cy - 4);
  ctx.fillStyle = isLight ? '#4B5563' : '#9CA3AF';
  ctx.font = '10px "Arial", sans-serif';
  ctx.fillText('HEALTHY', cx, cy + 14);
}

const DeviceHealthChart = _ref => {
  let {
    theme,
    data,
    loading,
    error
  } = _ref;
  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-section-title"
    }, "Device Health"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-icon"
    }, "\u26A0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-title"
    }, "Data Unavailable"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-message"
    }, error)));
  } // Ensure all standard statuses exist in legend


  const allStatuses = ['Online', 'Warning', 'Critical', 'Offline'];
  const legendData = allStatuses.map(status => {
    const item = data.find(d => d.status === status);
    return {
      status,
      count: item ? item.count : 0
    };
  }).filter(d => d.count > 0 || ['Online', 'Offline'].includes(d.status));
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-panel soc-fade-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-section-title"
  }, "Device Health"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
    ref: canvasRef,
    className: "soc-chart-canvas-sm",
    style: {
      opacity: loading ? 0.5 : 1,
      transition: 'opacity 0.2s'
    }
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11,15,26,0.3)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading-spinner"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-legend"
  }, legendData.map(d => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: d.status,
    className: "soc-legend-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-legend-dot",
    style: {
      background: HEALTH_COLORS[d.status] || '#6B7280'
    }
  }), d.status, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-legend-count"
  }, d.count)))));
};

/***/ }),

/***/ "./public/components/HeaderBar.tsx":
/*!*****************************************!*\
  !*** ./public/components/HeaderBar.tsx ***!
  \*****************************************/
/*! exports provided: HeaderBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderBar", function() { return HeaderBar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const TIME_RANGE_OPTIONS = [{
  value: '15m',
  label: '15 Min'
}, {
  value: '1h',
  label: '1 Hour'
}, {
  value: '6h',
  label: '6 Hours'
}, {
  value: '24h',
  label: '24 Hours'
}, {
  value: '7d',
  label: '7 Days'
}, {
  value: '30d',
  label: '30 Days'
}];
const HeaderBar = _ref => {
  let {
    theme,
    onToggleTheme,
    filters,
    filterOptions,
    onFiltersChange,
    autoRefresh,
    countdown,
    onToggleAutoRefresh,
    onManualRefresh,
    lastRefresh
  } = _ref;
  const [clock, setClock] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const tick = () => {
      const now = new Date();
      const date = now.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const time = now.toLocaleTimeString('en-IN', {
        hour12: false
      });
      setClock(`${date}  ${time}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters,
      [key]: value
    });
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-header"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-header-left"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-header-title"
  }, "\u25C8 Powerplant SOC Dashboard \u2014 OT Infrastructure Security")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-header-right"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-clock"
  }, clock), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `soc-auto-refresh-badge ${!autoRefresh ? 'paused' : ''}`,
    onClick: onToggleAutoRefresh,
    title: autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh PAUSED'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-status-dot green",
    style: {
      width: 6,
      height: 6,
      marginRight: 0,
      animation: autoRefresh ? 'soc-pulse-dot 1s ease-in-out infinite' : 'none',
      background: autoRefresh ? '#00FF88' : '#FF9100'
    }
  }), autoRefresh ? `AUTO ${countdown}s` : 'PAUSED'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "soc-refresh-btn",
    onClick: onManualRefresh
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      fontSize: 14
    }
  }, "\u27F3"), " REFRESH"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-filter-bar"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-filter-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-filter-label"
  }, "Time Range"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "soc-filter-select",
    value: filters.timeRange,
    onChange: e => handleFilterChange('timeRange', e.target.value)
  }, TIME_RANGE_OPTIONS.map(opt => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: opt.value,
    value: opt.value
  }, opt.label)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-filter-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-filter-label"
  }, "Device Type"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "soc-filter-select",
    value: filters.deviceType,
    onChange: e => handleFilterChange('deviceType', e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, "All Types"), filterOptions.types.map(t => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: t,
    value: t
  }, t)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-filter-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-filter-label"
  }, "Site / Location"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "soc-filter-select",
    value: filters.site,
    onChange: e => handleFilterChange('site', e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, "All Sites"), filterOptions.sites.map(s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: s,
    value: s
  }, s)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-filter-group"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-filter-label"
  }, "Severity"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
    className: "soc-filter-select",
    value: filters.severity,
    onChange: e => handleFilterChange('severity', e.target.value)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    value: ""
  }, "All Severities"), filterOptions.severities.map(s => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: s,
    value: s
  }, s)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      fontSize: 10,
      color: '#6B7280',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "Last: ", lastRefresh.toLocaleTimeString())));
};

/***/ }),

/***/ "./public/components/LogsBySourceChart.tsx":
/*!*************************************************!*\
  !*** ./public/components/LogsBySourceChart.tsx ***!
  \*************************************************/
/*! exports provided: LogsBySourceChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsBySourceChart", function() { return LogsBySourceChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function drawVerticalBarChart(canvas, data, theme) {
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

  const pad = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 45
  };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom; // Vertical bar chart

  const maxItems = Math.min(data.length, 12);
  const displayData = data.slice(0, maxItems);
  const barWidth = Math.min(24, cw / displayData.length * 0.6);
  const colWidth = cw / displayData.length;
  const maxV = Math.max(...displayData.map(d => d.count), 1); // Y-axis grid & labels

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 0.5;
  const gridLines = 4;

  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + ch / gridLines * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    const val = maxV - maxV / gridLines * i;
    ctx.fillStyle = textColor;
    ctx.font = '10px "Arial", sans-serif';
    ctx.textAlign = 'right'; // Format large numbers

    let valStr = val.toString();
    if (val >= 1000000) valStr = (val / 1000000).toFixed(1) + 'M';else if (val >= 1000) valStr = (val / 1000).toFixed(1) + 'K';else valStr = Math.round(val).toString();
    ctx.fillText(valStr, pad.left - 8, y + 4);
  }

  ctx.font = '9px "Arial", sans-serif';
  ctx.textAlign = 'center';
  displayData.forEach((d, i) => {
    const x = pad.left + i * colWidth + colWidth / 2;
    const barHeight = d.count / maxV * ch;
    const y = pad.top + ch - barHeight; // Bar background

    ctx.fillStyle = barBg;
    ctx.beginPath();
    ctx.roundRect(x - barWidth / 2, pad.top, barWidth, ch, 3);
    ctx.fill(); // Bar fill

    if (barHeight > 0) {
      ctx.fillStyle = '#00E5FF';
      ctx.beginPath(); // Only round top corners if bar is tall enough

      if (barHeight > 6) {
        ctx.roundRect(x - barWidth / 2, y, barWidth, barHeight, [3, 3, 0, 0]);
      } else {
        ctx.rect(x - barWidth / 2, y, barWidth, barHeight);
      }

      ctx.fill();
    } // Label (rotated if needed)


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

const LogsBySourceChart = _ref => {
  let {
    theme,
    data,
    loading,
    error
  } = _ref;
  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-section-title"
    }, "Logs By Source"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-icon"
    }, "\u26A0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-title"
    }, "Data Unavailable"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-message"
    }, error)));
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-panel soc-fade-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-section-title"
  }, "Logs By Source"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
    ref: canvasRef,
    className: "soc-chart-canvas-sm",
    style: {
      opacity: loading ? 0.5 : 1,
      transition: 'opacity 0.2s'
    }
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11,15,26,0.3)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading-spinner"
  }))));
};

/***/ }),

/***/ "./public/components/SeverityPieChart.tsx":
/*!************************************************!*\
  !*** ./public/components/SeverityPieChart.tsx ***!
  \************************************************/
/*! exports provided: SeverityPieChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeverityPieChart", function() { return SeverityPieChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SEVERITY_COLORS = {
  CRITICAL: '#FF1744',
  HIGH: '#FF9100',
  MEDIUM: '#FFD600',
  LOW: '#00E5FF',
  INFORMATIONAL: '#B388FF',
  INFO: '#B388FF'
};
const SEVERITY_ORDER = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL', 'INFO'];

function drawDonutChart(canvas, data, theme) {
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
  let startAngle = -Math.PI / 2; // Sort by severity order

  const sortedData = [...data].sort((a, b) => {
    const ai = SEVERITY_ORDER.indexOf(a.severity);
    const bi = SEVERITY_ORDER.indexOf(b.severity);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  sortedData.forEach(d => {
    const sliceAngle = d.count / total * Math.PI * 2;
    const color = SEVERITY_COLORS[d.severity] || '#6B7280'; // Draw arc segment

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill(); // Segment border

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.stroke(); // Label if segment is big enough

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
  }); // Center text

  ctx.fillStyle = centerColor;
  ctx.font = 'bold 22px "Arial", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(total.toString(), cx, cy - 4);
  ctx.fillStyle = textColor;
  ctx.font = '10px "Arial", sans-serif';
  ctx.fillText('TOTAL', cx, cy + 14);
}

const SeverityPieChart = _ref => {
  let {
    theme,
    data,
    loading,
    error
  } = _ref;
  const canvasRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-section-title"
    }, "Alert Severity Distribution"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-panel"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-icon"
    }, "\u26A0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-title"
    }, "Data Unavailable"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "soc-error-message"
    }, error)));
  } // Sort for legend


  const sortedData = [...data].sort((a, b) => {
    const ai = SEVERITY_ORDER.indexOf(a.severity);
    const bi = SEVERITY_ORDER.indexOf(b.severity);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-panel soc-fade-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-section-title"
  }, "Alert Severity Distribution"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("canvas", {
    ref: canvasRef,
    className: "soc-chart-canvas",
    style: {
      opacity: loading ? 0.5 : 1,
      transition: 'opacity 0.2s'
    }
  }), loading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(11,15,26,0.3)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-loading-spinner"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-legend"
  }, sortedData.map(d => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    key: d.severity,
    className: "soc-legend-item"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-legend-dot",
    style: {
      background: SEVERITY_COLORS[d.severity] || '#6B7280'
    }
  }), d.severity, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-legend-count"
  }, d.count)))));
};

/***/ }),

/***/ "./public/components/SummaryCards.tsx":
/*!********************************************!*\
  !*** ./public/components/SummaryCards.tsx ***!
  \********************************************/
/*! exports provided: SummaryCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SummaryCards", function() { return SummaryCards; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SummaryCards = _ref => {
  let {
    data,
    loading,
    error
  } = _ref;

  const renderValue = (value, colorClass, suffix) => {
    if (error) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "soc-card-error"
      }, "\u26A0 Error");
    }

    if (loading || data === null) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "soc-shimmer"
      });
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `soc-summary-card-value ${colorClass}`
    }, typeof value === 'number' ? value.toLocaleString() : value, suffix && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      style: {
        fontSize: 11,
        marginLeft: 2,
        fontWeight: 400
      }
    }, suffix));
  };

  const renderStatus = status => {
    if (error) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "soc-card-error"
      }, "\u26A0 Error");
    }

    if (loading || data === null) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "soc-shimmer"
      });
    }

    const isOnline = status === 'Online';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `soc-status-indicator ${isOnline ? 'online' : 'offline'}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `soc-status-dot ${isOnline ? 'green' : 'red'}`,
      style: {
        width: 8,
        height: 8,
        marginRight: 0
      }
    }), status);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-row soc-fade-in"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group assets"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "icon"
  }, "\uD83D\uDDA5"), " Assets"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-cards"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Total Devices"), renderValue(data === null || data === void 0 ? void 0 : data.totalDevices, 'cyan')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Online Devices"), renderValue(data === null || data === void 0 ? void 0 : data.onlineDevices, 'green')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Offline Devices"), renderValue(data === null || data === void 0 ? void 0 : data.offlineDevices, 'red'))), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-card-error",
    style: {
      marginTop: 8,
      fontSize: 10
    }
  }, "\u26A0 ", error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group security"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "icon"
  }, "\uD83D\uDEE1"), " Security"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-cards"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Total Alerts Today"), renderValue(data === null || data === void 0 ? void 0 : data.totalAlertsToday, 'orange')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Critical Alerts"), renderValue(data === null || data === void 0 ? void 0 : data.criticalAlerts, 'red'))), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-card-error",
    style: {
      marginTop: 8,
      fontSize: 10
    }
  }, "\u26A0 ", error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group logs"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "icon"
  }, "\uD83D\uDCCA"), " Log Statistics"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-cards"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Total Logs Today"), renderValue(data === null || data === void 0 ? void 0 : data.totalLogsToday, 'green')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Events Per Second"), renderValue(data === null || data === void 0 ? void 0 : data.eps, 'cyan', 'EPS'))), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-card-error",
    style: {
      marginTop: 8,
      fontSize: 10
    }
  }, "\u26A0 ", error)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group infra"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-group-title"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "icon"
  }, "\u2699"), " Infrastructure"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-cards"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "Data Diode Status"), renderStatus((data === null || data === void 0 ? void 0 : data.datadiodeStatus) || '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-summary-card"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "soc-summary-card-label"
  }, "OpenSearch Status"), renderStatus((data === null || data === void 0 ? void 0 : data.opensearchStatus) || ''))), error && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-card-error",
    style: {
      marginTop: 8,
      fontSize: 10
    }
  }, "\u26A0 ", error)));
};

/***/ }),

/***/ "./public/components/app.tsx":
/*!***********************************!*\
  !*** ./public/components/app.tsx ***!
  \***********************************/
/*! exports provided: SocDashboardApp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocDashboardApp", function() { return SocDashboardApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HeaderBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderBar */ "./public/components/HeaderBar.tsx");
/* harmony import */ var _SummaryCards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SummaryCards */ "./public/components/SummaryCards.tsx");
/* harmony import */ var _AlertTrendChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AlertTrendChart */ "./public/components/AlertTrendChart.tsx");
/* harmony import */ var _SeverityPieChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SeverityPieChart */ "./public/components/SeverityPieChart.tsx");
/* harmony import */ var _DeviceDistributionChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DeviceDistributionChart */ "./public/components/DeviceDistributionChart.tsx");
/* harmony import */ var _DeviceHealthChart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DeviceHealthChart */ "./public/components/DeviceHealthChart.tsx");
/* harmony import */ var _LogsBySourceChart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./LogsBySourceChart */ "./public/components/LogsBySourceChart.tsx");







 // ===== TIME RANGE PRESETS =====

const TIME_RANGES = {
  '15m': 15 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '30d': 30 * 24 * 60 * 60 * 1000
};
const SocDashboardApp = _ref => {
  let {
    http,
    notifications
  } = _ref;
  const [theme, setTheme] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('light'); // ── Filter state ──

  const [filters, setFilters] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    timeRange: '24h',
    deviceType: '',
    site: '',
    severity: ''
  });
  const [filterOptions, setFilterOptions] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    types: [],
    sites: [],
    severities: []
  }); // ── Data state ──

  const [summary, setSummary] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [alertTrend, setAlertTrend] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [severityDist, setSeverityDist] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [deviceDist, setDeviceDist] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [deviceHealth, setDeviceHealth] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]);
  const [logSources, setLogSources] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])([]); // ── Error state (per-widget) ──

  const [errors, setErrors] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    summary: null,
    alertTrend: null,
    severity: null,
    deviceDist: null,
    deviceHealth: null,
    logSources: null,
    filters: null
  }); // ── Loading state ──

  const [loading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])({
    summary: true,
    alertTrend: true,
    severity: true,
    deviceDist: true,
    deviceHealth: true,
    logSources: true
  }); // ── Auto refresh ──

  const [autoRefresh, setAutoRefresh] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const [countdown, setCountdown] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(10);
  const [alertTrendInterval, setAlertTrendInterval] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('24h');
  const [lastRefresh, setLastRefresh] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(new Date());
  const refreshTimerRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null); // Build filter body for API calls

  const buildFilterBody = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    const body = {};
    const ms = TIME_RANGES[filters.timeRange];

    if (ms) {
      body.time_gte = new Date(Date.now() - ms).toISOString();
    }

    if (filters.deviceType) body.device_type = filters.deviceType;
    if (filters.site) body.site = filters.site;
    if (filters.severity) body.severity = filters.severity;
    return body;
  }, [filters]); // ── Fetch filter options (device types, sites, severities) ──

  const fetchFilterOptions = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    try {
      const result = await http.post('/api/soc_dashboard/devices', {
        body: JSON.stringify({})
      });
      setFilterOptions({
        types: result.types || [],
        sites: result.sites || [],
        severities: result.severities || []
      });
      setErrors(prev => ({ ...prev,
        filters: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Filter options fetch error:', err);
      setErrors(prev => ({ ...prev,
        filters: err.message || 'Failed to fetch filter options'
      }));
    }
  }, [http]); // ── Fetch summary ──

  const fetchSummary = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    try {
      setLoading(prev => ({ ...prev,
        summary: true
      }));
      const result = await http.post('/api/soc_dashboard/summary', {
        body: JSON.stringify(buildFilterBody())
      });
      setSummary(result);
      setErrors(prev => ({ ...prev,
        summary: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Summary fetch error:', err);
      setErrors(prev => ({ ...prev,
        summary: err.message || 'Failed to fetch summary data'
      }));
    } finally {
      setLoading(prev => ({ ...prev,
        summary: false
      }));
    }
  }, [http, buildFilterBody]); // ── Fetch alert trend ──

  const fetchAlertTrend = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async function () {
    let interval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : alertTrendInterval;

    try {
      setLoading(prev => ({ ...prev,
        alertTrend: true
      }));
      const filterBody = buildFilterBody();
      const result = await http.post('/api/soc_dashboard/alert_trend', {
        body: JSON.stringify({ ...filterBody,
          interval
        })
      });
      setAlertTrend(result.trend || []);
      setErrors(prev => ({ ...prev,
        alertTrend: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Alert trend fetch error:', err);
      setErrors(prev => ({ ...prev,
        alertTrend: err.message || 'Failed to fetch alert trend'
      }));
    } finally {
      setLoading(prev => ({ ...prev,
        alertTrend: false
      }));
    }
  }, [http, buildFilterBody, alertTrendInterval]); // ── Fetch severity distribution ──

  const fetchSeverityDist = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    try {
      setLoading(prev => ({ ...prev,
        severity: true
      }));
      const result = await http.post('/api/soc_dashboard/severity_distribution', {
        body: JSON.stringify(buildFilterBody())
      });
      setSeverityDist(result.distribution || []);
      setErrors(prev => ({ ...prev,
        severity: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Severity distribution fetch error:', err);
      setErrors(prev => ({ ...prev,
        severity: err.message || 'Failed to fetch severity distribution'
      }));
    } finally {
      setLoading(prev => ({ ...prev,
        severity: false
      }));
    }
  }, [http, buildFilterBody]); // ── Fetch device distribution ──

  const fetchDeviceDist = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    try {
      setLoading(prev => ({ ...prev,
        deviceDist: true
      }));
      const result = await http.post('/api/soc_dashboard/device_distribution', {
        body: JSON.stringify(buildFilterBody())
      });
      setDeviceDist(result.distribution || []);
      setErrors(prev => ({ ...prev,
        deviceDist: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Device distribution fetch error:', err);
      setErrors(prev => ({ ...prev,
        deviceDist: err.message || 'Failed to fetch device distribution'
      }));
    } finally {
      setLoading(prev => ({ ...prev,
        deviceDist: false
      }));
    }
  }, [http, buildFilterBody]); // ── Fetch device health ──

  const fetchDeviceHealth = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    try {
      setLoading(prev => ({ ...prev,
        deviceHealth: true
      }));
      const result = await http.post('/api/soc_dashboard/device_health', {
        body: JSON.stringify(buildFilterBody())
      });
      setDeviceHealth(result.health || []);
      setErrors(prev => ({ ...prev,
        deviceHealth: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Device health fetch error:', err);
      setErrors(prev => ({ ...prev,
        deviceHealth: err.message || 'Failed to fetch device health'
      }));
    } finally {
      setLoading(prev => ({ ...prev,
        deviceHealth: false
      }));
    }
  }, [http, buildFilterBody]); // ── Fetch logs by source ──

  const fetchLogSources = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async () => {
    try {
      setLoading(prev => ({ ...prev,
        logSources: true
      }));
      const result = await http.post('/api/soc_dashboard/logs_by_source', {
        body: JSON.stringify(buildFilterBody())
      });
      setLogSources(result.sources || []);
      setErrors(prev => ({ ...prev,
        logSources: null
      }));
    } catch (err) {
      console.error('SOC Dashboard — Logs by source fetch error:', err);
      setErrors(prev => ({ ...prev,
        logSources: err.message || 'Failed to fetch logs by source'
      }));
    } finally {
      setLoading(prev => ({ ...prev,
        logSources: false
      }));
    }
  }, [http, buildFilterBody]); // ── Refresh all data ──

  const refreshAll = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    setLastRefresh(new Date());
    setCountdown(10);
    fetchSummary();
    fetchAlertTrend(alertTrendInterval);
    fetchSeverityDist();
    fetchDeviceDist();
    fetchDeviceHealth();
    fetchLogSources();
  }, [fetchSummary, fetchAlertTrend, fetchSeverityDist, fetchDeviceDist, fetchDeviceHealth, fetchLogSources, alertTrendInterval]); // ── Initial load ──

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]); // ── Fetch data when filters change ──

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    refreshAll();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps
  // ── Auto refresh countdown ──

  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (autoRefresh) {
      refreshTimerRef.current = setInterval(() => {
        setCountdown(prev => {
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
  }, [autoRefresh, refreshAll]); // ── Handle alert trend interval change ──

  const handleAlertTrendIntervalChange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(interval => {
    setAlertTrendInterval(interval);
    fetchAlertTrend(interval);
  }, [fetchAlertTrend]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: `soc-root soc-theme-${theme}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HeaderBar__WEBPACK_IMPORTED_MODULE_1__["HeaderBar"], {
    theme: theme,
    onToggleTheme: () => setTheme(t => t === 'dark' ? 'light' : 'dark'),
    filters: filters,
    filterOptions: filterOptions,
    onFiltersChange: setFilters,
    autoRefresh: autoRefresh,
    countdown: countdown,
    onToggleAutoRefresh: () => setAutoRefresh(p => !p),
    onManualRefresh: refreshAll,
    lastRefresh: lastRefresh
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-main"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SummaryCards__WEBPACK_IMPORTED_MODULE_2__["SummaryCards"], {
    data: summary,
    loading: loading.summary,
    error: errors.summary
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-charts-row"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AlertTrendChart__WEBPACK_IMPORTED_MODULE_3__["AlertTrendChart"], {
    theme: theme,
    data: alertTrend,
    loading: loading.alertTrend,
    error: errors.alertTrend,
    activeInterval: alertTrendInterval,
    onIntervalChange: handleAlertTrendIntervalChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SeverityPieChart__WEBPACK_IMPORTED_MODULE_4__["SeverityPieChart"], {
    theme: theme,
    data: severityDist,
    loading: loading.severity,
    error: errors.severity
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-charts-row-3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DeviceDistributionChart__WEBPACK_IMPORTED_MODULE_5__["DeviceDistributionChart"], {
    theme: theme,
    data: deviceDist,
    loading: loading.deviceDist,
    error: errors.deviceDist
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DeviceHealthChart__WEBPACK_IMPORTED_MODULE_6__["DeviceHealthChart"], {
    theme: theme,
    data: deviceHealth,
    loading: loading.deviceHealth,
    error: errors.deviceHealth
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LogsBySourceChart__WEBPACK_IMPORTED_MODULE_7__["LogsBySourceChart"], {
    theme: theme,
    data: logSources,
    loading: loading.logSources,
    error: errors.logSources
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-footer",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      borderTop: '1px solid var(--soc-border)',
      background: 'var(--soc-footer-bg)'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-footer-left",
    style: {
      fontSize: 12,
      color: 'var(--soc-text-dim)',
      maxWidth: '60%',
      lineHeight: '1.4'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "OT Powerplant SOC Dashboard:"), " Real-time monitoring of operational technology infrastructure, security events, and device health across the powerplant."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-footer-right",
    style: {
      fontSize: 12,
      display: 'flex',
      gap: '24px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-footer-item"
  }, "Selected Device: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
    style: {
      color: 'var(--soc-text)',
      marginLeft: '6px'
    }
  }, filters.deviceType || 'All Devices')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-footer-item"
  }, "Status: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    style: {
      color: 'var(--soc-green)',
      marginLeft: '6px'
    }
  }, "Active")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "soc-footer-item",
    style: {
      color: 'var(--soc-text-dim)'
    }
  }, "Last Refresh: ", lastRefresh.toLocaleTimeString()))));
};

/***/ })

}]);
//# sourceMappingURL=socDashboard.chunk.0.js.map