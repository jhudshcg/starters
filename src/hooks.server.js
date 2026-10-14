/**
 * Purpose: Restore saved colours before the static page's first paint.
 * Main contents: a synchronous head script generated from shared preference logic.
 * Used by: SvelteKit development and prerendering. Uses: js/theme.js and app.html marker.
 * Libs: SvelteKit's response transform; no client bundle is needed for theme restoration.
 */
import { restoreTheme, themePalettes } from '#domain/theme.js';

// Only authored code and palette labels enter this script; saved values are read in the browser.
const bootstrap = `<script>try { (${restoreTheme.toString()})(document.documentElement, localStorage, ${JSON.stringify(themePalettes)}); } catch {}</script>`;

export function handle({ event, resolve }) {
  return resolve(event, {
    transformPageChunk: ({ html }) => html.replace('<!-- theme-bootstrap -->', bootstrap),
  });
}
