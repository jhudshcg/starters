/**
 * Purpose: Share palette labels and restore saved theme settings before paint and on mount.
 * Main contents: palette names and validated preference restoration.
 * Used by: server head bootstrap and theme controller. Uses: root theme tokens.
 * Libs: none; restoration is self-contained so the server can inline the same function.
 */
export const themePalettes = [
  { id: 'sage', light: 'Sage', dark: 'Forest' },
  { id: 'blue', light: 'Blue sky', dark: 'Midnight blue' },
  { id: 'rose', light: 'Rose', dark: 'Berry' },
  { id: 'apricot', light: 'Apricot', dark: 'Ember' },
];

/** Restore validated preferences onto root; explicit palettes keep the inline function independent. */
export function restoreTheme(root, storage, palettes) {
  let dark = false,
    palette = 'sage',
    tweaks = {};
  try {
    dark = storage.getItem('dsd-starters-theme') === 'dark';
    const saved = storage.getItem('dsd-starters-palette');
    if (palettes.some((p) => p.id === saved)) palette = saved;
    const values = JSON.parse(storage.getItem('dsd-starters-theme-adjustments'));
    for (const p of palettes)
      for (const mode of ['light', 'dark']) {
        const key = `${mode}:${p.id}`,
          value = values?.[key];
        if (Number.isFinite(value?.saturation) && Number.isFinite(value?.lightness))
          tweaks[key] = {
            saturation: Math.max(0, Math.min(100, value.saturation)),
            lightness: Math.max(
              mode === 'light' ? 55 : 5,
              Math.min(mode === 'light' ? 96 : 45, value.lightness),
            ),
          };
      }
  } catch {}
  const mode = dark ? 'dark' : 'light';
  root.dataset.theme = mode;
  root.dataset.palette = palette;
  const active = tweaks[`${mode}:${palette}`];
  if (active) {
    root.style.setProperty('--theme-saturation', active.saturation / 100);
    root.style.setProperty('--theme-bg-lightness', active.lightness / 100);
  } else {
    root.style.removeProperty('--theme-saturation');
    root.style.removeProperty('--theme-bg-lightness');
  }
  return { dark, palette, tweaks };
}
