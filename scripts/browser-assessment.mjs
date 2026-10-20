/** Verify migrated assessment controls, review and absolute deadlines in isolated Chrome. */
import assert from 'node:assert/strict';
import { browser } from './browser-support.mjs';
import { resolve } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const b = await browser();
const profile = 'JSON.parse(localStorage.getItem("dsd-starters-v1:profile:Assessment%20Test"))';
const open = async (entries, minutes = null) => {
  const set = resolve({ version: BANK_VERSION, type: 3, entries, minutes });
  await b.send('Page.navigate', { url: base + '/set/?code=' + set.code });
  await b.until(`document.querySelector('#display-code')?.textContent === '${set.code}'`);
  return set;
};
try {
  await b.send('Page.navigate', { url: base + '/' });
  await b.until('Boolean(document.querySelector("#main"))');
  await b.evaluate('localStorage.clear()');
  await b.reload();
  await b.until('Boolean(document.querySelector("#profile-name"))');
  await b.change('#profile-name', 'Assessment Test', 'input');
  await b.evaluate('document.querySelector("[role=dialog] form").requestSubmit()');
  await b.until('Boolean(document.querySelector("#code-form"))');
  await b.click('#theme-picker');
  await b.until('Boolean(document.querySelector("#theme-menu"))');
  await b.click('[data-theme-choice="light:rose"]');
  await b.click('#theme-picker');
  const set = await open([
    { slot: 30, variation: 0 },
    { slot: 31, variation: 0 },
    { slot: 32, variation: 0 },
  ]);
  for (const q of set.questions)
    for (const p of q.parts) {
      const selector = `[data-slot="${q.slot}"][data-part="${p.id}"]`;
      if (p.options) await b.click(selector + `[value=${JSON.stringify(p.answer)}]`);
      else await b.change(selector, p.answer, 'input');
    }
  for (const width of [360, 767, 768, 1024]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    const layout = await b.evaluate(
      `(()=>{const e=document.querySelector('.question'),s=getComputedStyle(e),r=e.getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,viewport:document.documentElement.clientWidth,left:r.left,right:r.right,border:s.borderLeftWidth,image:s.backgroundImage}})()`,
    );
    assert.equal(layout.overflow, false, `Question page fits ${width}`);
    if (width < 768) {
      assert.equal(layout.left, 0);
      assert.equal(layout.right, layout.viewport);
      assert.equal(layout.border, '0px');
      assert.match(layout.image, /90deg/);
    } else assert.ok(layout.left > 0);
    const toolbar = await b.evaluate(`(() => {
      const summary = document.querySelector('.set-summary'),
        timer = document.querySelector('.timer-controls'),
        panel = document.querySelector('.set-toolbar');
      return {
        summaryHeight: summary.getBoundingClientRect().height,
        lineHeight: parseFloat(getComputedStyle(summary).lineHeight),
        blankSpace: timer.getBoundingClientRect().top - Math.max(
          summary.getBoundingClientRect().bottom,
          document.querySelector('.code-block').getBoundingClientRect().bottom
        ),
        gap: parseFloat(getComputedStyle(panel).rowGap),
        selectWidth: document.querySelector('#minutes').getBoundingClientRect().width
      };
    })()`);
    assert.ok(
      toolbar.summaryHeight <= 2 * toolbar.lineHeight + 1,
      'Summary occupies its text lines',
    );
    assert.ok(toolbar.blankSpace <= toolbar.gap + 1, 'No stretched space before the timer');
    assert.ok(toolbar.selectWidth < 150, 'Timer selector sizes to its short options');
  }
  await b.click('#submit');
  await b.until('Boolean(document.querySelector("#submit-result"))');
  assert.equal(await b.evaluate('document.querySelector(".result-score").textContent'), '100%');
  if (process.argv.includes('--layout-only')) {
    console.log(
      'Toolbar spacing, compact timer selector, mobile question edges and submission pass.',
    );
    b.close();
    process.exit(0);
  }
  await b.reload();
  await b.until('Boolean(document.querySelector("#submit-result"))');
  assert.equal(await b.evaluate(`${profile}.history.length`), 1);
  await b.click('[data-reveal]');
  await b.until('Boolean(document.querySelector(".solution"))');
  // A written response stays separate from automatic marks and retains its review status.
  await open([{ slot: 9, variation: 0 }]);
  await b.change('textarea', 'Specific evidence < & reasoning.', 'input');
  await b.click('#submit');
  await b.until('Boolean(document.querySelector("[data-review-status]"))');
  await b.change('[data-review-status]', 'Self-reviewed');
  await b.reload();
  await b.until('document.querySelector("[data-review-status]")?.value === "Self-reviewed"');
  assert.equal(
    await b.evaluate('document.querySelector("textarea").value'),
    'Specific evidence < & reasoning.',
  );
  // Advance the clock only after leaving a timed set: reload must expire it exactly once.
  await open([{ slot: 30, variation: 1 }], 5);
  await b.change('input[data-part]:not([type=radio])', '=C3*D3', 'input');
  const saved = await b.evaluate(`${profile}.active`);
  await b.click('.brand');
  await b.until('Boolean(document.querySelector("[role=dialog] button[value=leave]"))');
  await b.click('[role=dialog] button[value=leave]');
  await b.until('Boolean(document.querySelector("#code-form"))');
  const clock = await b.send('Page.addScriptToEvaluateOnNewDocument', {
    source: `Date.now=()=>${saved.deadline + 1000};`,
  });
  try {
    await b.reload();
    await b.until('Boolean(document.querySelector("#code-form"))');
    await b.until(
      `${profile}.history.some(r=>r.id===${JSON.stringify(saved.id)} && r.outcome==='expired')`,
    );
    await b.reload();
    await b.until('Boolean(document.querySelector("#code-form"))');
    assert.equal(
      await b.evaluate(`${profile}.history.filter(r=>r.id===${JSON.stringify(saved.id)}).length`),
      1,
    );
    assert.equal(await b.evaluate(`${profile}.active.answers[30][1]`), '=C3*D3');
  } finally {
    await b.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: clock.identifier });
  }
  assert.deepEqual(b.errors, []);
  console.log(
    'ESP formula marks, written review/reload, question edges and timer expiry/single recording passed.',
  );
} finally {
  b.close();
}
