/*!
 * copy-js v0.2.0
 * Elegant clipboard copy for the modern web. Zero dependencies, TypeScript support, Promise-based with intelligent fallbacks.
 * https://github.com/duyetdev/copy.js#readme
 *
 * Copyright (c) 2025 Van-Duyet Le <me@duyetdev.com>
 * Released under the MIT License
 */
"use strict";
var copy = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/copy.ts
  var copy_exports = {};
  __export(copy_exports, {
    default: () => copy,
    isSupported: () => isSupported
  });
  async function copyWithClipboardAPI(text) {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not available");
    }
    await navigator.clipboard.writeText(text);
  }
  function copyWithExecCommand(text) {
    const element = document.createElement("textarea");
    Object.assign(element.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "2em",
      height: "2em",
      padding: "0",
      border: "none",
      outline: "none",
      boxShadow: "none",
      background: "transparent",
      // Prevent zooming on iOS
      fontSize: "12pt"
    });
    element.value = text;
    element.setAttribute("readonly", "");
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("tabindex", "-1");
    document.body.appendChild(element);
    element.select();
    element.setSelectionRange(0, text.length);
    let success = false;
    try {
      success = document.execCommand("copy");
    } catch (err) {
      success = false;
    }
    document.body.removeChild(element);
    return success;
  }
  async function copyInternal(text, opts) {
    if (navigator.clipboard) {
      try {
        await copyWithClipboardAPI(text);
        return;
      } catch (err) {
        if (opts.debug) {
          console.warn("Clipboard API failed, trying fallback:", err);
        }
        if (!opts.fallback) {
          throw err;
        }
      }
    }
    if (opts.fallback) {
      const success = copyWithExecCommand(text);
      if (!success) {
        throw new Error("Failed to copy text to clipboard");
      }
      return;
    }
    throw new Error("No clipboard API available and fallback is disabled");
  }
  function copy(text, options) {
    if (typeof options === "function") {
      const callback = options;
      const opts2 = {
        fallback: true,
        debug: true
      };
      return copyInternal(text, opts2).then(() => callback(null)).catch((err) => {
        callback(err instanceof Error ? err : new Error(String(err)));
        throw err;
      });
    }
    const opts = __spreadValues({
      fallback: true,
      debug: true
    }, options);
    return copyInternal(text, opts);
  }
  function isSupported() {
    var _a;
    const hasClipboardAPI = !!navigator.clipboard;
    const hasExecCommand = !!((_a = document.queryCommandSupported) == null ? void 0 : _a.call(document, "copy"));
    return hasClipboardAPI || hasExecCommand;
  }
  return __toCommonJS(copy_exports);
})();
/**
 * copy.js - Elegant clipboard copy for the modern web
 * @license MIT
 */
//# sourceMappingURL=copy.js.map
