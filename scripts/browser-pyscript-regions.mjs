/** Purpose: Exercise the trial's three region modes in the isolated Chrome profile.
 * Main contents: real editing, inline controls, history, persistence and mode boundaries.
 * Used by: local verification. Uses: browser-support.mjs and the trial test surface.
 * Libs: Node assert and CDP.
 */
import assert from 'node:assert/strict';
import { browser } from './browser-support.mjs';
const b = await browser();
const url = process.env.PYSCRIPT_TRIAL_URL ?? 'http://127.0.0.1:8767/prototypes/pyscript/';
const api = 'window.pythonTrial.editor';
const shadow = "document.querySelector('.py-editor-input > div').shadowRoot";
const snapshot = () => b.evaluate(`${api}.snapshot()`);
const source = () => b.evaluate(`${api}.source`);
async function reset(mode = 'choices') {
  await b.click('#reset');
  await b.until('Boolean(window.pythonTrial?.editor)');
  await b.change('#mode', mode);
}
async function select(id) {
  await b.evaluate(`${api}.selectRegion(${JSON.stringify(id)})`);
}
async function replace(id, text) {
  await b.evaluate(`(() => {
    const input = ${shadow}.querySelector('select[data-region="${id}"]');
    input.focus(); input.value = ${JSON.stringify(text)}; input.dispatchEvent(new Event('change', {bubbles:true}));
  })()`);
}
async function type(text) {
  await b.send('Input.insertText', { text });
}
async function key(key, code, windowsVirtualKeyCode, modifiers = 0) {
  for (const type of ['keyDown', 'keyUp'])
    await b.send('Input.dispatchKeyEvent', { type, key, code, windowsVirtualKeyCode, modifiers });
}
try {
  await b.send('Page.navigate', { url });
  await b.until('Boolean(window.pythonTrial?.editor)');
  await reset();
  await b.evaluate(`${api}.select(0,0)`);
  await key('Escape', 'Escape', 27);
  await key('Tab', 'Tab', 9);
  assert.ok(
    await b.evaluate(`${shadow}.activeElement?.classList.contains('region-choice')`),
    'keyboard reaches inline choices',
  );
  await key('Escape', 'Escape', 27);
  assert.ok(
    await b.evaluate(`${shadow}.activeElement?.classList.contains('cm-content')`),
    'Escape returns to code',
  );
  const original = await source();
  assert.equal((await snapshot()).mode, 'choices');
  await select('condition');
  await type('INVALID');
  assert.equal(await source(), original, 'typing cannot modify choice mode');
  await replace('condition', '1 <= value <= 8');
  assert.equal(await b.evaluate(`${api}.selection().text`), '1 <= value <= 8');
  await replace('exception', 'except ValueError:');
  await replace('condition', '1 < value < 8');
  await replace('condition', '1 <= value <= 8');
  assert.equal((await snapshot()).regions.length, 2);
  await b.evaluate(`${api}.undo()`);
  assert.ok((await source()).includes('1 < value < 8'));
  await b.evaluate(`${api}.redo()`);
  assert.ok((await source()).includes('1 <= value <= 8'));
  // Actual pointer input selects the other outlined fragment without clearing a highlight.
  const point = await b.evaluate(`(() => {
    const node = ${shadow}.querySelector('span[data-region="exception"]');
    node.scrollIntoView({block:'center'}); const r = node.getBoundingClientRect(); return {x:r.x+4,y:r.y+r.height/2};
  })()`);
  await b.send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    button: 'left',
    clickCount: 1,
    ...point,
  });
  await b.send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    button: 'left',
    clickCount: 1,
    ...point,
  });
  assert.equal(await b.evaluate(`${api}.selection().text`), 'except ValueError:');
  await b.reload();
  await b.until('Boolean(window.pythonTrial?.editor)');
  await replace('condition', '1 <= value < 8');
  assert.ok((await source()).includes('except ValueError:'));
  console.log(
    'Choice restrictions, repeat substitution, pointer selection, undo/redo and reload pass.',
  );

  await reset('regions');
  const fixed = await source();
  await b.evaluate(`${api}.select(0,0)`);
  await type('# prohibited\n');
  assert.equal(await source(), fixed);
  await b.evaluate(
    `(() => { const r=${api}.snapshot().regions.find(r => r.id === 'condition'); ${api}.select(r.from-1,r.to); })()`,
  );
  await type('cross-boundary paste');
  assert.equal(await source(), fixed);
  await select('condition');
  await key('Backspace', 'Backspace', 8);
  assert.equal(
    (await snapshot()).regions.find((r) => r.id === 'condition').from,
    (await snapshot()).regions.find((r) => r.id === 'condition').to,
  );
  assert.ok(await b.evaluate(`Boolean(${shadow}.querySelector('.region-empty'))`));
  await type('True');
  assert.equal(
    await b.evaluate(
      `${api}.source.slice(${api}.snapshot().regions.find(r => r.id === 'condition').from,${api}.snapshot().regions.find(r => r.id === 'condition').to)`,
    ),
    'True',
  );
  await b.evaluate(`${api}.undo()`);
  await b.evaluate(`${api}.undo()`);
  assert.equal(await source(), fixed);
  assert.equal((await snapshot()).manual, false);
  // Both insertion edges are editable; backspace/delete into fixed code are blocked.
  await b.evaluate(
    `(() => { const r=${api}.snapshot().regions.find(r => r.id === 'condition'); ${api}.select(r.from,r.from); })()`,
  );
  await key('Backspace', 'Backspace', 8);
  assert.equal(await source(), fixed);
  await type('(');
  await b.evaluate(
    `(() => { const r=${api}.snapshot().regions.find(r => r.id === 'condition'); ${api}.select(r.to,r.to); })()`,
  );
  const edge = await source();
  await key('Delete', 'Delete', 46);
  assert.equal(await source(), edge);
  await type(')');
  await b.change('#mode', 'choices');
  assert.equal((await snapshot()).mode, 'regions');
  assert.match(
    await b.evaluate('document.querySelector("#editor-notice").textContent'),
    /Reset code/,
  );
  console.log(
    'Restricted edits, spanning paste, empty regions, boundary deletion and switch guard pass.',
  );

  await reset('free');
  await b.evaluate(`${api}.select(0,0)`);
  await type('# comment\n');
  assert.equal((await snapshot()).regions.length, 2);
  await select('condition');
  await type('True');
  assert.deepEqual(
    (await snapshot()).regions.map((r) => r.id),
    ['exception'],
  );
  await b.evaluate(`${api}.undo()`);
  assert.equal((await snapshot()).regions.length, 2);
  await b.evaluate(`${api}.redo()`);
  assert.equal((await snapshot()).regions.length, 1);
  await b.reload();
  await b.until('Boolean(window.pythonTrial?.editor)');
  assert.equal((await snapshot()).mode, 'free');
  assert.equal((await snapshot()).regions.length, 1);
  await b.change('#mode', 'choices');
  assert.equal((await snapshot()).mode, 'free');
  await reset('choices');
  assert.equal(await source(), original);
  await reset('free');
  const condition = (await snapshot()).regions.find((r) => r.id === 'condition');
  await select('condition');
  await type('True');
  await b.change('#mode', 'choices');
  assert.equal((await snapshot()).mode, 'free');
  await b.evaluate(`${api}.select(${condition.from},${condition.from + 4})`);
  await type('1 <= value < 8');
  assert.equal(await source(), original);
  assert.equal((await snapshot()).manual, false);
  assert.equal((await snapshot()).regions.length, 2);
  assert.equal(await b.evaluate('document.querySelector("#editor-notice").textContent'), '');
  await b.change('#mode', 'choices');
  assert.equal((await snapshot()).mode, 'choices');
  await b.reload();
  await b.until('Boolean(window.pythonTrial?.editor)');
  assert.equal((await snapshot()).mode, 'choices');
  assert.equal((await snapshot()).regions.length, 2);
  console.log('Manual change-back restores modes, regions and reload state without reset.');
  assert.deepEqual(b.errors, []);
  console.log('Free-edit movement/invalidation, history, persistence and explicit reset pass.');
  console.log('All region interaction checks passed.');
} finally {
  b.close();
}
