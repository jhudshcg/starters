/** Exercise the local PyScript trial in the dedicated browser, including real worker execution.
 * Uses browser-support and the trial's explicit test surface. No production storage is cleared.
 */
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { browser } from './browser-support.mjs';
const b = await browser();
const base = process.env.PYSCRIPT_TRIAL_URL ?? 'http://127.0.0.1:8767/prototypes/pyscript/';
async function until(expression, seconds = 100) {
  const end = Date.now() + seconds * 1000;
  while (Date.now() < end) {
    if (await b.evaluate(expression)) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw Error(
    `Timed out: ${expression}; ${await b.evaluate('document.querySelector("#status")?.textContent')}`,
  );
}
async function run(check = false) {
  await b.evaluate(`void window.pythonTrial.run(${check})`);
  await until('!window.pythonTrial.busy');
  return b.evaluate(
    '({results:window.pythonTrial.results,status:document.querySelector("#status").textContent})',
  );
}

async function reset(mode = 'choices') {
  await b.click('#reset');
  await until('Boolean(window.pythonTrial?.editor)');
  await b.change('#mode', mode);
}
async function replace(id, text) {
  await b.evaluate(`(() => {
    const input = document.querySelector('.py-editor-input > div').shadowRoot.querySelector('select[data-region="${id}"]');
    input.focus(); input.value = ${JSON.stringify(text)}; input.dispatchEvent(new Event('change', {bubbles:true}));
  })()`);
}

async function checkLayouts() {
  for (const width of [320, 1280]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await b.evaluate('document.querySelector("#editor").scrollIntoView({block:"center"})');
    // CodeMirror measures visible wrapped lines asynchronously after viewport changes.
    await until(
      `(async () => {
      const { codemirror } = await import('./vendor/core.js');
      const { EditorView } = await codemirror.view;
      const root = document.querySelector('.py-editor-input > div').shadowRoot;
      const view = EditorView.findFromDOM(root.querySelector('.cm-editor'));
      const numbers = [...root.querySelectorAll('.cm-lineNumbers .cm-gutterElement')]
        .filter(e => Number(e.textContent) > 0 && Number(e.textContent) <= view.state.doc.lines && e.getAttribute('aria-hidden') !== 'true');
      return numbers.length > 0 && numbers.every(e => {
        const code = view.coordsAtPos(view.state.doc.line(Number(e.textContent)).from);
        return code && Math.abs(e.getBoundingClientRect().top - code.top) < 3;
      });
    })()`,
      5,
    );
    assert.equal(await b.evaluate('document.documentElement.scrollWidth > innerWidth'), false);
    const shot = await b.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    await writeFile(`/private/tmp/pyscript-trial-${width}.png`, Buffer.from(shot.data, 'base64'));
  }
  console.log('Narrow/desktop layout and line-number alignment pass.');
}

try {
  await b.send('Page.navigate', { url: base });
  await until('Boolean(window.pythonTrial?.editor)', 30);
  console.log(
    'editor ready',
    await b.evaluate('({crossOriginIsolated,code:window.pythonTrial.editor.source.length})'),
  );
  if (process.argv.includes('--layout')) {
    await b.change('#question', 'data');
    await until('window.pythonTrial.editor?.source.includes("import pandas")');
    await checkLayouts();
  } else if (process.argv.includes('--probe')) {
    console.log(JSON.stringify(await run(false)));
    console.log('errors', b.errors);
  } else {
    // Use real editor transactions and question-owned controls.
    await reset();
    await b.change('#inputs', '8', 'input');
    const original = await run(true);
    assert.ok(original.results?.some((r) => r.error));
    assert.match(original.status, /5\/8 tests passed/);
    await replace('condition', '1 <= value <= 8');
    assert.equal(await b.evaluate('window.pythonTrial.results'), null);
    await replace('exception', 'except ValueError:');
    await b.change('#expression', '999', 'input');
    const repaired = await run(true);
    assert.match(repaired.status, /8\/8 tests passed/);
    await b.change('#expression', 'read_workshop()', 'input');
    console.log(
      'Task 2 substitutions, highlights, typed results, fixed test calls and input recovery pass.',
    );
    await b.reload();
    await until('Boolean(window.pythonTrial?.editor)', 30);
    assert.ok(await b.evaluate('window.pythonTrial.editor.source.includes("except ValueError:")'));
    await b.change('#mode', 'free');
    await b.evaluate('window.pythonTrial.editor.source="while True:\\n    pass"');
    await b.evaluate('void window.pythonTrial.run(false)');
    await until('document.querySelector("#status").textContent === "Running…"');
    await b.click('#stop');
    assert.equal(await b.evaluate('window.pythonTrial.busy'), false);
    await reset();
    const recovery = await run(false);
    assert.ok(recovery.results);
    console.log('Stop and subsequent execution pass.');
    await b.change('#mode', 'free');
    await b.evaluate('window.pythonTrial.editor.source="while True:\\n    pass"');
    const timeout = await run(false);
    assert.match(timeout.status, /Stopped after 5 seconds/);
    await b.change('#question', 'random');
    await until('window.pythonTrial.editor?.source.includes("import random")');
    await reset();
    const randomFault = await run(true);
    assert.ok(randomFault.results.some((r) => r.value === 7));
    await replace('roll', 'random.randint(1, 6)');
    assert.match((await run(true)).status, /20\/20 tests passed/);
    await b.change('#mode', 'free');
    await b.evaluate('window.pythonTrial.editor.select(0,0)');
    await b.send('Input.insertText', { text: '# Keyboard edit\n' });
    assert.ok(await b.evaluate('window.pythonTrial.editor.source.startsWith("# Keyboard edit")'));
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Enter',
      code: 'Enter',
      modifiers: 2,
      windowsVirtualKeyCode: 13,
    });
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Enter',
      code: 'Enter',
      modifiers: 2,
      windowsVirtualKeyCode: 13,
    });
    await until('window.pythonTrial.results?.length === 1');
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
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'Tab',
      code: 'Tab',
      windowsVirtualKeyCode: 9,
    });
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'Tab',
      code: 'Tab',
      windowsVirtualKeyCode: 9,
    });
    assert.equal(await b.evaluate('document.activeElement.id'), 'run');
    console.log('random, bounds, timeout recovery, keyboard editing/Run and focus escape pass.');
    await b.change('#question', 'data');
    await until('window.pythonTrial.editor?.source.includes("import pandas")');
    await reset();
    const data = await run(true);
    assert.match(data.status, /1\/1 tests passed/);
    assert.equal(data.results[0].plots.length, 1);
    assert.ok(await b.evaluate('document.querySelector(".result img").naturalWidth > 0'));
    console.log('pandas calculation and matplotlib chart pass.');
    await checkLayouts();
    assert.deepEqual(b.errors, []);
    console.log('All PyScript trial checks passed. ' + base);
  }
} finally {
  b.close();
}
