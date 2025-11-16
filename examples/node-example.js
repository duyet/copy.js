/**
 * Node.js Example - Using copy.js in a Node.js environment
 *
 * Note: copy.js is designed for browsers. In Node.js, you would
 * typically use clipboard packages like 'clipboardy' or 'copy-paste'.
 *
 * However, if you're testing or using JSDOM, here's how you'd use it:
 */

// CommonJS
const copy = require('copy-js');

// ESM
// import copy from 'copy-js';

async function example() {
  try {
    // This would work in a browser-like environment (e.g., with JSDOM)
    await copy('Hello from Node.js!');
    console.log('✓ Copied successfully!');
  } catch (error) {
    console.error('✗ Copy failed:', error.message);
    console.log('Note: copy.js requires a browser environment');
  }
}

// For actual Node.js clipboard operations, use:
//
// Option 1: clipboardy
// const clipboardy = require('clipboardy');
// clipboardy.writeSync('Hello!');
//
// Option 2: copy-paste
// const ncp = require('copy-paste');
// ncp.copy('Hello!');

if (require.main === module) {
  example();
}

module.exports = example;
