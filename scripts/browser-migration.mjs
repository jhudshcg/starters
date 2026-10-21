/**
 * Purpose: Verify migrated routes and practice against production in isolated Chrome.
 * Main contents: old links, profile, navigation, answers and theme checks.
 * Used by: migration verification. Uses: browser-support.mjs on port 9227.
 * Libs: Node assertions. Clears only the dedicated test profile's site storage.
 */
import assert from 'node:assert/strict';
import { browser } from './browser-support.mjs';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const b = await browser();
try {
  await b.send('Page.navigate', { url: base + '/' });
  await b.until('Boolean(document.querySelector("#main"))');
  await b.evaluate('localStorage.clear()');
  await b.reload();
  await b.until('Boolean(document.querySelector("#profile-name"))');
  await b.change('#profile-name', 'Migration Test', 'input');
  await b.evaluate('document.querySelector("[role=dialog] form").requestSubmit()');
  await b.until('Boolean(document.querySelector("#code-form"))');
  if (process.argv.includes('--entry-only')) {
    for (const type of [0, 2, 1, 3]) {
      await b.click('.brand');
      await b.until('Boolean(document.querySelector("[data-start]"))');
      await b.click(`[data-start="${type === 3 ? 1 : type}"]`);
      if (type === 1 || type === 3) {
        await b.until('Boolean(document.querySelector("[data-exam-start]"))');
        await b.click(`[data-exam-start="${type}"]`);
      }
      await b.until('Boolean(document.querySelector("#display-code"))');
      assert.ok(await b.evaluate('document.querySelectorAll(".question").length > 0'));
      if (type === 2) {
        await b.change('#focus', 'records');
        await b.until('document.querySelector("#focus")?.value === "records"');
      }
      const code = await b.evaluate('document.querySelector("#display-code").textContent');
      await b.evaluate('window.previousCodeNode = document.querySelector("#display-code")');
      await b.click('.breadcrumbs [data-practice-picker]');
      await b.until(
        'Boolean(document.querySelector("#display-code")) && document.querySelector("#display-code") !== window.previousCodeNode',
      );
      assert.equal(await b.evaluate('document.querySelector("#display-code").textContent'), code);
    }
    await b.click('.brand');
    await b.until('Boolean(document.querySelector("[data-start]"))');
    await b.evaluate(
      'window.realNow = Date.now; Date.now = () => window.realNow() + 30 * 86400000',
    );
    await b.click('[data-start="2"]');
    await b.until('document.querySelector("#focus")?.value === "records"');
    await b.evaluate('Date.now = window.realNow');
    await b.reload();
    await b.until('document.querySelector("#focus")?.value === "records"');
    assert.ok(await b.evaluate('document.querySelectorAll(".question").length > 0'));
    assert.equal(b.errors.length, 0, JSON.stringify(b.errors));
    console.log(
      'All four practice areas open question sets; breadcrumbs, 30-day profile recall and reload pass.',
    );
    b.close();
    process.exit(0);
  }
  for (const width of [360, 390, 440, 441, 768, 1024, 1280]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const layout = await b.evaluate(
      `(()=>{const rect=s=>document.querySelector(s).getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,icons:['#theme-picker','#theme-toggle','#nav-toggle'].map(s=>({top:rect(s).top,left:rect(s).left,right:rect(s).right})),brand:Math.max(rect('.brand-icon').right,rect('.brand-copy').right),subtitle:rect('.brand-sub').height,cards:[...document.querySelectorAll('.type-card')].map(n=>({top:n.getBoundingClientRect().top,left:n.getBoundingClientRect().left})),notes:[...document.querySelectorAll('.lower-panel .note-panel')].map(n=>n.getBoundingClientRect().top)};})()`,
    );
    assert.equal(layout.overflow, false, `No page overflow at ${width}`);
    assert.ok(
      layout.brand <= layout.icons[0].left,
      `Brand and controls do not overlap at ${width}`,
    );
    assert.ok(
      Math.max(...layout.icons.map((r) => r.top)) - Math.min(...layout.icons.map((r) => r.top)) < 2,
      'Three controls share one row',
    );
    assert.ok(layout.subtitle < 24, 'Subtitle stays on one line');
    assert.ok(
      Math.abs(layout.cards[0].top - layout.cards[1].top) < 2,
      'Home has two cards per row',
    );
    assert.ok(Math.abs(layout.notes[0] - layout.notes[1]) < 2, 'Lower panels share a row');
  }
  await b.send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await b.click('#theme-picker');
  await b.until('document.querySelector("#theme-menu")?.dataset.state === "open"');
  assert.equal(await b.evaluate('document.querySelectorAll("[data-theme-choice]").length'), 8);
  for (const mode of ['light', 'dark'])
    for (const palette of ['sage', 'blue', 'rose', 'apricot']) {
      await b.click(`[data-theme-choice="${mode}:${palette}"]`);
      assert.equal(await b.evaluate('document.documentElement.dataset.theme'), mode);
      assert.equal(await b.evaluate('document.documentElement.dataset.palette'), palette);
    }
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await b.until('!document.querySelector("#theme-menu")');
  await b.click('#nav-toggle');
  await b.until('Boolean(document.querySelector("#nav-menu"))');
  await b.click('#nav-home');
  await b.until('!document.querySelector("#nav-menu")');
  await b.click('[data-start="2"]');
  await b.until('Boolean(document.querySelector("#display-code"))');
  assert.ok(await b.evaluate('document.querySelectorAll(".question").length > 0'));
  await b.change('#focus', 'records');
  await b.until('Boolean(document.querySelector("#display-code"))');
  assert.equal(await b.evaluate('document.querySelector("h1").textContent'), 'Dictionaries');
  const code = await b.evaluate('document.querySelector("#display-code").textContent');
  await b.change('input[data-part]', 'unchanged answer', 'input');
  await b.click('.brand');
  await b.until('Boolean(document.querySelector("[role=dialog] button[value=stay]"))');
  await b.click('[role=dialog] button[value=stay]');
  await b.until('!document.querySelector("[role=dialog]")');
  assert.equal(
    await b.evaluate('document.querySelector("input[data-part]").value'),
    'unchanged answer',
  );
  await b.evaluate('history.back()');
  await b.until('Boolean(document.querySelector("[role=dialog] button[value=stay]"))');
  await b.click('[role=dialog] button[value=stay]');
  await b.until('!document.querySelector("[role=dialog]")');
  assert.equal(await b.evaluate('document.querySelector("#display-code").textContent'), code);
  await b.click('.brand');
  await b.until('Boolean(document.querySelector("[role=dialog] button[value=leave]"))');
  await b.click('[role=dialog] button[value=leave]');
  await b.until('Boolean(document.querySelector("#code-form"))');
  await b.click('[data-start="2"]');
  await b.until('Boolean(document.querySelector("#display-code"))');
  assert.equal(
    await b.evaluate('document.querySelector("#display-code").textContent'),
    code,
    'Recall retains the attempt',
  );
  assert.equal(
    await b.evaluate('document.querySelector("input[data-part]").value'),
    'unchanged answer',
  );
  await b.evaluate('document.querySelector("[data-python-guide]").open=true');
  await b.click('#submit');
  await b.until('document.querySelector("#submit")?.disabled');
  assert.equal(
    await b.evaluate(
      'JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Migration%20Test")).history.at(-1).assisted',
    ),
    false,
    'General guide preserves independent progress',
  );
  await b.reload();
  await b.until('document.querySelector("#submit")?.disabled');
  assert.equal(
    await b.evaluate(
      'JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Migration%20Test")).history.length',
    ),
    1,
    'Reload does not duplicate results',
  );
  await b.send('Page.navigate', {
    url: base + '/#set=' + encodeURIComponent(code),
  });
  await b.until('Boolean(document.querySelector("#display-code"))');
  assert.equal(
    await b.evaluate('document.querySelector("#display-code").textContent'),
    code,
    'Old shared links resolve unchanged',
  );
  await b.click('.brand');
  await b.until('Boolean(document.querySelector("#code-form"))');
  await b.click('[data-start="0"]');
  await b.until('Boolean(document.querySelector(".puzzle-cards"))');
  assert.ok(await b.evaluate('document.querySelectorAll(".question").length > 0'));
  await b.click('[data-puzzle-focus="sudoku"]');
  await b.until('Boolean(document.querySelector("#display-code"))');
  assert.equal(await b.evaluate('document.querySelector(".puzzle-picker").open'), false);
  assert.ok(
    await b.evaluate('document.querySelector(".breadcrumbs").textContent.includes("Home")'),
  );
  await b.click('.brand');
  await b.until('Boolean(document.querySelector("#code-form"))');
  await b.click('a[href$="/progress/"]');
  await b.until('Boolean(document.querySelector("#weekly-progress"))');
  assert.ok(await b.evaluate('Boolean(document.querySelector("[data-file-status]"))'));
  await b.send('Page.navigate', { url: base + '/go/' });
  await b.until('Boolean(document.querySelector("#go-practice-board"))');
  await b.click('[data-action="pass"]');
  await b.click('[data-action="pass"]');
  await b.until('Boolean(document.querySelector("#go-estimate"))');
  await b.evaluate('document.querySelector("#go-estimate").click()');
  await b.until(
    'document.querySelector("#go-estimate-result")?.textContent.includes("Area count")',
  );
  console.log(
    'Layouts, eight themes, profile, entry/recall, guarded navigation, submission/reload, old links, puzzles, progress and Go passed.',
  );
  assert.deepEqual(b.errors, []);
  console.log('Migration browser checks passed.');
} finally {
  b.close();
}
