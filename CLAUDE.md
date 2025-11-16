# CLAUDE.md

## Project Overview

**copy.js** is an elegant, production-grade clipboard library for modern web development. This file provides context and guidelines for AI assistants working on this project.

## Philosophy

This project embodies the principle that **technology married with craftsmanship yields results that make our hearts sing**. Every contribution should follow these principles:

1. **Think Different** - Question assumptions, find elegant solutions
2. **Obsess Over Details** - Every function name should sing, every edge case handled
3. **Test Everything** - No code without tests
4. **Document Thoroughly** - Explain the *why*, not just the *what*
5. **Iterate Relentlessly** - Good is not good enough
6. **Simplify Ruthlessly** - Elegance through reduction

## Project Structure

```
copy.js/
├── src/
│   └── copy.ts              # Main source - TypeScript, fully documented
├── test/
│   └── copy.test.ts         # Comprehensive test suite (13 tests)
├── dist/                    # Build output (gitignored)
│   ├── esm/                 # ES modules
│   ├── cjs/                 # CommonJS
│   ├── copy.js              # UMD development
│   └── copy.min.js          # UMD production (2.6KB)
├── scripts/
│   ├── build-umd.js         # UMD build script
│   └── fix-cjs.js           # CJS compatibility
├── examples/
│   ├── index.html           # Interactive demo
│   ├── browser-compatibility.html
│   ├── react-example.tsx
│   ├── vue-example.vue
│   └── node-example.js
└── .github/
    ├── workflows/           # CI/CD (test on Node 18, 20, 22)
    └── ISSUE_TEMPLATE/      # Bug reports, features
```

## Architecture

### Core Implementation

The library uses a **three-tier strategy**:

1. **Modern Clipboard API** (Primary)
   - Uses `navigator.clipboard.writeText()`
   - Requires secure context (HTTPS/localhost)
   - Clean, async, future-proof

2. **execCommand Fallback** (Secondary)
   - Creates invisible textarea
   - Uses `document.execCommand('copy')`
   - Works in non-secure contexts
   - iOS compatible via `setSelectionRange()`

3. **Graceful Error Handling** (Tertiary)
   - Clear error messages
   - Proper cleanup guaranteed
   - No memory leaks

### API Design

```typescript
// Promise-based (modern)
await copy(text: string, options?: CopyOptions): Promise<void>

// Callback-based (legacy compatibility)
copy(text: string, callback: CopyCallback): Promise<void>

// Feature detection
isSupported(): boolean
```

### Type Safety

Full TypeScript with strict mode:
- No `any` types
- Comprehensive JSDoc on all exports
- `.d.ts` files for both ESM and CJS

## Code Quality Standards

### TypeScript
- Strict mode enabled
- Explicit types for all parameters and returns
- Avoid `any` - use `unknown` if necessary
- Modern ES2017+ features

### Testing
- **Target**: 100% coverage on core functionality
- **Framework**: Vitest with jsdom
- **Pattern**: Arrange-Act-Assert
- Test edge cases: empty strings, Unicode, long text, rapid calls

### Documentation
- JSDoc on all public APIs
- Include `@param`, `@returns`, `@throws`, `@example`
- Examples in documentation should actually work
- Keep README.md and CHANGELOG.md updated

### Code Style
- 2 spaces, single quotes, semicolons
- 80 char line length (flexible for readability)
- Meaningful names (no `x`, `y`, `temp`)
- Comments explain *why*, not *what*

## Build System

### Commands
```bash
npm test              # Run tests
npm run build         # Build all formats
npm run typecheck     # Type checking
npm run lint          # Lint code
npm run format        # Format code
npm run demo          # Run demo server
```

### Output Formats
- **ESM** (`dist/esm/`) - Modern ES modules, tree-shakeable
- **CJS** (`dist/cjs/`) - CommonJS for Node.js
- **UMD** (`dist/copy.min.js`) - Browser global, 2.6KB minified

### Build Pipeline
1. `tsc` compiles TypeScript → ESM & CJS
2. `fix-cjs.js` adds proper CommonJS exports
3. `build-umd.js` creates browser bundles with esbuild

## Dependencies

### Runtime
**ZERO** - This is a core principle. Never add runtime dependencies.

### Development
- TypeScript 5.7+ (compiler)
- Vitest 2.x (testing)
- ESBuild 0.24+ (bundling)
- ESLint + Prettier (code quality)

## Common Tasks

### Adding a New Feature

1. **Plan**
   - Does it align with the philosophy?
   - Is it truly necessary?
   - How does it stay simple?

2. **Implement**
   - Write TypeScript in `src/copy.ts`
   - Add comprehensive JSDoc
   - Keep it elegant and minimal

3. **Test**
   - Add tests in `test/copy.test.ts`
   - Cover success, failure, edge cases
   - Ensure 100% coverage

4. **Document**
   - Update README.md
   - Add to CHANGELOG.md
   - Create example if needed

5. **Build & Verify**
   ```bash
   npm run build
   npm test
   npm run typecheck
   npm run lint
   ```

### Fixing a Bug

1. **Reproduce** - Write a failing test first
2. **Fix** - Minimal change to fix the issue
3. **Test** - Ensure the test passes
4. **Verify** - Run full test suite
5. **Document** - Update CHANGELOG.md

### Updating Dependencies

1. Check for breaking changes
2. Update `package.json`
3. Run `npm install`
4. Test thoroughly
5. Update CI if needed

## CI/CD

### Workflows

**CI** (`.github/workflows/ci.yml`):
- Runs on: push to main/develop/claude/**, PRs
- Tests on: Node 18, 20, 22
- Steps: typecheck → lint → test → build
- Uploads: coverage to Codecov (optional)

**CodeQL** (`.github/workflows/codeql.yml`):
- Security scanning
- Runs weekly + on PRs

**Release** (`.github/workflows/release.yml`):
- Triggered by: version tags (v*)
- Publishes to npm automatically
- Creates GitHub release

### Important Notes
- No `npm ci` - we use `npm install` (no lock file)
- No cache for npm (not needed for libraries)
- Build artifacts are gitignored but included in npm package

## Security

### Principles
- Never use `eval()` or `Function()` constructor
- No innerHTML (use textContent)
- Sanitize if accepting untrusted input
- Regular dependency audits
- CodeQL scanning enabled

### Vulnerability Response
1. Assess impact
2. Create patch ASAP
3. Update CHANGELOG.md with security note
4. Release patch version
5. Consider security advisory if critical

## Examples & Demos

### Interactive Demo (`examples/index.html`)
- Beautiful UI with gradient design
- Real-time copy counter
- Multiple test scenarios
- Browser compatibility display
- Self-contained (works offline)

### Compatibility Test (`examples/browser-compatibility.html`)
- 17 automated tests
- Performance measurements
- Environment detection
- Run-all-tests feature

### Framework Examples
- **React**: Hooks pattern, TypeScript
- **Vue**: Composition API + Options API
- **Node.js**: Usage notes (browser-only library)

## Versioning

Follow **Semantic Versioning** (semver):

- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backwards compatible
- **PATCH** (0.0.1): Bug fixes

### Current Version: 0.2.0

Breaking changes from 0.1.x:
- Promise-based API (was callback-only)
- Error-first callbacks (was boolean error)
- TypeScript (was JavaScript)
- Modern build (was Browserify)

## Contributing

See `CONTRIBUTING.md` for detailed guidelines.

**Quick Checklist**:
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Code formatted (`npm run format`)
- [ ] All tests pass (`npm test`)
- [ ] TypeScript compiles (`npm run typecheck`)
- [ ] Linter passes (`npm run lint`)

## Package Publishing

### Pre-publish Checklist
1. All tests passing
2. Version bumped in `package.json`
3. CHANGELOG.md updated
4. Build successful
5. README.md accurate
6. Examples working

### Publish Process
```bash
# Manual
npm version [major|minor|patch]
git push --tags
npm publish

# Automatic (via GitHub)
git tag v0.2.1
git push --tags
# CI will build and publish
```

## Known Gotchas

### Browser Compatibility
- Clipboard API requires HTTPS (except localhost)
- Some browsers block clipboard in background tabs
- execCommand is deprecated but still works

### Testing
- jsdom doesn't have real clipboard
- Must mock `navigator.clipboard`
- execCommand tests use real DOM manipulation

### Build
- `prepare` script runs on install (builds dist/)
- This is intentional for git installs
- npm ignores test files (see `.npmignore`)

## Future Considerations

### Potential Enhancements
- [ ] Read from clipboard (needs user permission)
- [ ] Copy rich text/HTML
- [ ] Copy images
- [ ] Permissions API integration
- [ ] React/Vue npm packages

### Won't Do
- ❌ Node.js clipboard (use `clipboardy` instead)
- ❌ File system operations
- ❌ Any runtime dependencies
- ❌ Non-browser environments

## Resources

- [MDN: Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- [Clipboard API Spec](https://w3c.github.io/clipboard-apis/)
- [Can I Use: Clipboard API](https://caniuse.com/async-clipboard)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

## Questions?

When in doubt:
1. Check existing code patterns
2. Read the tests
3. Look at examples
4. Consult CONTRIBUTING.md
5. Keep it simple and elegant

---

**Remember**: We're not just writing code—we're crafting an elegant, inevitable solution.

Made with obsessive attention to detail. 🎯
