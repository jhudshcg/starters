/** Purpose: Verify the reviewable programming pair in the isolated trial browser.
 * Main contents: policy guards, real execution, submitted read-only source and restoration.
 * Used by: local draft checks. Uses: browser-support and the preview-only test surface.
 * Libs: Node assert/fs and CDP. Resets only drafts in the isolated test browser.
 */
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { browser } from './browser-support.mjs';
const b = await browser();
const base = 'http://127.0.0.1:8767/prototypes/pyscript/pilot.html';
const api = 'window.pythonPilot';
async function ready() {
  await b.until(`${api}?.editors.length === 2 && ${api}.editors.every(Boolean) && !${api}.busy`);
}
async function idle() {
  for (let i = 0; i < 600; i++) {
    if (await b.evaluate(`!${api}.busy`)) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw Error(await b.evaluate('document.querySelector("#status").textContent'));
}
try {
  await b.send('Page.navigate', { url: base });
  await ready();
  await b.evaluate('window.confirm = () => true');
  await b.click('#new-attempt');
  await ready();
  assert.equal(await b.evaluate('document.querySelectorAll(".question-card").length'), 2);
  assert.equal(await b.evaluate('document.querySelectorAll(".check")[1].disabled'), true);
  assert.equal(await b.evaluate('document.querySelectorAll(".check")[1].hidden'), true);
  assert.equal(await b.evaluate('document.querySelector(".expression").value'), '');
  await b.evaluate(`${api}.execute(0,'run')`);
  assert.equal(await b.evaluate(`${api}.state.answers[0].runs`), 0);
  assert.match(
    await b.evaluate('document.querySelector(".notice").textContent'),
    /Enter a function call/,
  );
  await b.change('.expression', 'delivery_cost(25, True)', 'input');
  await b.evaluate(`${api}.execute(1,'check')`);
  assert.equal(await b.evaluate(`${api}.state.answers[1].checks`), 0);
  await b.evaluate(`${api}.editors[1].select(0,0)`);
  for (const type of ['keyDown', 'keyUp'])
    await b.send('Input.dispatchKeyEvent', {
      type,
      key: 'Enter',
      code: 'Enter',
      windowsVirtualKeyCode: 13,
      modifiers: 4,
    });
  assert.equal(await b.evaluate(`${api}.state.answers[1].checks`), 0);
  await b.evaluate(
    `(async()=>{const {makePair}=await import('./pilot-questions.js');const q=makePair(0);${api}.editors[0].replaceRegion('threshold','order_total >= 30');${api}.editors[0].replaceRegion('express','charge += 3');${api}.editors[0].replaceRegion('return','return charge');${api}.editors[1].source=q[1].solution;})()`,
  );
  await b.evaluate(`void ${api}.execute(0,'run')`);
  await idle();
  assert.match(await b.evaluate('document.querySelector(".feedback").textContent'), /Returned 7/);
  await b.evaluate(`void ${api}.execute(0,'check')`);
  await idle();
  assert.equal(await b.evaluate(`${api}.state.results[0]?.earned`), 6);
  assert.equal(await b.evaluate(`${api}.state.results[1]`), null);
  await b.evaluate(`void ${api}.submit()`);
  await idle();
  assert.deepEqual(await b.evaluate(`${api}.state.results.map(r=>r.earned)`), [6, 6]);
  const submitted = await b.evaluate(`${api}.state.answers.map(a=>a.source)`);
  await b.evaluate(`${api}.editors[1].source='changed after submission'`);
  assert.equal(await b.evaluate(`${api}.editors[1].source`), submitted[1]);
  await b.reload();
  await ready();
  assert.deepEqual(await b.evaluate(`${api}.state.answers.map(a=>a.source)`), submitted);
  assert.deepEqual(await b.evaluate(`${api}.state.results.map(r=>r.earned)`), [6, 6]);
  for (const [configuration, disabled] of [
    ['practice', [false, false]],
    ['assessment', [true, true]],
  ]) {
    await b.change('#configuration', configuration);
    await ready();
    await b.evaluate('window.confirm = () => true');
    await b.click('#new-attempt');
    await ready();
    assert.deepEqual(
      await b.evaluate('[...document.querySelectorAll(".check")].map(b=>b.disabled)'),
      disabled,
    );
    await b.evaluate(`${api}.execute(1,'check')`);
    await idle();
    assert.equal(
      await b.evaluate(`${api}.state.answers[1].checks`),
      configuration === 'practice' ? 1 : 0,
    );
  }
  await b.change('#variation', '4');
  await ready();
  assert.match(await b.evaluate('document.querySelector("#questions").textContent'), /3 to 12/);
  // Leave a fresh mixed draft for teacher review.
  await b.send('Page.navigate', { url: `${base}?config=mixed&variation=1` });
  await ready();
  await b.evaluate('window.confirm = () => true');
  await b.click('#new-attempt');
  await ready();
  assert.equal(await b.evaluate(`${api}.state.submitted`), null);
  for (const width of [320, 1280]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await b.evaluate('new Promise(r=>setTimeout(r,500))');
    assert.equal(await b.evaluate('document.documentElement.scrollWidth > innerWidth'), false);
    const shot = await b.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    await writeFile(`/private/tmp/pyscript-pilot-${width}.png`, Buffer.from(shot.data, 'base64'));
  }
  assert.deepEqual(b.errors, []);
  console.log(
    'Draft pair: execution policies, keyboard guard, Python marking, submission lock, reload, variations and layouts pass.',
  );
} finally {
  b.close();
}
