/**
 * Purpose: Persist the existing eight theme choices and per-theme adjustments.
 * Main contents: observable preferences and root token application.
 * Used by: ThemeControls. Uses: css/tokens.css. Libs: none.
 */
export { themePalettes } from '#domain/theme.js';
import { restoreTheme, themePalettes } from '#domain/theme.js';
export function createTheme({ root, storage, notify }) {
  let { dark, palette, tweaks } = restoreTheme(root, storage, themePalettes);
  const listeners = new Set();
  let view;
  function apply(save = false) {
    const mode = dark ? 'dark' : 'light';
    root.dataset.theme = mode;
    root.dataset.palette = palette;
    const preset = getComputedStyle(root);
    const values = tweaks[`${mode}:${palette}`] ?? {
      saturation: Math.round(Number(preset.getPropertyValue('--theme-saturation-default')) * 100),
      lightness: Math.round(Number(preset.getPropertyValue('--theme-bg-default')) * 100),
    };
    root.style.setProperty('--theme-saturation', values.saturation / 100);
    root.style.setProperty('--theme-bg-lightness', values.lightness / 100);
    view = { mode, dark, palette, ...values };
    if (save)
      try {
        storage.setItem('dsd-starters-theme', mode);
        storage.setItem('dsd-starters-palette', palette);
        storage.setItem('dsd-starters-theme-adjustments', JSON.stringify(tweaks));
      } catch {
        notify('Theme changed, but this browser could not save the preference.');
      }
    for (const listener of listeners) listener(view);
  }
  apply();
  return {
    subscribe(listener) {
      listeners.add(listener);
      listener(view);
      return () => listeners.delete(listener);
    },
    choose(mode, id) {
      dark = mode === 'dark';
      palette = id;
      apply(true);
    },
    toggle() {
      dark = !dark;
      apply(true);
    },
    adjust(saturation, lightness) {
      tweaks[`${view.mode}:${palette}`] = { saturation, lightness };
      apply(true);
    },
    reset() {
      delete tweaks[`${view.mode}:${palette}`];
      apply(true);
    },
  };
}
