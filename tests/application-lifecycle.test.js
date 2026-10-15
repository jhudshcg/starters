/** Shared services must release browser resources before a replacement session starts. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { createApplication } from '../src/lib/application/session.js';
import { selectProfile } from '../js/profiles.js';
import { choose } from '../js/bank.js';

test('session disposal clears polling, listeners and prompts; remount retains saved answers', async (t) => {
  const records = new Map(),
    intervals = new Map(),
    timeouts = new Map(),
    events = [];
  let next = 0;
  t.mock.method(globalThis, 'setInterval', (fn) => {
    intervals.set(++next, fn);
    return next;
  });
  t.mock.method(globalThis, 'clearInterval', (id) => intervals.delete(id));
  t.mock.method(globalThis, 'setTimeout', (fn) => {
    timeouts.set(++next, fn);
    return next;
  });
  t.mock.method(globalThis, 'clearTimeout', (id) => timeouts.delete(id));
  const previous = Object.fromEntries(
    ['window', 'document', 'localStorage'].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  );
  function target() {
    const value = new EventTarget(),
      add = value.addEventListener.bind(value);
    value.addEventListener = (type, callback, options) => {
      events.push({ type, signal: options.signal });
      add(type, callback, options);
    };
    return value;
  }
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => records.get(key) ?? null,
      setItem: (key, value) => records.set(key, value),
    },
  });
  globalThis.window = target();
  globalThis.document = Object.assign(target(), { hidden: false });
  const selected = selectProfile('Lifecycle Test');
  const set = choose(2, 'records');
  let route = '#home',
    app,
    publications = 0;
  const navigation = {
    remember() {},
    state: () => ({}),
    go: async (hash) => {
      route = hash;
      await app.openRoute(hash);
    },
  };
  try {
    for (let cycle = 0; cycle < 3; cycle++) {
      app = createApplication({ navigation, focus() {}, scriptURL: 'https://example.test/app.js' });
      app.subscribe(() => publications++);
      await Promise.all([app.start(), app.start()]);
      assert.equal(intervals.size, 2);
      assert.equal(events.filter((event) => !event.signal.aborted).length, 13);
      if (!cycle) {
        await app.practice.start(set);
        app.practice.answer(set.questions[0].slot, set.questions[0].parts[0].id, 'saved answer');
      } else {
        await app.openRoute(route);
        assert.equal(app.profile.data.profileId, selected.profileId);
        assert.equal(
          app.profile.data.active.answers[set.questions[0].slot][set.questions[0].parts[0].id],
          'saved answer',
        );
      }
      const prompt = app.practice.askLeave();
      await app.dispose();
      assert.equal(await prompt, false, 'Disposal cancels the pending leave prompt');
      const count = publications;
      window.dispatchEvent(new Event('pagehide'));
      document.dispatchEvent(new Event('visibilitychange'));
      assert.equal(publications, count, 'Disposed listeners cannot publish');
      assert.equal(intervals.size, 0);
      assert.equal(timeouts.size, 0);
      assert.ok(events.every((event) => event.signal.aborted));
      await app.dispose();
    }
  } finally {
    await app?.dispose();
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
});
