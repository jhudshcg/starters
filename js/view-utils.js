/**
 * Purpose: Share text escaping and displayed durations.
 *
 * Main contents: esc and duration
 *
 * Used by: page and question views.
 * Uses: no application state.
 * Libs: none.
 */

export const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
export function duration(seconds) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
