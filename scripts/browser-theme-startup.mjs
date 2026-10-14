/**
 * Purpose: Check saved themes before application JavaScript can run.
 * Main contents: blocked-bundle reloads, preference fallbacks and hydration continuity.
 * Used by: theme/startup verification against production. Uses: browser-support.mjs.
 * Libs: Node assertions. Clears only the dedicated test browser's site storage.
 */
import assert from 'node:assert/strict';
import { browser } from './browser-support.mjs';
import { themePalettes } from '../js/theme.js';

const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const b = await browser();
let probe, deniedStorage;
const observation = `(() => {
  const root = document.documentElement, style = getComputedStyle(root);
  return {
    mode: root.dataset.theme ?? 'light', palette: root.dataset.palette ?? 'sage',
    saturation: Number(style.getPropertyValue('--theme-saturation')),
    lightness: Number(style.getPropertyValue('--theme-bg-lightness')),
    background: getComputedStyle(document.body).backgroundColor,
    image: getComputedStyle(document.body).backgroundImage
  };
})()`;
try {
  await b.send('Network.enable');
  await b.send('Network.setCacheDisabled', { cacheDisabled: true });
  await b.send('Page.navigate', { url: base + '/' });
  await b.until('Boolean(document.querySelector("#main"))');
  await b.evaluate('localStorage.clear()');
  probe = await b.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `addEventListener('DOMContentLoaded', () => { window.__themeAtContent = ${observation}; }, {once:true});`,
  });
  await b.send('Network.setBlockedURLs', { urls: ['*.js', '*.js?*'] });
  for (const { id: palette } of themePalettes) {
    for (const mode of ['light', 'dark']) {
      const values = { saturation: 77, lightness: mode === 'light' ? 63 : 21 };
      await b.evaluate(`localStorage.setItem('dsd-starters-theme', ${JSON.stringify(mode)});
        localStorage.setItem('dsd-starters-palette', ${JSON.stringify(palette)});
        localStorage.setItem('dsd-starters-theme-adjustments', ${JSON.stringify(JSON.stringify({ [`${mode}:${palette}`]: values }))});`);
      await b.reload();
      await b.until('Boolean(window.__themeAtContent)');
      const early = await b.evaluate('window.__themeAtContent');
      assert.equal(early.mode, mode);
      assert.equal(early.palette, palette);
      assert.equal(early.saturation, values.saturation / 100);
      assert.equal(early.lightness, values.lightness / 100);
      assert.equal(
        await b.evaluate('document.querySelector("#theme-picker").disabled'),
        true,
        'Theme is restored while the app is still unmounted',
      );
      await b.send('Network.setBlockedURLs', { urls: [] });
      await b.reload();
      await b.until('document.querySelector("#theme-picker")?.disabled === false');
      assert.deepEqual(await b.evaluate(observation), early, 'Mount preserves the initial colours');
      await b.send('Network.setBlockedURLs', { urls: ['*.js', '*.js?*'] });
    }
  }
  await b.evaluate(`localStorage.setItem('dsd-starters-theme','dark');
    localStorage.setItem('dsd-starters-palette','unknown');
    localStorage.setItem('dsd-starters-theme-adjustments','{broken');`);
  await b.reload();
  await b.until('Boolean(window.__themeAtContent)');
  assert.equal(await b.evaluate('__themeAtContent.mode'), 'dark');
  assert.equal(await b.evaluate('__themeAtContent.palette'), 'sage');
  deniedStorage = await b.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `Object.defineProperty(window, 'localStorage', {get() {throw new DOMException('Unavailable','SecurityError');}});`,
  });
  await b.reload();
  await b.until('Boolean(window.__themeAtContent)');
  assert.equal(await b.evaluate('__themeAtContent.mode'), 'light');
  assert.equal(await b.evaluate('__themeAtContent.palette'), 'sage');
  // Blocking Kit's entry modules intentionally rejects its inline dynamic import.
  assert.deepEqual(
    b.errors.filter(
      (error) =>
        !error.exception?.description?.startsWith(
          `TypeError: Failed to fetch dynamically imported module: ${base}/_app/immutable/`,
        ),
    ),
    [],
  );
  console.log(
    'All eight themes and saved adjustments apply without app scripts; mounting preserves colours. Invalid preferences and unavailable storage fall back safely.',
  );
} finally {
  await b.send('Network.setBlockedURLs', { urls: [] });
  await b.send('Network.setCacheDisabled', { cacheDisabled: false });
  for (const injection of [probe, deniedStorage])
    if (injection) await b.send('Page.removeScriptToEvaluateOnNewDocument', injection);
  // Leave a healthy document so later CDP sessions do not replay intentional blocked-load errors.
  await b.send('Page.navigate', { url: base + '/' });
  await b.until('document.querySelector("#theme-picker")?.disabled === false');
  b.close();
}
