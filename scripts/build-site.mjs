/**
 * Purpose: Validate and pack content before compiling the static SvelteKit site.
 * Main contents: ordered preparation and production build.
 * Used by: npm build, production tests and staged-source commit hook.
 * Uses: prepare-site.mjs, vite.config.js. Libs: Vite.
 */
import './prepare-site.mjs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// The CLI runs Kit's server/client environment builder, not only Vite's client build API.
execFileSync(
  process.execPath,
  [fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url)), 'build'],
  { stdio: 'inherit' },
);

// Remove whitespace-only bootstrap lines; leave rendered text and inline code intact.
const { readdir, readFile, writeFile } = await import('node:fs/promises');
for (const path of await readdir('live', { recursive: true })) {
  if (!path.endsWith('.html')) continue;
  const file = `live/${path}`;
  const html = await readFile(file, 'utf8');
  await writeFile(file, html.replace(/^[\t ]+$/gm, ''));
}
