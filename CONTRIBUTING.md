# Contributing to copy.js

First off, thank you for considering contributing to copy.js! It's people like you that make this library elegant and robust.

## Philosophy

This project follows a philosophy of **craftsmanship over code**. Every contribution should embody:

1. **Think Different** - Question assumptions, find elegant solutions
2. **Obsess Over Details** - Every function name should sing, every edge case handled
3. **Test Everything** - No patch accepted without tests
4. **Document Thoroughly** - Code should be self-explanatory, but document the _why_
5. **Simplify Ruthlessly** - Elegance is achieved when there's nothing left to take away

## Code of Conduct

Be respectful, constructive, and professional. We're all here to build something beautiful.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** - Describe the issue concisely
- **Steps to reproduce** - Minimal code example
- **Expected behavior** - What should happen
- **Actual behavior** - What actually happens
- **Environment** - Browser, Node.js version, OS
- **Additional context** - Screenshots, error messages

**Bug Report Template:**

```markdown
## Description

Brief description of the bug

## Steps to Reproduce

1.
2.
3.

## Expected Behavior

## Actual Behavior

## Environment

- Browser: [e.g., Chrome 120, Safari 17]
- Node.js: [e.g., v20.10.0]
- copy.js version: [e.g., 0.2.0]
- OS: [e.g., macOS 14.0]

## Additional Context
```

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- **Use case** - What problem does this solve?
- **Proposed solution** - How would it work?
- **Alternatives considered** - What other approaches did you consider?
- **Breaking changes** - Would this affect existing code?

### Pull Requests

1. **Fork the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/copy.js.git
   cd copy.js
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-improvement
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Make your changes**
   - Write clean, readable TypeScript
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation

5. **Run the quality checks**

   ```bash
   # Run tests
   npm test

   # Run type checking
   npm run typecheck

   # Run linter
   npm run lint

   # Format code
   npm run format

   # Build
   npm run build
   ```

6. **Commit your changes**

   ```bash
   git add .
   git commit -m "feat: add amazing improvement"
   ```

   **Commit Message Format:**

   ```
   <type>: <description>

   [optional body]

   [optional footer]
   ```

   **Types:**
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation only
   - `style`: Formatting, missing semicolons, etc
   - `refactor`: Code change that neither fixes a bug nor adds a feature
   - `perf`: Performance improvement
   - `test`: Adding missing tests
   - `chore`: Updating build tasks, package manager configs, etc

7. **Push to your fork**

   ```bash
   git push origin feature/amazing-improvement
   ```

8. **Open a Pull Request**
   - Use a clear title
   - Reference related issues
   - Describe your changes in detail
   - Include screenshots for UI changes
   - Ensure all CI checks pass

## Development Setup

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn or pnpm

### Project Structure

```
copy.js/
├── src/
│   └── copy.ts              # Main source code
├── test/
│   └── copy.test.ts         # Test suite
├── dist/                    # Build output (gitignored)
│   ├── esm/                 # ES modules
│   ├── cjs/                 # CommonJS
│   ├── copy.js              # UMD development
│   └── copy.min.js          # UMD production
├── scripts/
│   ├── build-umd.js         # UMD build script
│   └── fix-cjs.js           # CJS compatibility
└── .github/
    └── workflows/           # CI/CD pipelines
```

### Available Scripts

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format

# Build all formats
npm run build

# Build specific format
npm run build:esm
npm run build:cjs
npm run build:umd

# Clean build artifacts
npm run clean
```

## Coding Standards

### TypeScript

- Use strict TypeScript mode
- Provide explicit types for function parameters and return values
- Avoid `any` type (use `unknown` if necessary)
- Use modern ES2017+ features

### Code Style

- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- 80 character line length (flexible for readability)
- Meaningful variable names (no `x`, `y`, `temp`)

**Good:**

```typescript
async function copyTextToClipboard(text: string): Promise<void> {
  const element = document.createElement('textarea');
  element.value = text;
  // ...
}
```

**Bad:**

```typescript
async function f(x: any) {
  const e = document.createElement('textarea');
  e.value = x;
  // ...
}
```

### Testing

- Every feature must have tests
- Test both success and failure cases
- Test edge cases (empty strings, very long text, Unicode, etc.)
- Aim for > 90% coverage
- Use descriptive test names

**Test Structure:**

```typescript
describe('Feature Name', () => {
  it('should handle the happy path', async () => {
    // Arrange
    const input = 'test';

    // Act
    const result = await copy(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('should handle errors gracefully', async () => {
    // ...
  });

  it('should handle edge case: empty string', async () => {
    // ...
  });
});
```

### Documentation

- Add JSDoc comments for public APIs
- Include `@param`, `@returns`, `@throws`, `@example`
- Update README.md for new features
- Update CHANGELOG.md following Keep a Changelog format

## Testing Guidelines

### Unit Tests

- Test individual functions in isolation
- Mock external dependencies (DOM, navigator)
- Fast execution (< 1s total)

### Edge Cases to Consider

- Empty strings
- Very long strings (> 10,000 characters)
- Unicode and emoji
- Multi-line text
- Special characters
- Null/undefined (if applicable)
- Rapid successive calls
- Error conditions

### Browser Compatibility

Test in:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Consider testing in:

- Mobile browsers (iOS Safari, Chrome Mobile)
- Older browser versions

## Performance Considerations

- Minimize DOM manipulations
- Clean up resources (remove created elements)
- Avoid blocking the main thread
- Consider memory usage for large strings
- Profile before optimizing

## Security Considerations

- Never use `eval()` or `Function()` constructor
- Sanitize user input if necessary
- Avoid innerHTML (use textContent)
- Be cautious with regular expressions (ReDoS attacks)
- No credentials or secrets in code

## Documentation Standards

### README Updates

- Keep examples up-to-date
- Update API reference for new features
- Add browser support info if relevant
- Include migration guide for breaking changes

### CHANGELOG Updates

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased]

### Added

- New feature description

### Changed

- Changed feature description

### Fixed

- Bug fix description
```

## Release Process

Maintainers will handle releases:

1. Update CHANGELOG.md
2. Update version in package.json
3. Create git tag `v0.x.x`
4. Push tag to trigger CI/CD
5. CI automatically publishes to npm

## Getting Help

- **Issues**: Check existing issues or create a new one
- **Discussions**: For questions and ideas
- **Documentation**: See README.md

## Recognition

Contributors will be recognized in:

- GitHub contributors page
- Release notes
- CHANGELOG.md (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Thank You!

Your contributions make copy.js better for everyone. Every bug report, feature suggestion, and pull request is valued.

**Remember:** We're not just writing code—we're crafting an elegant, inevitable solution.

Made with obsessive attention to detail. 🚀
