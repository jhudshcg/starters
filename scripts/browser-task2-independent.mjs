/** Focused real-runtime check for independent valid inputs, ordered invalid input and saved review.
 * Used by browser-editor-workflow in its isolated profile; reuses its navigation/editor helpers.
 */
import assert from 'node:assert/strict';
import esp from '../data/esp-task2.js';
import { enterTestInputs } from './browser-task2-inputs.mjs';

export async function independentInputs({ b, open, replace, wait, base }) {
  await open(3, 36, 5);
  const q = structuredClone(esp[0].variations[5]);
  q.parts.find((p) => p.id === 'valid-own-inputs').answer = JSON.stringify({
    c0: { inputs: ['2', '1'] },
  });
  await enterTestInputs(b, 36, q);
  const ids = await b.evaluate(
    `[...document.querySelectorAll('[data-test-response="c0-own-expected"] [data-test-case]')].map(e=>e.dataset.testCase)`,
  );
  assert.equal(ids.length, 2);
  assert.equal(ids[0], 'c0');
  assert.match(ids[1], /^c0-input-/);
  const scope = (part, id) => `[data-test-response="${part}"] [data-test-case="${id}"]`;
  const expected = (id) => scope('c0-own-expected', id);
  const actual = (id) => scope('c0-own-actual', id);
  async function outcome(selector, type, value, consumed) {
    await b.change(`${selector} select`, type);
    await b.change(`${selector} input[id$="-value"]`, value, 'input');
    await b.change(`${selector} input[id$="-consumed"]`, String(consumed), 'input');
  }
  async function run(selector, doc, result) {
    const buttons = selector.split(' [data-test-case')[0] + ' button';
    await b.evaluate(
      `[...document.querySelectorAll(${JSON.stringify(buttons)})].find(b=>b.textContent.trim()===${JSON.stringify('Run ' + doc)}).click()`,
    );
    await wait(
      `!document.querySelector(${JSON.stringify(buttons)}).disabled && document.querySelector(${JSON.stringify(selector)}).innerText.includes(${JSON.stringify(result)})`,
    );
  }
  await outcome(expected(ids[0]), 'str', 'In-store', 1);
  assert.equal(
    await b.evaluate(
      `document.querySelector('[data-test-response="c0-own-actual"] button').disabled`,
    ),
    true,
  );
  await outcome(expected(ids[1]), 'str', 'Online', 1);
  await run(actual(ids[1]), 'Original code', 'Returned "Online"');
  assert.match(
    await b.evaluate(`document.querySelector(${JSON.stringify(actual(ids[0]))}).innerText`),
    /EOFError/,
  );
  await outcome(actual(ids[0]), 'error', 'EOFError', 1);
  await outcome(actual(ids[1]), 'str', 'Online', 1);
  await outcome(scope('c1-own-expected', 'c1'), 'str', 'Online', 2);
  await run(scope('c1-own-actual', 'c1'), 'Original code', 'Inputs used: 2');
  await outcome(scope('c1-own-actual', 'c1'), 'str', 'Online', 2);
  await b.click('#tab-36-original');
  const runAll = `[...document.querySelectorAll('.editor-actions button')].find(b=>b.textContent.trim()==='Run & test')`;
  assert.equal(
    await b.evaluate(`${runAll}.title`),
    'Runs the configured test values on the code in the current tab. Ctrl/Cmd + Enter does the same.',
  );
  await b.evaluate(`${runAll}.click()`);
  await wait(
    `document.body.innerText.includes('All 3 tests finished on Original code.') && !${runAll}.disabled`,
  );
  await b.click('#tab-36-edited');

  await replace(
    36,
    'def read_platform():\n    selection = input()\n    if selection == "2":\n        while True:\n            pass\n    return "Online"',
  );
  await run(actual(ids[1]), 'Your code', 'Returned "Online"');
  assert.match(
    await b.evaluate(`document.querySelector(${JSON.stringify(actual(ids[0]))}).innerText`),
    /Execution stopped after 5 seconds/,
  );
  await replace(36, q.parts.find((p) => p.kind === 'python').answer);
  await b.evaluate(`${runAll}.click()`);
  await wait(
    `document.body.innerText.includes('All 3 tests finished on Your code.') && !${runAll}.disabled`,
  );
  assert.match(
    await b.evaluate(`document.querySelector(${JSON.stringify(actual(ids[0]))}).innerText`),
    /Returned "In-store"/,
  );
  await b.click('#tab-36-original');
  await b.evaluate(
    `document.querySelector('#editor-36-original .py-editor-input > div').shadowRoot.querySelector('.cm-content').focus()`,
  );
  assert.ok(
    await b.evaluate(
      `(() => {const root=document.querySelector('.editor-document:not([hidden]) .py-editor-input > div').shadowRoot;return root.activeElement===root.querySelector('.cm-content');})()`,
    ),
    'visible code receives keyboard focus',
  );
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    modifiers: 4,
  });
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    modifiers: 4,
  });
  await wait(
    `document.body.innerText.includes('All 3 tests finished on Original code.') && !${runAll}.disabled`,
  );
  assert.match(
    await b.evaluate(`document.querySelector(${JSON.stringify(actual(ids[0]))}).innerText`),
    /EOFError/,
  );
  await b.click('#tab-36-edited');
  await b.evaluate(
    `document.querySelector('#editor-36-edited .py-editor-input > div').shadowRoot.querySelector('.cm-content').focus()`,
  );
  assert.ok(
    await b.evaluate(
      `(() => {const root=document.querySelector('.editor-document:not([hidden]) .py-editor-input > div').shadowRoot;return root.activeElement===root.querySelector('.cm-content');})()`,
    ),
    'visible code receives keyboard focus',
  );
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    modifiers: 2,
  });
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    modifiers: 2,
  });
  await wait(
    `document.body.innerText.includes('All 3 tests finished on Your code.') && !${runAll}.disabled`,
  );

  for (const p of q.parts.filter((p) => p.control === 'select'))
    await b.change(`[data-part="${p.id}"]`, p.answer);
  await b.evaluate(`document.querySelector('.test-plan').open=true`);
  assert.equal(await b.evaluate(`document.querySelectorAll('.test-plan-row').length`), 2);
  assert.match(await b.evaluate(`document.querySelector('.test-plan-row').innerText`), /Input 2/);

  // Removing the first input must keep the second input's expectation, observation and evidence.
  await b.click('[aria-label="Remove input 1 from Test 1"]');
  assert.equal(
    await b.evaluate(
      `document.querySelector(${JSON.stringify(expected(ids[1]) + ' input[id$="-value"]')}).value`,
    ),
    'Online',
  );
  assert.match(
    await b.evaluate(`document.querySelector(${JSON.stringify(actual(ids[1]))}).innerText`),
    /Returned "Online"/,
  );
  assert.match(
    await b.evaluate(`document.querySelector('.test-plan-row').innerText`),
    /Earlier removed inputs/,
  );
  await b.change('#test-36-valid-own-inputs-c0-0', '2', 'input');
  assert.equal(
    await b.evaluate(
      `document.querySelectorAll(${JSON.stringify(actual(ids[1]) + ' .run-result')}).length`,
    ),
    0,
  );
  await b.change('#test-36-valid-own-inputs-c0-0', '1', 'input');
  await b.reload();
  await wait(`Boolean(document.querySelector(${JSON.stringify(actual(ids[1]) + ' .run-result')}))`);
  assert.equal(
    await b.evaluate(
      `document.querySelector(${JSON.stringify(actual(ids[1]) + ' input[id$="-value"]')}).value`,
    ),
    'Online',
  );
  await b.send('Emulation.setDeviceMetricsOverride', {
    width: 360,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  assert.ok(await b.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'));
  await b.click('#submit');
  await wait('Boolean(document.querySelector("#submit-result"))');
  assert.match(
    await b.evaluate('document.querySelector("#submit-result").textContent'),
    /9\s*\/\s*9/,
  );
  await b.send('Page.navigate', { url: base + '/progress/' });
  await b.until('document.body.innerText.includes("Code attempts and skill progression")');
  await b.click('.attempt-review > summary');
  assert.match(await b.evaluate('document.body.innerText'), /Test 1 · Input 2/);
  assert.match(await b.evaluate('document.body.innerText'), /In-store/);
  assert.equal(b.errors.length, 0, JSON.stringify(b.errors));
  console.log(
    'Header/button and Cmd/Ctrl shortcuts run all configured tests on the current tab; grouped valid runs continue after exceptions/timeouts; ordered invalid sequence, stable removal/edit/reload evidence, 9/9 marking, mobile fit and saved review passed.',
  );
}
