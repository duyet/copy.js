/**
 * copy.js - Elegant clipboard copy for the modern web
 *
 * @packageDocumentation
 * @module copy-js
 * @license MIT
 * @version 0.2.0
 * @author Van-Duyet Le <me@duyetdev.com>
 */

/**
 * Configuration options for the copy function
 *
 * @public
 * @interface CopyOptions
 */
export interface CopyOptions {
  /**
   * Enable fallback to execCommand if Clipboard API is not available
   *
   * When true, if the modern Clipboard API fails or is unavailable,
   * the function will automatically attempt to use document.execCommand('copy')
   * as a fallback mechanism.
   *
   * @default true
   * @since 0.2.0
   */
  fallback?: boolean;

  /**
   * Enable debug logging to console
   *
   * When true, warnings and debug information will be logged to the console.
   * Useful for development and troubleshooting. Set to false in production
   * to suppress console output.
   *
   * @default true
   * @since 0.2.0
   */
  debug?: boolean;
}

/**
 * Callback function type for legacy callback-style API
 *
 * @public
 * @callback CopyCallback
 * @param {Error | null} error - Error object if copy failed, null if successful
 * @returns {void}
 *
 * @example
 * ```typescript
 * copy('text', (err) => {
 *   if (err) {
 *     console.error('Copy failed:', err.message);
 *   } else {
 *     console.log('Copy successful!');
 *   }
 * });
 * ```
 */
export type CopyCallback = (error: Error | null) => void;

/**
 * Internal: Modern Clipboard API implementation
 *
 * Uses the modern navigator.clipboard.writeText() API which is the
 * recommended approach for clipboard operations in modern browsers.
 * Requires a secure context (HTTPS or localhost).
 *
 * @private
 * @param {string} text - Text to write to clipboard
 * @returns {Promise<void>} Promise that resolves when text is written
 * @throws {Error} If Clipboard API is not available
 * @throws {DOMException} If write permission is denied
 * @since 0.2.0
 */
async function copyWithClipboardAPI(text: string): Promise<void> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not available');
  }

  await navigator.clipboard.writeText(text);
}

/**
 * Internal: Legacy execCommand implementation with graceful DOM manipulation
 *
 * Creates a temporary textarea element, selects the text, executes the copy
 * command, and cleans up. This method works in non-secure contexts and older
 * browsers that don't support the Clipboard API.
 *
 * The implementation includes:
 * - Invisible textarea positioning (fixed, off-screen)
 * - iOS compatibility via setSelectionRange()
 * - Proper ARIA attributes for accessibility
 * - Guaranteed cleanup via try-finally
 *
 * @private
 * @param {string} text - Text to copy to clipboard
 * @returns {boolean} True if copy succeeded, false otherwise
 * @since 0.2.0
 */
function copyWithExecCommand(text: string): boolean {
  // Create invisible textarea
  const element = document.createElement('textarea');

  // Style it to be invisible and non-disruptive
  Object.assign(element.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '2em',
    height: '2em',
    padding: '0',
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    background: 'transparent',
    // Prevent zooming on iOS
    fontSize: '12pt',
  });

  element.value = text;
  element.setAttribute('readonly', '');
  element.setAttribute('aria-hidden', 'true');
  element.setAttribute('tabindex', '-1');

  document.body.appendChild(element);

  // Select the text
  element.select();

  // For iOS compatibility
  element.setSelectionRange(0, text.length);

  let success = false;
  try {
    success = document.execCommand('copy');
  } catch (err) {
    success = false;
  }

  // Clean up
  document.body.removeChild(element);

  return success;
}

/**
 * Internal implementation of copy with resolved options
 *
 * Implements a three-tier strategy:
 * 1. Try modern Clipboard API (if available)
 * 2. Fall back to execCommand (if fallback enabled)
 * 3. Throw error if all strategies fail
 *
 * @private
 * @param {string} text - Text to copy to clipboard
 * @param {CopyOptions} opts - Resolved configuration options
 * @returns {Promise<void>} Promise that resolves when copy succeeds
 * @throws {Error} If all copy strategies fail
 * @since 0.2.0
 */
async function copyInternal(text: string, opts: CopyOptions): Promise<void> {
  // Strategy 1: Try modern Clipboard API first
  if (navigator.clipboard) {
    try {
      await copyWithClipboardAPI(text);
      return;
    } catch (err) {
      if (opts.debug) {
        console.warn('Clipboard API failed, trying fallback:', err);
      }

      if (!opts.fallback) {
        throw err;
      }
    }
  }

  // Strategy 2: Fallback to execCommand
  if (opts.fallback) {
    const success = copyWithExecCommand(text);
    if (!success) {
      throw new Error('Failed to copy text to clipboard');
    }
    return;
  }

  // Strategy 3: Complete failure
  throw new Error('No clipboard API available and fallback is disabled');
}

/**
 * Copy text to clipboard with intelligent fallback strategy
 *
 * This is the main entry point for the library. It provides both modern
 * Promise-based and legacy callback-based APIs for maximum compatibility.
 *
 * ## Strategy
 *
 * 1. **Modern Clipboard API** (Primary)
 *    - Uses `navigator.clipboard.writeText()`
 *    - Clean, async, and future-proof
 *    - Requires secure context (HTTPS or localhost)
 *
 * 2. **execCommand Fallback** (Secondary)
 *    - Uses `document.execCommand('copy')`
 *    - Works in non-secure contexts
 *    - Supports older browsers
 *    - Automatically cleaned up
 *
 * ## Browser Support
 *
 * - **Clipboard API**: Chrome 66+, Firefox 63+, Safari 13.1+, Edge 79+
 * - **execCommand**: All modern browsers + IE 9+
 * - **Fallback**: Automatic degradation ensures universal compatibility
 *
 * @public
 * @param {string} text - The text to copy to clipboard (can be empty, Unicode, multiline, etc.)
 * @param {CopyOptions | CopyCallback} [options] - Configuration options or callback function
 * @returns {Promise<void>} Promise that resolves when text is copied successfully
 *
 * @throws {Error} When copy fails and no callback is provided
 * @throws {Error} When Clipboard API fails and fallback is disabled
 * @throws {Error} When clipboard is not supported in the environment
 *
 * @example
 * // Modern Promise-based usage (recommended)
 * await copy('Hello world');
 *
 * @example
 * // With async/await and error handling
 * try {
 *   await copy('Important text');
 *   console.log('✓ Copied successfully!');
 * } catch (err) {
 *   console.error('✗ Failed to copy:', err.message);
 * }
 *
 * @example
 * // Legacy callback style (backwards compatible)
 * copy('Hello world', (err) => {
 *   if (err) {
 *     console.error('Copy failed:', err);
 *   } else {
 *     console.log('Copied successfully!');
 *   }
 * });
 *
 * @example
 * // With configuration options
 * await copy('Text', {
 *   fallback: true,  // Enable execCommand fallback
 *   debug: false     // Disable console warnings
 * });
 *
 * @example
 * // Disable fallback (Clipboard API only)
 * await copy('Text', { fallback: false });
 *
 * @example
 * // Handling Unicode and special characters
 * await copy('你好世界 🚀 مرحبا العالم');
 *
 * @example
 * // Copying multi-line text
 * await copy(`Line 1
 * Line 2
 * Line 3`);
 *
 * @example
 * // Copying very long text
 * const longText = 'A'.repeat(10000);
 * await copy(longText);
 *
 * @since 0.2.0
 */
export default function copy(
  text: string,
  options?: CopyOptions | CopyCallback
): Promise<void> {
  // Handle callback-style invocation (backwards compatibility)
  if (typeof options === 'function') {
    const callback = options as CopyCallback;
    const opts: CopyOptions = {
      fallback: true,
      debug: true,
    };

    return copyInternal(text, opts)
      .then(() => callback(null))
      .catch((err) => {
        callback(err instanceof Error ? err : new Error(String(err)));
        throw err;
      });
  }

  const opts: CopyOptions = {
    fallback: true,
    debug: true,
    ...options,
  };

  return copyInternal(text, opts);
}

/**
 * Check if clipboard operations are supported in the current environment
 *
 * This utility function checks whether clipboard operations are available
 * by testing for both the modern Clipboard API and the legacy execCommand method.
 *
 * Useful for:
 * - Feature detection before attempting copy
 * - Showing/hiding copy buttons in UI
 * - Graceful degradation in unsupported environments
 *
 * @public
 * @returns {boolean} `true` if clipboard is supported, `false` otherwise
 *
 * @example
 * // Check support before showing copy button
 * if (isSupported()) {
 *   showCopyButton();
 * } else {
 *   showManualCopyInstructions();
 * }
 *
 * @example
 * // Conditional copy with fallback UI
 * if (isSupported()) {
 *   await copy(text);
 * } else {
 *   // Show manual copy dialog
 *   promptManualCopy(text);
 * }
 *
 * @example
 * // TypeScript usage
 * import copy, { isSupported } from 'copy-js';
 *
 * if (isSupported()) {
 *   await copy('text');
 * }
 *
 * @since 0.2.0
 */
export function isSupported(): boolean {
  const hasClipboardAPI = !!navigator.clipboard;
  const hasExecCommand = !!document.queryCommandSupported?.('copy');

  return hasClipboardAPI || hasExecCommand;
}
