/** Startup recovery must be bounded and leave active practice/profile data alone. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { installStartupRecovery } from '../js/startup-recovery.js';

function fixture(
  storage = new Map(),
  { storageDenied = false, fetchFails = false, domReady = true } = {},
) {
  const events = new EventTarget(),
    doc = new EventTarget(),
    message = {},
    button = new EventTarget();
  const panel = { hidden: true, querySelector: () => message };
  let parsed = domReady;
  doc.getElementById = (id) => (parsed ? (id === 'startup-error' ? panel : button) : null);
  const requests = [],
    reloads = [];
  const browser = {
    document: doc,
    AbortSignal,
    location: {
      href: 'https://example.test/starters/set/?code=example',
      reload: () => reloads.push(true),
    },
    sessionStorage: {
      getItem(key) {
        if (storageDenied) throw Error('denied');
        return storage.get(key);
      },
      setItem(key, value) {
        if (storageDenied) throw Error('denied');
        storage.set(key, value);
      },
      removeItem(key) {
        if (storageDenied) throw Error('denied');
        storage.delete(key);
      },
    },
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
    async fetch(url, options) {
      requests.push({ url, options });
      if (fetchFails) throw Error('offline');
      return {
        ok: true,
        headers: new Headers({ 'content-type': 'text/html' }),
        text: async () => '<html></html>',
      };
    },
  };
  installStartupRecovery(browser);
  const completeDOM = () => {
    parsed = true;
    doc.dispatchEvent(new Event('DOMContentLoaded'));
  };
  if (domReady) completeDOM();
  const fail = async (
    message = 'Failed to fetch dynamically imported module: https://example.test/starters/_app/immutable/entry/app.old.js',
  ) => {
    const event = new Event('unhandledrejection');
    event.reason = new TypeError(message);
    events.dispatchEvent(event);
    await new Promise((resolve) => setImmediate(resolve));
  };
  return { fail, events, button, panel, message, requests, reloads, browser, completeDOM };
}

test('refreshes the same URL once using fresh HTML; persistent failure offers manual reload', async () => {
  const storage = new Map([['unrelated', 'preserve']]);
  const first = fixture(storage);
  await first.fail();
  await first.fail();
  assert.equal(first.requests.length, 1);
  assert.equal(first.requests[0].options.cache, 'reload');
  assert.equal(first.requests[0].url, first.browser.location.href);
  assert.equal(first.reloads.length, 1);
  const second = fixture(storage);
  await second.fail();
  assert.equal(second.requests.length, 0);
  assert.equal(second.reloads.length, 0);
  assert.equal(second.panel.hidden, false);
  assert.match(second.message.textContent, /Check your connection/);
  second.button.dispatchEvent(new Event('click'));
  assert.equal(second.reloads.length, 1);
  assert.deepEqual([...storage], [['unrelated', 'preserve']]);
});

test('offline and unavailable session storage show failure without a reload loop', async () => {
  for (const options of [{ fetchFails: true }, { storageDenied: true }]) {
    const f = fixture(new Map(), options);
    await f.fail();
    await f.fail();
    assert.equal(f.reloads.length, 0);
    assert.equal(f.panel.hidden, false);
    assert.match(f.message.textContent, /Check your connection/);
  }
});

test('ignores unrelated errors and removes recovery when the application mounts', async () => {
  const storage = new Map([['dsd-starters-startup-retry', 'previous']]);
  const f = fixture(storage);
  await f.fail('Cannot read properties of undefined');
  assert.equal(f.requests.length, 0);
  assert.equal(f.panel.hidden, true);
  f.events.dispatchEvent(new Event('starters:mounted'));
  await f.fail();
  assert.equal(f.requests.length, 0);
  assert.equal(f.panel.hidden, true);
  assert.equal(storage.size, 0);
});

test('mounting while a refresh is pending prevents navigation away from the app', async () => {
  const f = fixture();
  let finish;
  f.browser.fetch = () =>
    new Promise((resolve) => {
      finish = resolve;
    });
  await f.fail();
  f.events.dispatchEvent(new Event('starters:mounted'));
  finish({ ok: true, headers: new Headers({ 'content-type': 'text/html' }), text: async () => '' });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(f.reloads.length, 0);
  assert.equal(f.panel.hidden, true);
});

test('an early failure is displayed once the fallback markup has been parsed', async () => {
  const f = fixture(new Map(), { fetchFails: true, domReady: false });
  await f.fail();
  assert.equal(f.panel.hidden, true);
  f.completeDOM();
  assert.equal(f.panel.hidden, false);
  assert.match(f.message.textContent, /Check your connection/);
});
