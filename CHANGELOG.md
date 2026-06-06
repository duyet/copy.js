# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-11-16

### 🎉 Complete Rewrite

This is a complete reimagining of copy.js - not just an update, but a total transformation for modern web development.

### Added

- **TypeScript Support**: Full TypeScript rewrite with comprehensive type definitions
- **Modern Clipboard API**: Primary implementation using `navigator.clipboard.writeText()`
- **Promise-based API**: Clean async/await syntax for modern JavaScript
- **Intelligent Fallback**: Automatic degradation to `document.execCommand()` when Clipboard API unavailable
- **Multiple Module Formats**:
  - ESM (ES Modules) - `dist/esm/copy.js`
  - CJS (CommonJS) - `dist/cjs/copy.js`
  - UMD (Universal) - `dist/copy.min.js` (2.5KB minified)
- **Comprehensive Testing**: 13 tests covering all edge cases with Vitest
- **GitHub Actions CI/CD**: Automated testing on Node 18, 20, 22
- **Modern Build System**:
  - TypeScript 5.7 compiler
  - ESBuild for UMD bundles
  - Source maps for debugging
- **Enhanced Documentation**:
  - Complete API reference
  - Usage examples for all scenarios
  - Browser compatibility matrix
  - Migration guide from v0.1.x
- **Configuration Options**:
  - `fallback`: Enable/disable execCommand fallback
  - `debug`: Control console warnings
- **Utility Functions**:
  - `isSupported()`: Check clipboard availability
- **Edge Case Handling**:
  - Unicode and emoji support (✓ tested)
  - Multi-line text (✓ tested)
  - Very long strings (10,000+ chars) (✓ tested)
  - Special characters (✓ tested)
  - Rapid successive calls (✓ tested)
  - Empty strings and whitespace (✓ tested)
- **Developer Tools**:
  - ESLint configuration
  - Prettier formatting
  - Pre-configured scripts for build/test/lint

### Changed

- **API**: Switched from callback-only to Promise-first (with callback compatibility)
- **Return Value**: Now returns `Promise<void>` instead of boolean error state
- **Callback Signature**: Changed to error-first convention `(err) => void`
- **Module System**: From Browserify to native ESM + CJS + UMD
- **Build Output**: From single concatenated file to optimized multi-format builds
- **Testing**: From Karma+PhantomJS to Vitest+jsdom
- **Minimum Node Version**: Now requires Node.js 14.0.0+
- **Package Size**: Reduced to 2.5KB minified (was unoptimized)

### Removed

- **Dependencies**: All runtime dependencies removed (now zero dependencies!)
- **Legacy Support**: Removed IE 8 compatibility (use v0.1.x if needed)
- **Deprecated Tools**:
  - Removed Browserify in favor of TypeScript + ESBuild
  - Removed UglifyJS in favor of ESBuild minification
  - Removed Karma test runner in favor of Vitest
  - Removed PhantomJS in favor of jsdom
  - Removed Bower support (deprecated in 2017)
- **Old Parameters**: Removed confusing boolean return value

### Fixed

- **Memory Leaks**: Properly cleanup temporary DOM elements
- **iOS Compatibility**: Added `setSelectionRange()` for iOS devices
- **Error Handling**: Comprehensive try-catch with meaningful error messages
- **TypeScript Errors**: Full type safety throughout codebase
- **Security**: Removed all vulnerable dependencies

### Breaking Changes

⚠️ **Version 0.2.0 contains breaking changes**

1. **Return Value Changed**

   ```javascript
   // Old (v0.1.x) - returns boolean
   const hasError = copy('text');

   // New (v0.2.x) - returns Promise
   await copy('text');
   ```

2. **Callback Signature Changed**

   ```javascript
   // Old (v0.1.x) - error as boolean
   copy('text', function (err) {
     if (err) console.log('Failed');
   });

   // New (v0.2.x) - error-first callback
   copy('text', (err) => {
     if (err) console.error('Failed:', err);
   });
   ```

3. **Minimum Node.js Version**: v14.0.0 (was: any)

4. **No IE 8 Support**: Use v0.1.x for legacy browsers

5. **Import Changes**

   ```javascript
   // CommonJS (both work)
   const copy = require('copy-js');
   // or
   const { default: copy, isSupported } = require('copy-js');

   // ESM
   import copy, { isSupported } from 'copy-js';
   ```

### Migration Guide

See [README.md#migration-from-v01x](README.md#migration-from-v01x) for detailed migration instructions.

### Security

- Zero runtime dependencies = minimal attack surface
- Regular security audits via GitHub Actions
- Modern secure coding practices
- No eval() or unsafe operations

### Performance

- 2.5KB minified (UMD) vs unoptimized v0.1.x
- Tree-shakeable ESM build
- Optimized async operations
- Minimal DOM manipulation

---

## [0.1.1] - 2016-03-XX

### Fixed

- Minor bug fixes

## [0.1.0] - 2016-03-XX

### Added

- Initial release
- Basic clipboard copy using `document.execCommand()`
- Callback support
- Browserify bundling

---

[0.2.0]: https://github.com/duyetdev/copy.js/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/duyetdev/copy.js/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/duyetdev/copy.js/releases/tag/v0.1.0
