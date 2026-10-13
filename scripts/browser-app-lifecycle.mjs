/**
 * Purpose: Verify application ownership across disposal and remount in isolated Chrome.
 *
 * Main contents: listener/timer cleanup, theme controls, saved answers and history.
 *
 * Used by: local verification. Uses: production on 8765 and isolated debugging on 9227.
 * Libs: Node APIs. Clears storage only in the dedicated test browser.
 */
import assert from 'node:assert/strict';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const pages = await (await fetch('http://127.0.0.1:9227/json/list')).json();
const ws = new WebSocket(pages.find((page) => page.type === 'page').webSocketDebuggerUrl);
await new Promise((resolve) => (ws.onopen = resolve));
let id = 0;
const pending = new Map(),
  errors = [];
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
  if (message.id) {
    const task = pending.get(message.id);
    pending.delete(message.id);
    message.error ? task.reject(Error(message.error.message)) : task.resolve(message.result);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
    includeCommandLineAPI: true,
  });
  if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
};
const until = async (expression) => {
  for (let n = 0; n < 100; n++) {
    if (await evaluate(expression)) return;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw Error(`Timed out: ${expression}`);
};
let instrumentation;
try {
  await send('Runtime.enable');
  await send('Page.enable');
  instrumentation = (
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
  window.__appIntervals=new Set();
  const originalSet=window.setInterval,originalClear=window.clearInterval;
  window.setInterval=(...args)=>{const id=originalSet(...args);__appIntervals.add(id);return id;};
  window.clearInterval=id=>{__appIntervals.delete(id);return originalClear(id);};
 `,
    })
  ).identifier;
  await send('Page.navigate', { url: base });
  await until('Boolean(document.querySelector("#main"))');
  await evaluate('localStorage.clear()');
  await send('Page.reload');
  await until('Boolean(document.querySelector("#profile-name"))');
  await evaluate(
    'document.querySelector("#profile-name").value="Lifecycle Test";document.querySelector("dialog form").requestSubmit()',
  );
  await until('Boolean(document.querySelector("#code-form"))');
  await evaluate(
    `(async()=>{window.__appURL=document.querySelector('script[type="module"]').src;window.__appModule=await import(__appURL);window.__disposeApp=__appModule.disposeApplication;})()`,
  );
  const counts = () =>
    evaluate(
      `({intervals:__appIntervals.size,popstate:(getEventListeners(window).popstate??[]).length,visibility:(getEventListeners(document).visibilitychange??[]).length,tiles:document.querySelectorAll('[data-theme-choice]').length,submit:(getEventListeners(document.querySelector('#global-code-form')).submit??[]).length})`,
    );
  const mounted = { intervals: 2, popstate: 1, visibility: 1, tiles: 8, submit: 1 };
  assert.deepEqual(await counts(), mounted);
  await evaluate(`document.querySelector('[data-start="2"]').click()`);
  await until('Boolean(document.querySelector("#focus"))');
  await evaluate(
    `const focus=document.querySelector('#focus');focus.value='selection';focus.dispatchEvent(new Event('change'));`,
  );
  await until('Boolean(document.querySelector("#display-code"))');
  const answer = await evaluate(
    `(()=>{const input=document.querySelector('input[data-part]:not([type="radio"])');input.value='saved across remount';input.dispatchEvent(new Event('input'));return {id:input.id,code:document.querySelector('#display-code').textContent};})()`,
  );
  for (let cycle = 0; cycle < 2; cycle++) {
    await evaluate('__disposeApp()');
    assert.deepEqual(await counts(), {
      intervals: 0,
      popstate: 0,
      visibility: 0,
      tiles: 0,
      submit: 0,
    });
    assert.equal(await evaluate('document.querySelector("#main").childElementCount'), 0);
    await evaluate(
      '(async()=>{window.__disposeApp=await __appModule.mountApplication({scriptURL:__appURL})})()',
    );
    assert.deepEqual(await counts(), mounted);
    assert.equal(
      await evaluate(`document.getElementById(${JSON.stringify(answer.id)}).value`),
      'saved across remount',
    );
    assert.equal(
      await evaluate('document.querySelector("#display-code").textContent'),
      answer.code,
    );
  }
  // One history listener must produce one leave decision, and Cancel must keep the page visible.
  await evaluate('history.back()');
  await until('Boolean(document.querySelector("dialog[open]"))');
  assert.equal(await evaluate('document.querySelectorAll("dialog[open]").length'), 1);
  await evaluate('document.querySelector("button[value=stay]").click()');
  await until(
    `location.hash===${JSON.stringify('#set=' + answer.code)}&&!document.querySelector('dialog[open]')`,
  );
  assert.equal(
    await evaluate(`document.getElementById(${JSON.stringify(answer.id)}).value`),
    'saved across remount',
  );
  const theme = await evaluate('document.documentElement.dataset.theme');
  await evaluate('document.querySelector("#theme-toggle").click()');
  assert.notEqual(await evaluate('document.documentElement.dataset.theme'), theme);
  assert.deepEqual(errors, []);
  console.log(
    'Application lifecycle passed: repeated disposal/remount, zero leaked polling/listeners, eight theme controls, saved answers, guarded Back and theme switching.',
  );
} finally {
  if (instrumentation)
    await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: instrumentation });
  ws.close();
}
