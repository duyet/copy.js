/**
 * Build UMD bundle for browser usage
 * Creates both development and minified production builds
 */

import { build } from 'esbuild';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(
  readFileSync(join(__dirname, '../package.json'), 'utf-8')
);

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License
 */`;

async function buildUMD() {
  // Development build
  await build({
    entryPoints: ['src/copy.ts'],
    bundle: true,
    format: 'iife',
    globalName: 'copy',
    outfile: 'dist/copy.js',
    banner: { js: banner },
    platform: 'browser',
    target: ['es2017'],
    sourcemap: true,
  });

  console.log('✓ Built UMD development bundle');

  // Production build (minified)
  await build({
    entryPoints: ['src/copy.ts'],
    bundle: true,
    format: 'iife',
    globalName: 'copy',
    outfile: 'dist/copy.min.js',
    banner: { js: banner },
    platform: 'browser',
    target: ['es2017'],
    minify: true,
    sourcemap: true,
  });

  console.log('✓ Built UMD production bundle (minified)');
}

buildUMD().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
