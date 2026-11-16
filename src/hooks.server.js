/**
 * Purpose: Restore saved colours and install initial-module recovery before app loading.
 * Main contents: a synchronous head script generated from shared theme and startup logic.
 * Used by: SvelteKit development and prerendering. Uses: js/theme.js and app.html marker.
 * Libs: SvelteKit's response transform; no client bundle is needed for theme restoration.
 */
import { restoreTheme, themePalettes } from '#domain/theme.js';
import { installStartupRecovery } from '#domain/startup-recovery.js';

// Only authored code and palette labels enter this script; saved values are read in the browser.
const bootstrap = `<script>try { (${restoreTheme.toString()})(document.documentElement, localStorage, ${JSON.stringify(themePalettes)}); } catch {} (${installStartupRecovery.toString()})();</script>`;

export function handle({ event, resolve }) {
  return resolve(event, {
    // Preserve comments so Kit's hydration check does not flag the authored marker.
    transformPageChunk: ({ html }) =>
      html.replace('<!-- theme-bootstrap -->', (marker) => marker + bootstrap),
  });
}
