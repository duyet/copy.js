# copy.js

[![npm version](https://badge.fury.io/js/copy-js.svg)](https://badge.fury.io/js/copy-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Elegant clipboard copy for the modern web. Zero dependencies, TypeScript support, Promise-based with intelligent fallbacks.

## Why copy.js?

In 2025, clipboard operations should be simple, reliable, and elegant. copy.js provides:

- **Modern First** - Uses the Clipboard API with intelligent fallback to `execCommand`
- **Promise-Based** - Clean async/await syntax, with optional callback support
- **TypeScript Native** - Full type definitions included
- **Zero Dependencies** - Lightweight at ~2KB minified
- **Bulletproof** - Comprehensive test suite covering edge cases
- **Universal** - Works in modern browsers, gracefully degrades for legacy support
- **Well-Crafted** - Every line of code written with obsessive attention to detail

## Installation

```bash
npm install copy-js
```

```bash
yarn add copy-js
```

```bash
pnpm add copy-js
```

Or use a CDN (UMD build):

```html
<script src="https://unpkg.com/copy-js@latest/dist/copy.min.js"></script>
```

## Usage

### Modern Promise-Based API

```javascript
import copy from 'copy-js';

// Simple copy
await copy('Hello, world!');

// With error handling
try {
  await copy('Your text here');
  console.log('✓ Copied!');
} catch (err) {
  console.error('✗ Failed to copy:', err);
}
```

### TypeScript

```typescript
import copy, { isSupported, CopyOptions } from 'copy-js';

// Full type safety
const options: CopyOptions = {
  fallback: true,
  debug: false,
};

await copy('TypeScript is awesome!', options);

// Check if clipboard is supported
if (isSupported()) {
  await copy('Clipboard is available');
}
```

### Legacy Callback Style

For backwards compatibility with older codebases:

```javascript
copy('Legacy code', (err) => {
  if (err) {
    console.error('Failed to copy');
  } else {
    console.log('Copied successfully!');
  }
});
```

### CommonJS

```javascript
const copy = require('copy-js');

copy('CommonJS works too!')
  .then(() => console.log('Copied!'))
  .catch((err) => console.error('Failed:', err));
```

### Browser Global

```html
<script src="https://unpkg.com/copy-js@latest/dist/copy.min.js"></script>
<script>
  copy('Hello from the browser!').then(() => {
    console.log('Copied!');
  });
</script>
```

## API

### `copy(text, options?)`

Copies text to the clipboard.

**Parameters:**

- `text` (string): The text to copy
- `options` (CopyOptions | CopyCallback): Optional configuration or callback

**Returns:** `Promise<void>`

**Options:**

```typescript
interface CopyOptions {
  // Fallback to execCommand if Clipboard API unavailable
  fallback?: boolean; // default: true

  // Log warnings to console
  debug?: boolean; // default: true
}
```

**Examples:**

```javascript
// Disable fallback (only use modern Clipboard API)
await copy('Modern only', { fallback: false });

// Disable debug warnings
await copy('Silent mode', { debug: false });

// Both options
await copy('Configured', { fallback: true, debug: false });
```

### `isSupported()`

Check if clipboard operations are supported in the current environment.

**Returns:** `boolean`

```javascript
import { isSupported } from 'copy-js';

if (isSupported()) {
  await copy('Clipboard is available');
} else {
  console.warn('Clipboard not supported in this environment');
}
```

## Browser Support

| Feature         | Support                                                |
| --------------- | ------------------------------------------------------ |
| Clipboard API   | Chrome 66+, Firefox 63+, Safari 13.1+, Edge 79+       |
| execCommand     | All modern browsers + IE 9+                            |
| Secure Context  | Required for Clipboard API (HTTPS or localhost)        |
| Fallback        | Automatic degradation to execCommand when API unavailable |

**Notes:**

- Modern Clipboard API requires a secure context (HTTPS or localhost)
- Fallback to `execCommand` works in non-secure contexts
- Full support across all modern browsers
- Graceful degradation for legacy environments

## How It Works

copy.js uses an intelligent dual-strategy approach:

1. **Modern Clipboard API** (Primary)
   - Attempts `navigator.clipboard.writeText()` first
   - Clean, async, and future-proof
   - Requires secure context (HTTPS)

2. **execCommand Fallback** (Secondary)
   - Creates an invisible textarea element
   - Selects and copies text using `document.execCommand('copy')`
   - Works in non-secure contexts
   - Automatically cleaned up after use

This ensures maximum compatibility while using the best available method.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Build all formats (ESM, CJS, UMD)
npm run build

# Type check
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format
```

## Testing Philosophy

This library is tested with obsessive attention to detail:

- ✓ Modern Clipboard API success cases
- ✓ Legacy execCommand fallback scenarios
- ✓ Error handling and edge cases
- ✓ Callback-style compatibility
- ✓ Unicode, emoji, and special characters
- ✓ Multi-line text handling
- ✓ Very long text (10,000+ characters)
- ✓ Rapid successive calls
- ✓ Empty strings and whitespace
- ✓ Configuration options

**Coverage:** 90%+ on all metrics (lines, functions, branches, statements)

## Migration from v0.1.x

If you're upgrading from the original copy.js:

**Old (v0.1.x):**
```javascript
// Returns error state (confusing!)
const hasError = copy('text');

// Callback receives error
copy('text', function(err) {
  if (err) console.log('Failed');
});
```

**New (v0.2.x):**
```javascript
// Promise-based (modern!)
await copy('text');

// Callback still works but receives error-first
copy('text', (err) => {
  if (err) console.error('Failed');
});
```

**Breaking Changes:**

- Return value changed from error state to Promise
- Modern async/await API
- TypeScript rewrite with full type safety
- Callback signature changed to error-first convention
- Removed IE 8 support (use v0.1.x for IE 8)

## Contributing

Contributions are welcome! This project follows a philosophy of craftsmanship:

1. **Think Different** - Question assumptions, find elegant solutions
2. **Test Everything** - No patch accepted without tests
3. **Document Thoroughly** - Code should be self-explanatory, but document the why
4. **Obsess Over Details** - Every function name should sing, every edge case handled

```bash
# Fork the project
# Create a topic branch
git checkout -b feature/amazing-improvement

# Make your changes
# Ensure tests pass
npm test

# Ensure code is formatted
npm run format

# Create a pull request
```

## Philosophy

This library embodies the principle that technology alone is not enough. It's technology married with craftsmanship, attention to detail, and obsessive refinement that yields results that make our hearts sing.

Every line of code has been:
- Questioned for necessity
- Refined for elegance
- Tested for robustness
- Documented for clarity

The goal isn't just a working clipboard library—it's the *inevitable* clipboard library.

## License

MIT License

Copyright (c) 2016-2025 Van-Duyet Le

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

<p align="center">
  Made with obsessive attention to detail
</p>
