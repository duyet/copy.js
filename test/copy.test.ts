/**
 * Test suite for copy.js
 *
 * Note: Due to jsdom limitations, we primarily test the execCommand fallback.
 * The modern Clipboard API works correctly in real browsers but is difficult
 * to mock in jsdom. Manual testing confirms Clipboard API functionality.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import copy, { isSupported } from '../src/copy';

describe('copy.js', () => {
  let originalExecCommand: typeof document.execCommand;

  beforeEach(() => {
    originalExecCommand = document.execCommand;
  });

  afterEach(() => {
    document.execCommand = originalExecCommand;
  });

  describe('execCommand fallback', () => {
    it('should copy text using execCommand', async () => {
      const execCommandMock = vi.fn().mockReturnValue(true);
      document.execCommand = execCommandMock;

      await copy('Hello, world!');

      expect(execCommandMock).toHaveBeenCalledWith('copy');
    });

    it('should handle empty strings', async () => {
      const execCommandMock = vi.fn().mockReturnValue(true);
      document.execCommand = execCommandMock;

      await copy('');

      expect(execCommandMock).toHaveBeenCalled();
    });

    it('should clean up textarea element after copy', async () => {
      document.execCommand = vi.fn().mockReturnValue(true);

      const initialChildCount = document.body.children.length;
      await copy('Test cleanup');
      const finalChildCount = document.body.children.length;

      expect(finalChildCount).toBe(initialChildCount);
    });

    it('should throw error when execCommand fails', async () => {
      document.execCommand = vi.fn().mockReturnValue(false);

      await expect(copy('Should fail')).rejects.toThrow(
        'Failed to copy text to clipboard'
      );
    });

    it('should handle execCommand exceptions', async () => {
      document.execCommand = vi.fn().mockImplementation(() => {
        throw new Error('execCommand not supported');
      });

      await expect(copy('Should fail')).rejects.toThrow();
    });

    it('should handle Unicode and special characters', async () => {
      document.execCommand = vi.fn().mockReturnValue(true);

      await copy('你好世界 🚀 مرحبا العالم !@#$%^&*()');

      expect(document.execCommand).toHaveBeenCalled();
    });
  });

  describe('Callback API', () => {
    it('should support callback with success', async () => {
      document.execCommand = vi.fn().mockReturnValue(true);

      return new Promise<void>((resolve, reject) => {
        copy('Callback test', (err) => {
          try {
            expect(err).toBeNull();
            resolve();
          } catch (e) {
            reject(e);
          }
        }).catch(() => {
          // Promise still rejects after callback
        });
      });
    });

    it('should support callback with error', async () => {
      document.execCommand = vi.fn().mockReturnValue(false);

      return new Promise<void>((resolve, reject) => {
        copy('Should fail', (err) => {
          try {
            expect(err).toBeInstanceOf(Error);
            expect(err?.message).toContain('Failed to copy');
            resolve();
          } catch (e) {
            reject(e);
          }
        }).catch(() => {
          // Expected to reject
        });
      });
    });
  });

  describe('Options', () => {
    it('should respect debug: false option', async () => {
      const consoleWarnSpy = vi
        .spyOn(console, 'warn')
        .mockImplementation(() => {});
      document.execCommand = vi.fn().mockImplementation(() => {
        throw new Error('Test error');
      });

      try {
        await copy('Test', { debug: false });
      } catch (e) {
        // Expected to fail
      }

      expect(consoleWarnSpy).not.toHaveBeenCalled();
      consoleWarnSpy.mockRestore();
    });
  });

  describe('isSupported()', () => {
    it('should return boolean', () => {
      const result = isSupported();
      expect(typeof result).toBe('boolean');
    });
  });

  describe('Edge cases', () => {
    it('should handle very long text', async () => {
      document.execCommand = vi.fn().mockReturnValue(true);

      const longText = 'A'.repeat(10000);
      await copy(longText);

      expect(document.execCommand).toHaveBeenCalled();
    });

    it('should handle rapid successive calls', async () => {
      document.execCommand = vi.fn().mockReturnValue(true);

      await Promise.all([copy('Text 1'), copy('Text 2'), copy('Text 3')]);

      expect(document.execCommand).toHaveBeenCalledTimes(3);
    });

    it('should handle multiline text', async () => {
      document.execCommand = vi.fn().mockReturnValue(true);

      await copy('Line 1\nLine 2\nLine 3');

      expect(document.execCommand).toHaveBeenCalled();
    });
  });
});
