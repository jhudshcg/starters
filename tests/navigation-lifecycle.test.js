/**
 * Purpose: Protect navigation ownership when the application is replaced.
 *
 * Main contents: removed history listeners and abandoned asynchronous leave decisions.
 *
 * Used by: npm test. Uses: navigation.js and a minimal browser-history fixture.
 * Libs: Node test/assert APIs.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createNavigation } from '../js/navigation.js';

function browser(t) {
  const prior = {
    window: globalThis.window,
    history: globalThis.history,
    location: globalThis.location,
  };
  const writes = [];
  globalThis.window = new EventTarget();
  globalThis.location = { hash: '#home' };
  globalThis.history = {
    state: null,
    replaceState(state, _title, hash) {
      this.state = state;
      if (hash) location.hash = hash;
      writes.push(['replace', hash]);
    },
    pushState(state, _title, hash) {
      this.state = state;
      location.hash = hash;
      writes.push(['push', hash]);
    },
    go(offset) {
      writes.push(['go', offset]);
    },
  };
  t.after(() => {
    for (const [key, value] of Object.entries(prior)) {
      if (value === undefined) delete globalThis[key];
      else globalThis[key] = value;
    }
  });
  return writes;
}

test('disposing during a leave decision prevents a late navigation or render', async (t) => {
  const writes = browser(t);
  let decide,
    renders = 0;
  const navigation = createNavigation({
    beforeLeave: () =>
      new Promise((resolve) => {
        decide = resolve;
      }),
    capture: () => ({}),
    restore: () => {},
    render: () => {
      renders++;
    },
  });
  const pending = navigation.go('#progress');
  navigation.dispose();
  decide(true);
  assert.equal(await pending, false);
  assert.equal(location.hash, '#home');
  assert.equal(renders, 0);
  assert.deepEqual(writes, [['replace', '#home']]);
});

test('remount leaves one history listener and cleanup is idempotent', async (t) => {
  browser(t);
  let oldGuards = 0,
    newGuards = 0,
    restores = 0,
    renders = 0;
  const old = createNavigation({
    beforeLeave: () => {
      oldGuards++;
      return true;
    },
    capture: () => ({}),
    restore: () => {},
    render: () => {},
  });
  old.dispose();
  old.dispose();
  const current = createNavigation({
    beforeLeave: () => {
      newGuards++;
      return true;
    },
    capture: () => ({}),
    restore: () => {
      restores++;
    },
    render: () => {
      renders++;
    },
  });
  history.state = { pageIndex: 1 };
  location.hash = '#progress';
  const event = new Event('popstate');
  event.state = history.state;
  window.dispatchEvent(event);
  await Promise.resolve();
  assert.equal(oldGuards, 0);
  assert.equal(newGuards, 1);
  assert.equal(restores, 1);
  assert.equal(renders, 1);
  current.dispose();
  window.dispatchEvent(event);
  await Promise.resolve();
  assert.equal(newGuards, 1);
});
