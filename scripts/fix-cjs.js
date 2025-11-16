/**
 * Fix CommonJS exports for better compatibility
 * Ensures both `require('copy-js')` and `require('copy-js').default` work
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cjsPath = join(__dirname, '../dist/cjs/copy.js');

try {
  let content = readFileSync(cjsPath, 'utf-8');

  // Add proper CommonJS exports at the end
  const cjsExports = `
// CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = copy;
  module.exports.default = copy;
  module.exports.isSupported = isSupported;
}
`;

  // Only add if not already present
  if (!content.includes('module.exports = copy')) {
    content += cjsExports;
    writeFileSync(cjsPath, content);
    console.log('✓ Fixed CommonJS exports');
  } else {
    console.log('✓ CommonJS exports already correct');
  }
} catch (err) {
  console.error('Error fixing CJS exports:', err);
  process.exit(1);
}
