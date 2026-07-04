/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"socDashboard": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "socDashboard.chunk." + chunkId + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["socDashboard_bundle_jsonpfunction"] = window["socDashboard_bundle_jsonpfunction"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../../packages/osd-optimizer/target/worker/entry_point_creator.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v7dark":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-0-1!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-0-2!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/comment-stripper??ref--6-oneOf-0-3!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-0-4!./public/index.scss?v7dark ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n", "",{"version":3,"sources":["webpack://./public/index.scss"],"names":[],"mappings":"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","sourcesContent":["/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap\");\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v7light":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-1-2!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/comment-stripper??ref--6-oneOf-1-3!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-1-4!./public/index.scss?v7light ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n", "",{"version":3,"sources":["webpack://./public/index.scss"],"names":[],"mappings":"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","sourcesContent":["/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap\");\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v8dark":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-2-1!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-2-2!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/comment-stripper??ref--6-oneOf-2-3!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-2-4!./public/index.scss?v8dark ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n", "",{"version":3,"sources":["webpack://./public/index.scss"],"names":[],"mappings":"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","sourcesContent":["/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap\");\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v8light":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-3-2!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/comment-stripper??ref--6-oneOf-3-3!C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-3-4!./public/index.scss?v8light ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
___CSS_LOADER_EXPORT___.push([module.i, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n", "",{"version":3,"sources":["webpack://./public/index.scss"],"names":[],"mappings":"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","sourcesContent":["/*!\n * SPDX-License-Identifier: Apache-2.0\n *\n * The OpenSearch Contributors require contributions made to\n * this file be licensed under the Apache-2.0 license or a\n * compatible open source license.\n *\n * Modifications Copyright OpenSearch Contributors. See\n * GitHub history for details.\n */\n\n@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap\");\n:root {\n  --soc-bg: #0B0F1A;\n  --soc-bg-secondary: #111827;\n  --soc-bg-panel: rgba(17, 24, 39, 0.75);\n  --soc-border: rgba(55, 65, 81, 0.5);\n  --soc-text: #E5E7EB;\n  --soc-text-dim: #9CA3AF;\n  --soc-cyan: #00E5FF;\n  --soc-green: #00FF88;\n  --soc-orange: #FF9100;\n  --soc-red: #FF1744;\n  --soc-yellow: #FFD600;\n  --soc-blue: #2979FF;\n  --soc-purple: #B388FF;\n  --soc-panel-blur: blur(12px);\n  --soc-radius: 10px;\n  --soc-glow-cyan: 0 0 15px rgba(0, 229, 255, 0.3);\n  --soc-glow-green: 0 0 15px rgba(0, 255, 136, 0.3);\n  --soc-glow-red: 0 0 15px rgba(255, 23, 68, 0.4);\n  --soc-header-bg: linear-gradient(180deg, rgba(17, 24, 39, 0.98) 0%, rgba(11, 15, 26, 0.95) 100%);\n  --soc-filter-bg: rgba(17, 24, 39, 0.6);\n  --soc-footer-bg: rgba(17, 24, 39, 0.8); }\n\n.soc-theme-light {\n  --soc-header-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(243, 244, 246, 0.95) 100%);\n  --soc-filter-bg: rgba(255, 255, 255, 0.6);\n  --soc-footer-bg: rgba(255, 255, 255, 0.8);\n  --soc-bg: #F3F4F6;\n  --soc-bg-secondary: #FFFFFF;\n  --soc-bg-panel: rgba(255, 255, 255, 0.9);\n  --soc-border: rgba(209, 213, 219, 0.8);\n  --soc-text: #111827;\n  --soc-text-dim: #4B5563;\n  --soc-cyan: #0097A7;\n  --soc-green: #00C853;\n  --soc-orange: #F57C00;\n  --soc-red: #D50000;\n  --soc-yellow: #FBC02D;\n  --soc-blue: #2962FF;\n  --soc-purple: #6200EA;\n  --soc-glow-cyan: 0 0 10px rgba(0, 151, 167, 0.2);\n  --soc-glow-green: 0 0 10px rgba(0, 200, 83, 0.2);\n  --soc-glow-red: 0 0 10px rgba(213, 0, 0, 0.2); }\n\n.soc-root {\n  font-family: 'Arial', sans-serif;\n  font-weight: bold;\n  background: var(--soc-bg);\n  color: black;\n  min-height: 100vh;\n  overflow-x: hidden;\n  font-size: 12px;\n  line-height: 1.5; }\n\n.soc-root * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0; }\n\n.soc-panel {\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  -webkit-backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  border-radius: var(--soc-radius);\n  padding: 18px;\n  transition: border-color 0.3s, box-shadow 0.3s; }\n\n.soc-panel:hover {\n  border-color: rgba(0, 229, 255, 0.2); }\n\n.soc-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 12px 24px;\n  background: var(--soc-header-bg);\n  border-bottom: 1px solid var(--soc-border);\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  backdrop-filter: var(--soc-panel-blur);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-header-left {\n  display: flex;\n  align-items: center;\n  gap: 16px; }\n\n.soc-header-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--soc-cyan);\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  text-shadow: 0 0 10px rgba(0, 229, 255, 0.4);\n  white-space: nowrap; }\n\n.soc-header-right {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  flex-wrap: wrap; }\n\n.soc-clock {\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  color: var(--soc-cyan);\n  letter-spacing: 1px; }\n\n.soc-status-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  display: inline-block;\n  margin-right: 6px;\n  animation: soc-pulse-dot 2s ease-in-out infinite; }\n\n.soc-status-dot.green {\n  background: var(--soc-green);\n  box-shadow: var(--soc-glow-green); }\n\n.soc-status-dot.yellow {\n  background: var(--soc-yellow);\n  box-shadow: 0 0 15px rgba(255, 214, 0, 0.4); }\n\n.soc-status-dot.red {\n  background: var(--soc-red);\n  box-shadow: var(--soc-glow-red); }\n\n.soc-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 11px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif; }\n\n.soc-badge.online {\n  background: rgba(0, 255, 136, 0.15);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.3); }\n\n.soc-badge.alerts {\n  background: rgba(255, 145, 0, 0.15);\n  color: var(--soc-orange);\n  border: 1px solid rgba(255, 145, 0, 0.3); }\n\n.soc-filter-bar {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 24px;\n  background: var(--soc-filter-bg);\n  border-bottom: 1px solid var(--soc-border);\n  flex-wrap: wrap; }\n\n.soc-filter-group {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-filter-label {\n  font-size: 10px;\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-filter-select {\n  padding: 4px 10px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-border);\n  background: var(--soc-bg-panel);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  outline: none;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%2300E5FF'/%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 8px center;\n  padding-right: 24px; }\n\n.soc-filter-select:focus {\n  border-color: var(--soc-cyan); }\n\n.soc-filter-select option {\n  background: var(--soc-bg-secondary);\n  color: var(--soc-text); }\n\n.soc-refresh-btn {\n  padding: 5px 14px;\n  border-radius: 4px;\n  border: 1px solid var(--soc-cyan);\n  background: rgba(0, 229, 255, 0.1);\n  color: var(--soc-cyan);\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-refresh-btn:hover {\n  background: rgba(0, 229, 255, 0.25); }\n\n.soc-refresh-btn.active {\n  background: var(--soc-cyan);\n  color: var(--soc-bg); }\n\n.soc-refresh-btn .soc-spin {\n  animation: soc-spin 1s linear infinite; }\n\n.soc-auto-refresh-badge {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  font-size: 10px;\n  font-weight: 600;\n  font-family: 'Arial', sans-serif;\n  background: rgba(0, 255, 136, 0.12);\n  color: var(--soc-green);\n  border: 1px solid rgba(0, 255, 136, 0.25);\n  cursor: pointer;\n  transition: all 0.2s; }\n\n.soc-auto-refresh-badge:hover {\n  background: rgba(0, 255, 136, 0.2); }\n\n.soc-auto-refresh-badge.paused {\n  background: rgba(255, 145, 0, 0.12);\n  color: var(--soc-orange);\n  border-color: rgba(255, 145, 0, 0.25); }\n\n.soc-main {\n  padding: 20px 24px;\n  max-width: 1920px;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  gap: 20px; }\n\n.soc-summary-row {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px; }\n\n.soc-summary-group {\n  border-radius: var(--soc-radius);\n  background: var(--soc-bg-panel);\n  backdrop-filter: var(--soc-panel-blur);\n  border: 1px solid var(--soc-border);\n  padding: 16px 18px;\n  position: relative;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.3s; }\n\n.soc-summary-group:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3); }\n\n.soc-summary-group::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  border-radius: var(--soc-radius) var(--soc-radius) 0 0; }\n\n.soc-summary-group.assets::before {\n  background: linear-gradient(90deg, var(--soc-cyan), var(--soc-blue)); }\n\n.soc-summary-group.security::before {\n  background: linear-gradient(90deg, var(--soc-red), var(--soc-orange)); }\n\n.soc-summary-group.logs::before {\n  background: linear-gradient(90deg, var(--soc-green), var(--soc-cyan)); }\n\n.soc-summary-group.infra::before {\n  background: linear-gradient(90deg, var(--soc-purple), var(--soc-blue)); }\n\n.soc-summary-group-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.2px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 8px; }\n\n.soc-summary-group-title .icon {\n  font-size: 14px; }\n\n.soc-summary-cards {\n  display: flex;\n  flex-direction: column;\n  gap: 10px; }\n\n.soc-summary-card {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 12px;\n  border-radius: 6px;\n  background: var(--soc-bg-secondary);\n  border: 1px solid var(--soc-border);\n  transition: background 0.2s; }\n\n.soc-summary-card:hover {\n  background: var(--soc-bg); }\n\n.soc-summary-card-label {\n  font-size: 11px;\n  color: var(--soc-text-dim); }\n\n.soc-summary-card-value {\n  font-family: 'Arial', sans-serif;\n  font-size: 20px;\n  font-weight: 700; }\n\n.soc-summary-card-value.cyan {\n  color: var(--soc-cyan); }\n\n.soc-summary-card-value.green {\n  color: var(--soc-green); }\n\n.soc-summary-card-value.red {\n  color: var(--soc-red); }\n\n.soc-summary-card-value.orange {\n  color: var(--soc-orange); }\n\n.soc-summary-card-value.blue {\n  color: var(--soc-blue); }\n\n.soc-summary-card-value.purple {\n  color: var(--soc-purple); }\n\n.soc-status-indicator {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-family: 'Arial', sans-serif;\n  font-size: 13px;\n  font-weight: 600; }\n\n.soc-status-indicator.online {\n  color: var(--soc-green); }\n\n.soc-status-indicator.offline {\n  color: var(--soc-red); }\n\n.soc-status-indicator.critical {\n  color: var(--soc-red); }\n\n.soc-charts-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px; }\n\n.soc-charts-row-3 {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 16px; }\n\n.soc-section-title {\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 1.5px;\n  color: var(--soc-text-dim);\n  margin-bottom: 14px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-family: 'Arial', sans-serif; }\n\n.soc-section-title::before {\n  content: '';\n  width: 3px;\n  height: 14px;\n  background: var(--soc-cyan);\n  border-radius: 2px; }\n\n.soc-chart-tabs {\n  display: flex;\n  gap: 2px;\n  margin-bottom: 12px;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 4px;\n  padding: 2px;\n  border: 1px solid var(--soc-border);\n  width: fit-content; }\n\n.soc-chart-tab {\n  padding: 3px 12px;\n  border-radius: 3px;\n  border: none;\n  background: transparent;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif;\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.2s;\n  text-transform: uppercase;\n  letter-spacing: 0.3px; }\n\n.soc-chart-tab:hover {\n  color: var(--soc-text);\n  background: rgba(255, 255, 255, 0.05); }\n\n.soc-chart-tab.active {\n  background: rgba(0, 229, 255, 0.2);\n  color: var(--soc-cyan);\n  box-shadow: 0 0 8px rgba(0, 229, 255, 0.2); }\n\n.soc-chart-canvas {\n  width: 100%;\n  height: 220px;\n  display: block; }\n\n.soc-chart-canvas-sm {\n  width: 100%;\n  height: 200px;\n  display: block; }\n\n.soc-chart-tooltip {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.92);\n  border: 1px solid var(--soc-cyan);\n  border-radius: 6px;\n  padding: 8px 12px;\n  font-family: 'Arial', sans-serif;\n  font-size: 11px;\n  color: var(--soc-cyan);\n  pointer-events: none;\n  z-index: 50;\n  white-space: nowrap;\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); }\n\n.soc-error-panel {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 24px 16px;\n  border: 1px solid rgba(255, 23, 68, 0.4);\n  border-radius: var(--soc-radius);\n  background: rgba(255, 23, 68, 0.06);\n  min-height: 120px; }\n\n.soc-error-icon {\n  font-size: 28px;\n  margin-bottom: 8px; }\n\n.soc-error-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--soc-red);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 4px; }\n\n.soc-error-message {\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  text-align: center;\n  max-width: 300px; }\n\n.soc-card-error {\n  color: var(--soc-red);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  display: flex;\n  align-items: center;\n  gap: 4px; }\n\n.soc-loading {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 120px; }\n\n.soc-loading-spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid rgba(0, 229, 255, 0.15);\n  border-top-color: var(--soc-cyan);\n  border-radius: 50%;\n  animation: soc-spin 0.8s linear infinite; }\n\n.soc-shimmer {\n  background: linear-gradient(90deg, rgba(255, 255, 255, 0.02) 25%, rgba(255, 255, 255, 0.06) 50%, rgba(255, 255, 255, 0.02) 75%);\n  background-size: 200% 100%;\n  animation: soc-shimmer 1.5s ease-in-out infinite;\n  border-radius: 4px;\n  height: 24px;\n  width: 60px; }\n\n.soc-legend {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  margin-top: 12px;\n  justify-content: center; }\n\n.soc-legend-item {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 11px;\n  color: var(--soc-text-dim);\n  font-family: 'Arial', sans-serif; }\n\n.soc-legend-dot {\n  width: 8px;\n  height: 8px;\n  border-radius: 2px;\n  display: inline-block; }\n\n.soc-legend-count {\n  font-weight: 600;\n  color: var(--soc-text); }\n\n.soc-root ::-webkit-scrollbar {\n  width: 6px;\n  height: 6px; }\n\n.soc-root ::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.2); }\n\n.soc-root ::-webkit-scrollbar-thumb {\n  background: rgba(255, 255, 255, 0.1);\n  border-radius: 3px; }\n\n.soc-root ::-webkit-scrollbar-thumb:hover {\n  background: rgba(255, 255, 255, 0.2); }\n\n.soc-footer {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 10px 24px;\n  background: var(--soc-footer-bg);\n  border-top: 1px solid var(--soc-border);\n  font-size: 11px;\n  font-family: 'Arial', sans-serif;\n  color: var(--soc-text-dim);\n  flex-wrap: wrap;\n  gap: 10px; }\n\n.soc-footer-items {\n  display: flex;\n  gap: 24px; }\n\n.soc-footer-item {\n  display: flex;\n  align-items: center;\n  gap: 6px; }\n\n.soc-footer-item .val {\n  color: var(--soc-green);\n  font-weight: 600; }\n\n@keyframes soc-pulse-dot {\n  0%,\n  100% {\n    opacity: 1; }\n  50% {\n    opacity: 0.5; } }\n\n@keyframes soc-spin {\n  from {\n    transform: rotate(0deg); }\n  to {\n    transform: rotate(360deg); } }\n\n@keyframes soc-shimmer {\n  0% {\n    background-position: -200% 0; }\n  100% {\n    background-position: 200% 0; } }\n\n@keyframes soc-fade-in {\n  from {\n    opacity: 0;\n    transform: translateY(8px); }\n  to {\n    opacity: 1;\n    transform: translateY(0); } }\n\n.soc-fade-in {\n  animation: soc-fade-in 0.4s ease-out; }\n\n@media (max-width: 1400px) {\n  .soc-summary-row {\n    grid-template-columns: repeat(2, 1fr); }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr 1fr; } }\n\n@media (max-width: 1024px) {\n  .soc-summary-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row {\n    grid-template-columns: 1fr; }\n  .soc-charts-row-3 {\n    grid-template-columns: 1fr; }\n  .soc-header {\n    flex-direction: column;\n    align-items: flex-start; }\n  .soc-filter-bar {\n    flex-direction: column;\n    align-items: flex-start; } }\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!********************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/css-loader/dist/runtime/api.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!***************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*******************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../node_modules/val-loader/dist/cjs.js?key=socDashboard!../../packages/osd-ui-shared-deps/public_path_module_creator.js":
/*!********************************************************************************************************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/node_modules/val-loader/dist/cjs.js?key=socDashboard!C:/Users/OT_TESTBED/opensearch-dashboard/packages/osd-ui-shared-deps/public_path_module_creator.js ***!
  \********************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__.p = window.__osdPublicPath__['socDashboard']

/***/ }),

/***/ "../../packages/osd-optimizer/target/worker/entry_point_creator.js":
/*!************************************************************************************************************!*\
  !*** C:/Users/OT_TESTBED/opensearch-dashboard/packages/osd-optimizer/target/worker/entry_point_creator.js ***!
  \************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_val_loader_dist_cjs_js_key_socDashboard_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/val-loader/dist/cjs.js?key=socDashboard!../../../osd-ui-shared-deps/public_path_module_creator.js */ "../../node_modules/val-loader/dist/cjs.js?key=socDashboard!../../packages/osd-ui-shared-deps/public_path_module_creator.js");
/* harmony import */ var _node_modules_val_loader_dist_cjs_js_key_socDashboard_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_val_loader_dist_cjs_js_key_socDashboard_osd_ui_shared_deps_public_path_module_creator_js__WEBPACK_IMPORTED_MODULE_0__);
__osdBundles__.define('plugin/socDashboard/public', __webpack_require__, /*require.resolve*/(/*! ../../../../plugins/soc_dashboard/public */ "./public/index.ts"))

/***/ }),

/***/ "./common/index.ts":
/*!*************************!*\
  !*** ./common/index.ts ***!
  \*************************/
/*! exports provided: PLUGIN_ID, PLUGIN_NAME, OPENSEARCH_HOST, OPENSEARCH_USERNAME, RTU_EVENTS_INDEX */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_ID", function() { return PLUGIN_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLUGIN_NAME", function() { return PLUGIN_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPENSEARCH_HOST", function() { return OPENSEARCH_HOST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPENSEARCH_USERNAME", function() { return OPENSEARCH_USERNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RTU_EVENTS_INDEX", function() { return RTU_EVENTS_INDEX; });
const PLUGIN_ID = 'socDashboard';
const PLUGIN_NAME = 'SOC Dashboard'; // OpenSearch connection details

const OPENSEARCH_HOST = 'https://172.24.32.131:9200';
const OPENSEARCH_USERNAME = 'admin';
const RTU_EVENTS_INDEX = 'rtu-events';

/***/ }),

/***/ "./public/index.scss":
/*!***************************!*\
  !*** ./public/index.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


switch (window.__osdThemeTag__) {
  case 'v7dark':
    return __webpack_require__(/*! ./index.scss?v7dark */ "./public/index.scss?v7dark");

  case 'v7light':
    return __webpack_require__(/*! ./index.scss?v7light */ "./public/index.scss?v7light");

  case 'v8dark':
    return __webpack_require__(/*! ./index.scss?v8dark */ "./public/index.scss?v8dark");

  case 'v8light':
    return __webpack_require__(/*! ./index.scss?v8light */ "./public/index.scss?v8light");
}

/***/ }),

/***/ "./public/index.scss?v7dark":
/*!**********************************!*\
  !*** ./public/index.scss?v7dark ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-0-1!../../../node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-0-2!../../../node_modules/comment-stripper??ref--6-oneOf-0-3!../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-0-4!./index.scss?v7dark */ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v7dark");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./public/index.scss?v7light":
/*!***********************************!*\
  !*** ./public/index.scss?v7light ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-1-2!../../../node_modules/comment-stripper??ref--6-oneOf-1-3!../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-1-4!./index.scss?v7light */ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v7light");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./public/index.scss?v8dark":
/*!**********************************!*\
  !*** ./public/index.scss?v8dark ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-2-1!../../../node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-2-2!../../../node_modules/comment-stripper??ref--6-oneOf-2-3!../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-2-4!./index.scss?v8dark */ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v8dark");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./public/index.scss?v8light":
/*!***********************************!*\
  !*** ./public/index.scss?v8light ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../../../node_modules/postcss-loader/dist/cjs.js??ref--6-oneOf-3-2!../../../node_modules/comment-stripper??ref--6-oneOf-3-3!../../../node_modules/sass-loader/dist/cjs.js??ref--6-oneOf-3-4!./index.scss?v8light */ "../../node_modules/css-loader/dist/cjs.js?!../../node_modules/postcss-loader/dist/cjs.js?!../../node_modules/comment-stripper/index.js?!../../node_modules/sass-loader/dist/cjs.js?!./public/index.scss?v8light");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "./public/index.ts":
/*!*************************!*\
  !*** ./public/index.ts ***!
  \*************************/
/*! exports provided: plugin, SocDashboardPluginSetup, SocDashboardPluginStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./public/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin */ "./public/plugin.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ "./public/types.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocDashboardPluginSetup", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["SocDashboardPluginSetup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocDashboardPluginStart", function() { return _types__WEBPACK_IMPORTED_MODULE_2__["SocDashboardPluginStart"]; });



function plugin() {
  return new _plugin__WEBPACK_IMPORTED_MODULE_1__["SocDashboardPlugin"]();
}


/***/ }),

/***/ "./public/plugin.ts":
/*!**************************!*\
  !*** ./public/plugin.ts ***!
  \**************************/
/*! exports provided: SocDashboardPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocDashboardPlugin", function() { return SocDashboardPlugin; });
/* harmony import */ var _osd_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @osd/i18n */ "@osd/i18n");
/* harmony import */ var _osd_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_osd_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common */ "./common/index.ts");


class SocDashboardPlugin {
  setup(core) {
    core.application.register({
      id: 'socDashboard',
      title: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"],
      order: 1,
      category: {
        id: 'powerplant',
        label: 'Powerplant',
        order: 0
      },

      async mount(params) {
        const {
          renderApp
        } = await __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./application */ "./public/application.tsx"));
        const [coreStart, depsStart] = await core.getStartServices();
        return renderApp(coreStart, depsStart, params);
      }

    });
    return {
      getGreeting() {
        return _osd_i18n__WEBPACK_IMPORTED_MODULE_0__["i18n"].translate('socDashboard.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: _common__WEBPACK_IMPORTED_MODULE_1__["PLUGIN_NAME"]
          }
        });
      }

    };
  }

  start(core) {
    return {};
  }

  stop() {}

}

/***/ }),

/***/ "./public/types.ts":
/*!*************************!*\
  !*** ./public/types.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "@osd/i18n":
/*!********************************************!*\
  !*** external "__osdSharedDeps__.OsdI18n" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __osdSharedDeps__.OsdI18n;

/***/ }),

/***/ "react":
/*!******************************************!*\
  !*** external "__osdSharedDeps__.React" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __osdSharedDeps__.React;

/***/ }),

/***/ "react-dom":
/*!*********************************************!*\
  !*** external "__osdSharedDeps__.ReactDom" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __osdSharedDeps__.ReactDom;

/***/ })

/******/ });
//# sourceMappingURL=socDashboard.plugin.js.map