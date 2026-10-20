/** Code loading failures must retain diagnostics instead of becoming keyword searches. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApplication } from '../src/lib/application/session.js';
import { encode, BANK_VERSION } from '../js/codes.js';

test('mixed-case ESP codes retain load/version errors while ordinary terms still search', async (t) => {
  const previous = Object.fromEntries(
    ['location', 'window'].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]),
  );
  Object.defineProperty(globalThis, 'window', { configurable: true, value: {} });
  Object.defineProperty(globalThis, 'location', {
    configurable: true,
    value: new URL('https://example.test/starters/'),
  });
  const routes = [];
  const app = createApplication({
    navigation: { go: async (route) => routes.push(route) },
    focus() {},
    scriptURL: 'https://example.test/starters/app.js',
  });
  let view;
  const unsubscribe = app.subscribe((value) => {
    view = value;
  });
  try {
    // Exercise the real loader and catch path, with a failure after a valid load.
    t.mock.method(app.practice, 'start', async () => {
      throw Error('Cannot start this set.');
    });
    const code = encode({ type: 3, entries: [36, 37, 38].map((slot) => ({ slot, variation: 0 })) });
    assert.match(code, /^[a-zA-Z]+$/);
    assert.equal(await app.openCode(code), false);
    assert.equal(view.error.message, 'Cannot start this set.');
    assert.equal(view.error.diagnostics.enteredCode, code);
    assert.deepEqual(routes, []);
    const future = encode({
      version: BANK_VERSION + 1,
      type: 3,
      entries: [36, 37, 38].map((slot) => ({ slot, variation: 0 })),
    });
    assert.equal(await app.openCode(future), false);
    assert.match(view.error.message, /Unsupported question-bank version/);
    assert.deepEqual(routes, []);
    for (const term of ['iteration', 'Selection', 'data types']) {
      await app.openCode(term);
      assert.equal(view.error, null);
      assert.match(routes.at(-1), /^#search=all&q=/);
    }
  } finally {
    unsubscribe();
    await app.dispose();
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
