/** Purpose: Check region permissions and history against the actual pinned CodeMirror state engine.
 * Main contents: independent boundary, multi-change, history and identity assertions.
 * Used by: Node test runner. Uses: trial regions.js and vendored module manifest.
 * Libs: Node test/assert/fs; CodeMirror state/view/commands (no DOM needed).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { regionExtension, initialRegions } from '../prototypes/pyscript/regions.js';
const vendor = new URL('../prototypes/pyscript/vendor/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', vendor)));
const modules = Object.fromEntries(
  await Promise.all(
    ['state', 'view', 'commands'].map(async (name) => [
      name,
      await import(
        new URL(
          Object.keys(manifest.files).find((f) => f.startsWith(`codemirror_${name}-`)),
          vendor,
        )
      ),
    ]),
  ),
);
// The release bundle exposes the complete view namespace alongside internal exports.
modules.view = Object.values(modules.view).find((value) => value?.EditorView && value?.WidgetType);
const original = 'pre AAA mid BBB post';
const definitions = [
  { id: 'a', label: 'first', text: 'AAA', choices: ['AAA', 'X', 'LONG'] },
  { id: 'b', label: 'second', text: 'BBB', choices: ['BBB', 'Y'] },
];
function setup(mode, source = original, authored = definitions) {
  const extension = regionExtension(
    modules,
    authored,
    { original: source, regions: initialRegions(source, authored), manual: false, mode, fill: false },
    () => {},
  );
  const editor = {
    state: modules.state.EditorState.create({
      doc: source,
      extensions: [modules.commands.history(), extension.extensions],
    }),
    focus() {},
    dispatch(tr) {
      editor.state = (tr instanceof modules.state.Transaction ? tr : editor.state.update(tr)).state;
    },
  };
  return {
    editor,
    extension,
    snap: () => extension.snapshot(editor),
    source: () => editor.state.doc.toString(),
    edit: (changes) => editor.dispatch({ changes, userEvent: 'input.type' }),
    undo: () => modules.commands.undo(editor),
    redo: () => modules.commands.redo(editor),
  };
}
test('controlled substitutions retain identity, map other regions and round-trip through history', () => {
  const t = setup('choices');
  t.edit({ from: 4, to: 7, insert: 'bad' });
  assert.equal(t.source(), original);
  t.extension.replace(t.editor, 'a', 'LONG');
  t.extension.replace(t.editor, 'b', 'Y');
  assert.equal(t.source(), 'pre LONG mid Y post');
  assert.deepEqual(t.snap().regions, [
    { id: 'a', from: 4, to: 8 },
    { id: 'b', from: 13, to: 14 },
  ]);
  t.undo();
  t.undo();
  assert.equal(t.source(), original);
  assert.equal(t.snap().manual, false);
  t.redo();
  t.redo();
  assert.equal(t.source(), 'pre LONG mid Y post');
  t.extension.replace(t.editor, 'a', 'AAA');
  assert.equal(t.source(), 'pre AAA mid Y post');
});
test('restricted mode rejects the whole mixed transaction and permits an emptied region', () => {
  const t = setup('regions');
  t.edit([
    { from: 4, to: 5, insert: 'X' },
    { from: 8, to: 9, insert: 'Z' },
  ]);
  assert.equal(t.source(), original);
  t.edit({ from: 3, to: 5, insert: 'paste' });
  assert.equal(t.source(), original);
  t.edit({ from: 4, to: 7, insert: '' });
  assert.deepEqual(t.snap().regions[0], { id: 'a', from: 4, to: 4 });
  t.edit({ from: 4, insert: 'Q\nR' });
  assert.equal(t.source(), 'pre Q\nR mid BBB post');
  assert.equal(t.snap().regions[0].to, 7);
  assert.equal(t.extension.setMode(t.editor, 'choices'), false);
  while (t.undo()) {}
  assert.equal(t.source(), original);
  assert.equal(t.snap().manual, false);
  assert.equal(t.extension.setMode(t.editor, 'choices'), true);
});
test('free edits invalidate touched regions, map untouched ones and restore joined edits on undo/redo', () => {
  const t = setup('free');
  t.edit({ from: 0, insert: '!' });
  assert.deepEqual(t.snap().regions, [
    { id: 'a', from: 5, to: 8 },
    { id: 'b', from: 13, to: 16 },
  ]);
  t.edit({ from: 6, insert: 'x' });
  t.edit({ from: 7, insert: 'y' });
  assert.deepEqual(
    t.snap().regions.map((r) => r.id),
    ['b'],
  );
  t.undo();
  assert.equal(t.source(), '!' + original);
  assert.equal(t.snap().regions.length, 2);
  t.redo();
  assert.equal(t.source(), '!pre AxyAA mid BBB post');
  assert.deepEqual(
    t.snap().regions.map((r) => r.id),
    ['b'],
  );
  t.undo();
  t.undo();
  assert.equal(t.source(), original);
  assert.equal(t.snap().manual, false);
});
test('free insertion at either edge invalidates a region; author definitions reject ambiguity', () => {
  for (const pos of [4, 7]) {
    const t = setup('free');
    t.edit({ from: pos, insert: 'x' });
    assert.deepEqual(
      t.snap().regions.map((r) => r.id),
      ['b'],
    );
    t.undo();
    assert.equal(t.snap().regions.length, 2);
  }
  assert.throws(() => initialRegions('AAA AAA', [definitions[0]]), /ambiguous/);
  assert.throws(() => initialRegions(original, [definitions[0], definitions[0]]), /ambiguous/);
});

test('free replacements adjacent to a region preserve exactly its original text', () => {
  for (const change of [
    { from: 0, to: 4, insert: 'prefix ' },
    { from: 7, to: 12, insert: ' gap ' },
  ]) {
    const t = setup('free');
    t.edit(change);
    const first = t.snap().regions.find((r) => r.id === 'a');
    assert.equal(t.source().slice(first.from, first.to), 'AAA');
    t.undo();
    assert.deepEqual(t.snap().regions, initialRegions(original, definitions));
    t.redo();
    const restored = t.snap().regions.find((r) => r.id === 'a');
    assert.equal(t.source().slice(restored.from, restored.to), 'AAA');
  }
});

test('legacy recovery requires exact fixed code and approved alternatives', async () => {
  const { recoverRegions } = await import('../prototypes/pyscript/regions.js');
  assert.deepEqual(recoverRegions(original, 'pre LONG mid Y post', definitions), [
    { id: 'a', from: 4, to: 8 },
    { id: 'b', from: 13, to: 14 },
  ]);
  assert.equal(recoverRegions(original, 'pre UNKNOWN mid BBB post', definitions), null);
  assert.equal(recoverRegions(original, 'changed AAA mid BBB post', definitions), null);
  assert.equal(recoverRegions(original, original + '\n', definitions), null);
  const python = [{ id: 'call', text: 'f(x)', choices: ['f(x)', 'g(x + 1)'] }];
  assert.deepEqual(recoverRegions('return f(x)', 'return g(x + 1)', python), [
    { id: 'call', from: 7, to: 15 },
  ]);
});
test('a draft with no surviving regions cannot enter restricted modes', () => {
  const t = setup('free');
  t.edit({ from: 0, to: original.length, insert: 'changed' });
  assert.equal(t.extension.setMode(t.editor, 'regions'), false);
  assert.equal(t.extension.setMode(t.editor, 'choices'), false);
  assert.equal(t.source(), 'changed');
});

test('typing the original text back restores regions and switching without resetting', () => {
  for (const mode of ['free', 'regions']) {
    const t = setup(mode);
    t.edit({ from: 4, to: 7, insert: 'different' });
    assert.equal(t.extension.setMode(t.editor, 'choices'), false);
    t.edit({ from: 4, to: 13, insert: 'AAA' });
    assert.equal(t.source(), original);
    assert.equal(t.snap().manual, false);
    assert.deepEqual(t.snap().regions, initialRegions(original, definitions));
    assert.equal(t.extension.setMode(t.editor, 'choices'), true);
    assert.equal(t.extension.setMode(t.editor, 'regions'), true);
  }
});
test('original-source reconciliation survives undo/redo and rejects near matches', () => {
  const t = setup('free');
  t.edit({ from: 0, to: original.length, insert: 'changed' });
  t.editor.dispatch({ annotations: modules.commands.isolateHistory.of('full') });
  t.edit({ from: 0, to: 7, insert: original });
  assert.equal(t.snap().manual, false);
  t.undo();
  assert.equal(t.source(), 'changed');
  assert.equal(t.snap().regions.length, 0);
  t.redo();
  assert.equal(t.source(), original);
  assert.equal(t.snap().manual, false);
  t.edit({ from: original.length, insert: ' ' });
  assert.equal(t.extension.setMode(t.editor, 'choices'), false);
});

test('authored empty regions retain separate identities through typing, deletion and undo', () => {
  const source = 'START = \nSTOP = \n';
  const defs = [{ id: 'start', label: 'Start', from: 8, text: '', choices: [] },
    { id: 'stop', label: 'Stop', from: 16, text: '', choices: [] }];
  const t = setup('regions', source, defs);
  t.edit({ from: 8, insert: '20' });
  assert.equal(t.source(), 'START = 20\nSTOP = \n');
  assert.deepEqual(t.snap().regions, [{ id: 'start', from: 8, to: 10 }, { id: 'stop', from: 18, to: 18 }]);
  t.edit({ from: 18, insert: '24' });
  t.edit({ from: 0, insert: 'forbidden' });
  assert.equal(t.source(), 'START = 20\nSTOP = 24\n');
  t.undo(); t.undo();
  assert.equal(t.source(), source);
  assert.equal(t.snap().regions.length, 2);
});
