/**
 * copy.js - Elegant clipboard copy for the modern web
 * @license MIT
 */

export interface CopyOptions {
  /**
   * Fallback to execCommand if Clipboard API is not available
   * @default true
   */
  fallback?: boolean;

  /**
   * Log warnings to console
   * @default true
   */
  debug?: boolean;
}

export type CopyCallback = (error: Error | null) => void;

/**
 * Internal: Modern Clipboard API implementation
 */
async function copyWithClipboardAPI(text: string): Promise<void> {
  if (!navigator.clipboard) {
    throw new Error('Clipboard API not available');
  }

  await navigator.clipboard.writeText(text);
}

/**
 * Internal: Legacy execCommand implementation with graceful DOM manipulation
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
 * Copy text to clipboard with intelligent fallback strategy
 *
 * @param text - The text to copy to clipboard
 * @param options - Optional configuration or callback function
 * @returns Promise that resolves when text is copied, or boolean if callback provided
 *
 * @example
 * // Modern Promise-based usage
 * await copy('Hello world');
 *
 * @example
 * // With error handling
 * try {
 *   await copy('Hello world');
 *   console.log('✓ Copied!');
 * } catch (err) {
 *   console.error('✗ Failed:', err);
 * }
 *
 * @example
 * // Legacy callback style (backwards compatible)
 * copy('Hello world', (err) => {
 *   if (err) console.error('Failed');
 *   else console.log('Copied!');
 * });
 *
 * @example
 * // With options
 * await copy('Hello world', { fallback: false, debug: true });
 */
async function copyInternal(
  text: string,
  opts: CopyOptions
): Promise<void> {
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
 * Check if clipboard operations are supported in current environment
 */
export function isSupported(): boolean {
  const hasClipboardAPI = !!navigator.clipboard;
  const hasExecCommand = !!document.queryCommandSupported?.('copy');

  return hasClipboardAPI || hasExecCommand;
}
