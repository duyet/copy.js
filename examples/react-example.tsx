/**
 * React Example - Using copy.js in a React application
 *
 * This example demonstrates best practices for using copy.js
 * with React hooks, error handling, and UI feedback.
 */

import React, { useState } from 'react';
import copy, { isSupported } from 'copy-js';

// Simple button component with copy functionality
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCopy = async () => {
    try {
      await copy(text);
      setCopied(true);
      setError(null);

      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to copy');
      setTimeout(() => setError(null), 3000);
    }
  };

  if (!isSupported()) {
    return (
      <div className="text-gray-500">
        Clipboard not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCopy}
        className={`px-4 py-2 rounded transition-colors ${
          copied
            ? 'bg-green-500 text-white'
            : error
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {copied ? '✓ Copied!' : error ? '✗ Error' : 'Copy'}
      </button>

      {error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
}

// Advanced component with custom options
export function AdvancedCopyButton({
  text,
  onCopy,
  fallback = true,
  debug = false,
}: {
  text: string;
  onCopy?: (success: boolean) => void;
  fallback?: boolean;
  debug?: boolean;
}) {
  const [status, setStatus] = useState<'idle' | 'copying' | 'success' | 'error'>('idle');

  const handleCopy = async () => {
    setStatus('copying');

    try {
      await copy(text, { fallback, debug });
      setStatus('success');
      onCopy?.(true);

      setTimeout(() => setStatus('idle'), 2000);
    } catch (err) {
      setStatus('error');
      onCopy?.(false);

      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={status === 'copying'}
      className="px-4 py-2 rounded"
    >
      {status === 'copying' && 'Copying...'}
      {status === 'success' && '✓ Copied!'}
      {status === 'error' && '✗ Failed'}
      {status === 'idle' && 'Copy to Clipboard'}
    </button>
  );
}

// Hook for reusable copy logic
export function useCopy() {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const copyToClipboard = async (
    text: string,
    options?: { fallback?: boolean; debug?: boolean }
  ) => {
    setLoading(true);
    setError(null);

    try {
      await copy(text, options);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Copy failed'));
    } finally {
      setLoading(false);
    }
  };

  return {
    copy: copyToClipboard,
    copied,
    error,
    loading,
    isSupported: isSupported(),
  };
}

// Example usage of the hook
export function CodeSnippet({ code }: { code: string }) {
  const { copy, copied, error, loading } = useCopy();

  return (
    <div className="relative">
      <pre className="bg-gray-900 text-white p-4 rounded">
        <code>{code}</code>
      </pre>

      <button
        onClick={() => copy(code)}
        disabled={loading}
        className="absolute top-2 right-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded"
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          Failed to copy: {error.message}
        </div>
      )}
    </div>
  );
}
