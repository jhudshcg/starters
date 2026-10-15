/**
 * Focused checks for puzzle input and exclusive profile editing in the dedicated test Chrome.
 * Clears that browser's test tabs/storage. Select --puzzles or --profiles; default runs both.
 * Run after a build only when puzzle controls or profile/session persistence changes.
 */
import assert from 'node:assert/strict';
import { resolve, choose } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';

const endpoint = process.env.STARTERS_DEBUG_URL ?? 'http://127.0.0.1:9227';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const selection = process.argv.slice(2);
assert.ok(selection.every((value) => ['--puzzles', '--profiles'].includes(value)));
const profileKey = 'dsd-starters-v1:profile:Interaction%20test';
const stored = `JSON.parse(localStorage.getItem(${JSON.stringify(profileKey)}))`;
const errors = [],
  clients = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function newTab() {
  const page = await (await fetch(endpoint + '/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });
  let id = 0;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const next = ++id;
      const timeout = setTimeout(() => {
        pending.delete(next);
        reject(Error(`CDP timeout: ${method}`));
      }, 15000);
      pending.set(next, { resolve, reject, timeout });
      ws.send(JSON.stringify({ id: next, method, params }));
    });
  }
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const request = pending.get(message.id);
      if (!request) return;
      pending.delete(message.id);
      clearTimeout(request.timeout);
      if (message.error) request.reject(Error(message.error.message));
      else request.resolve(message.result);
    } else if (message.method === 'Page.javascriptDialogOpening') {
      void send('Page.handleJavaScriptDialog', { accept: true });
    } else if (message.method === 'Runtime.exceptionThrown')
      errors.push(message.params.exceptionDetails);
  };
  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }
  async function until(expression) {
    for (let i = 0; i < 100; i++) {
      if (await evaluate(expression)) return;
      await delay(50);
    }
    throw Error(
      `Timed out: ${expression}\n${await evaluate('document.querySelector("[role=dialog]")?.textContent ?? document.body.innerText.slice(-1200)')}`,
    );
  }
  const click = (selector) =>
    evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  async function reload() {
    const origin = await evaluate('performance.timeOrigin');
    await send('Page.reload');
    await until(`performance.timeOrigin!==${origin}`);
  }
  async function close() {
    await fetch(endpoint + '/json/close/' + page.id);
    ws.close();
  }
  const client = { send, evaluate, until, click, reload, close };
  clients.push(client);
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 1000,
    deviceScaleFactor: 1,
    mobile: false,
  });
  return client;
}

async function fresh(tab, code) {
  await tab.send('Page.navigate', { url: 'about:blank' });
  const script = await tab.send('Page.addScriptToEvaluateOnNewDocument', {
    source: 'localStorage.clear()',
  });
  await tab.send('Page.navigate', { url: base + '/set/?code=' + code });
  await tab.until('Boolean(document.querySelector("#profile-name"))');
  await tab.evaluate(
    'document.querySelector("#profile-name").value="Interaction test";document.querySelector("[role=dialog] form").requestSubmit()',
  );
  await tab.until(`document.querySelector('#display-code')?.textContent===${JSON.stringify(code)}`);
  await tab.send('Page.removeScriptToEvaluateOnNewDocument', { identifier: script.identifier });
  await tab.until('getComputedStyle(document.body).pointerEvents!=="none"');
}

async function puzzles(tab) {
  const set = resolve({
    version: BANK_VERSION,
    type: 0,
    entries: [{ slot: 1099, variation: 0 }],
    minutes: null,
  });
  await fresh(tab, set.code);
  await tab.evaluate(
    'document.querySelector("[data-path-board]").scrollIntoView({block:"center"})',
  );
  await delay(250);
  const point = (cell) =>
    tab.evaluate(
      `(()=>{const r=document.querySelector('[data-challenge-action="path"][data-value="${cell}"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`,
    );
  const path = () => tab.evaluate(`JSON.parse(${stored}.active.answers[1099]?.[0]??'{}').path`);
  const mouse = async (type, cell, pressed = true) =>
    tab.send('Input.dispatchMouseEvent', {
      type,
      ...(await point(cell)),
      button: 'left',
      buttons: pressed ? 1 : 0,
      clickCount: 1,
    });
  await mouse('mousePressed', 9);
  await mouse('mouseMoved', 6);
  // One event crosses the middle dot: interpolation must read every newly accepted move.
  await mouse('mouseMoved', 8);
  assert.deepEqual(await path(), [9, 6, 7, 8]);
  await mouse('mouseMoved', 6);
  assert.deepEqual(await path(), [9, 6]);
  await mouse('mouseReleased', 6, false);
  await mouse('mouseMoved', 9, false);
  assert.deepEqual(await path(), [9, 6]);
  await mouse('mousePressed', 6);
  await mouse('mouseMoved', 7);
  await mouse('mouseReleased', 7, false);
  assert.deepEqual(await path(), [9, 6, 7]);
  await tab.evaluate(
    'document.querySelector("[data-challenge-action=path][data-value=\\"8\\"]").focus()',
  );
  for (const type of ['keyDown', 'keyUp'])
    await tab.send('Input.dispatchKeyEvent', {
      type,
      key: ' ',
      code: 'Space',
      windowsVirtualKeyCode: 32,
    });
  assert.deepEqual(await path(), [9, 6, 7, 8]);
  assert.equal(
    await tab.evaluate('document.activeElement.dataset.value'),
    '8',
    'Space must retain the endpoint for the next keyboard move',
  );
  await tab.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'ArrowUp',
    code: 'ArrowUp',
    windowsVirtualKeyCode: 38,
  });
  assert.equal(await tab.evaluate('document.activeElement.dataset.value'), '5');
  await tab.click('[data-challenge-action="undo"]');
  assert.deepEqual(await path(), [9, 6, 7]);
  await tab.reload();
  await tab.until('Boolean(document.querySelector("[data-path-board]"))');
  assert.deepEqual(await path(), [9, 6, 7]);

  const textSet = resolve({
    version: BANK_VERSION,
    type: 0,
    entries: [{ slot: 1174, variation: 0 }],
    minutes: null,
  });
  await fresh(tab, textSet.code);
  await tab.evaluate(
    'window.testInput=document.querySelector("input[data-part]");testInput.focus()',
  );
  for (const text of ['1', '2', '3']) await tab.send('Input.insertText', { text });
  assert.equal(
    await tab.evaluate(
      'testInput===document.activeElement && testInput.isConnected && testInput.value',
    ),
    '123',
  );
  await tab.evaluate('testInput.setSelectionRange(1,2)');
  await tab.send('Input.insertText', { text: '9' });
  assert.equal(await tab.evaluate('testInput.value'), '193');
  await tab.reload();
  await tab.until('Boolean(document.querySelector("input[data-part]"))');
  assert.equal(await tab.evaluate('document.querySelector("input[data-part]").value'), '193');
  await tab.click('#submit');
  await tab.until('Boolean(document.querySelector("#submit-result"))');
  assert.equal(await tab.evaluate('document.querySelector("input[data-part]").disabled'), true);
  console.log(
    'Puzzle regressions: continuous/fast drag, backtracking, release/resume, keyboard, Undo, typing/caret, reload and submission pass.',
  );
}

async function profiles(tab) {
  const set = choose(2, 'records');
  await fresh(tab, set.code);
  const second = await newTab();
  await second.send('Page.navigate', { url: base + '/set/?code=' + set.code });
  await second.until('Boolean(document.querySelector("#profile-blocked"))');
  assert.equal(await second.evaluate('Boolean(document.querySelector("#submit"))'), false);
  await tab.click('[data-hint]');
  await tab.click('#submit');
  await tab.until('Boolean(document.querySelector("#submit-result"))');
  const record = await tab.evaluate(`${stored}.history[0]`);
  assert.equal(record.assisted, true);
  await second.reload();
  await second.until('Boolean(document.querySelector("#profile-blocked"))');
  assert.deepEqual(await second.evaluate(`${stored}.history`), [record]);
  // Switching profiles releases the first profile while keeping the other tab usable.
  await tab.click('#switch-profile');
  await tab.until('Boolean(document.querySelector("#profile-name"))');
  await tab.evaluate(
    'document.querySelector("#profile-name").value="Other student";document.querySelector("[role=dialog] form").requestSubmit()',
  );
  await tab.until(
    'document.querySelector("#profile-welcome")?.textContent.includes("Other student")',
  );
  await second.click('#profile-blocked button');
  await second.until('Boolean(document.querySelector("#submit"))');
  assert.deepEqual(await second.evaluate(`${stored}.history`), [record]);
  await second.click('#submit');
  assert.deepEqual(
    await second.evaluate(`${stored}.history`),
    [record],
    'Reviewing the completed attempt must not duplicate it',
  );
  // The current tab cannot switch into a profile owned by the second tab.
  await tab.click('#switch-profile');
  await tab.until('Boolean(document.querySelector("#profile-name"))');
  await tab.evaluate(
    'document.querySelector("#profile-name").value="Interaction test";document.querySelector("[role=dialog] form").requestSubmit()',
  );
  await tab.until(
    'document.querySelector("#profile-message")?.textContent.includes("already open")',
  );
  await tab.click('#profile-cancel');
  await second.close();
  await tab.until(
    '(async()=>!(await navigator.locks.query()).held.some(lock=>lock.name==="tlevel-profile:named:interaction test"))()',
  );
  await tab.click('#switch-profile');
  await tab.until('Boolean(document.querySelector("#profile-name"))');
  await tab.evaluate(
    'document.querySelector("#profile-name").value="Interaction test";document.querySelector("[role=dialog] form").requestSubmit()',
  );
  await tab.until(
    'document.querySelector("#profile-welcome")?.textContent.includes("Interaction test")',
  );
  assert.deepEqual(await tab.evaluate(`${stored}.history`), [record]);
  console.log(
    'Profile regressions: second-tab blocking, assisted history, reload/retry, independent profiles, blocked switch and release on close pass.',
  );
}

try {
  const pages = await (await fetch(endpoint + '/json/list')).json();
  for (const page of pages.filter((page) => page.type === 'page'))
    await fetch(endpoint + '/json/close/' + page.id);
  const tab = await newTab();
  if (!selection.length || selection.includes('--puzzles')) await puzzles(tab);
  if (!selection.length || selection.includes('--profiles')) await profiles(tab);
  assert.deepEqual(errors, []);
} finally {
  for (const client of clients) await client.close().catch(() => {});
}
