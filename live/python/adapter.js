/** Purpose: Connect PyScript's editor and worker to question-owned state.
 * Main contents: editor lifecycle, saved regions and bounded Python execution.
 * Used by: trial.js. Uses: regions.js. Libs: PyScript and its bundled CodeMirror APIs.
 */
import { codemirror, PyWorker } from './vendor/core.js';
import { editorTheme } from './editor-theme.js';
import { regionExtension, initialRegions, recoverRegions } from './regions.js';

export async function createEditor(
  host,
  source,
  { definitions, original, saved, onChange, onSelect, onRun, onNotice, readOnly = false },
) {
  const [viewModule, stateModule, commands, language] = await Promise.all([
    codemirror.view,
    codemirror.state,
    codemirror.commands,
    codemirror.language,
  ]);
  const { EditorView } = viewModule;
  const { StateEffect, EditorState } = stateModule;
  initialRegions(original, definitions);
  const validSaved =
    saved &&
    saved.original === original &&
    ['choices', 'regions', 'free'].includes(saved.mode) &&
    typeof saved.manual === 'boolean' &&
    Array.isArray(saved.regions) &&
    new Set(saved.regions.map((r) => r.id)).size === saved.regions.length &&
    saved.regions.every(
      (r, i) =>
        definitions.some((d) => d.id === r.id) &&
        Number.isInteger(r.from) &&
        Number.isInteger(r.to) &&
        r.from >= 0 &&
        r.to >= r.from &&
        r.to <= source.length &&
        (!i || saved.regions[i - 1].to < r.from),
    );
  const recovered = validSaved ? null : recoverRegions(original, source, definitions);
  const initial = validSaved
    ? { ...saved }
    : recovered
      ? { regions: recovered, manual: false, mode: 'choices', fill: saved?.fill ?? false }
      : { regions: [], manual: true, mode: 'free', fill: saved?.fill ?? false };
  // Known free-edit invalidation is never reversed by legacy recovery.
  if (source === original) {
    initial.regions = initialRegions(original, definitions);
    initial.manual = false;
  }
  initial.original = original;
  if (!initial.regions.length || (initial.manual && initial.mode === 'choices'))
    initial.mode = 'free';
  const region = regionExtension(
    { state: stateModule, view: viewModule, commands },
    definitions,
    initial,
    onNotice,
  );
  const script = document.createElement('script');
  script.type = 'py-editor';
  script.setAttribute('rows', '24');
  script.textContent = source;
  const ready = new Promise((resolve) =>
    script.addEventListener('py-editor', resolve, { once: true }),
  );
  host.append(script);
  await ready;
  // Only this lookup depends on the pinned PyScript editor's DOM structure.
  const root = script.target.querySelector('.py-editor-input > div').shadowRoot;
  const view = EditorView.findFromDOM(root.querySelector('.cm-editor'));
  if (!view) throw Error('The pinned PyScript editor did not expose a CodeMirror view.');
  const selection = () => {
    const { from, to } = view.state.selection.main;
    return {
      from,
      to,
      text: view.state.sliceDoc(from, to),
      line: view.state.doc.lineAt(from).number,
    };
  };
  view.dispatch({
    effects: StateEffect.appendConfig.of([
      region.extensions,
      EditorState.readOnly.of(readOnly),
      EditorView.editable.of(!readOnly),
      EditorState.transactionFilter.of((tr) => (readOnly && tr.docChanged ? [] : tr)),
      editorTheme(viewModule, language),
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({ 'aria-label': 'Python code' }),
      EditorView.theme({
        '&': { fontSize: '1rem' },
        '.cm-content': { fontFamily: 'ui-monospace, monospace' },
        '.cm-line': { padding: '0 5px' },
      }),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) onChange(view.state.doc.toString());
        if (update.docChanged || update.selectionSet) onSelect(selection());
      }),
    ]),
  });
  script.handleEvent = async () => {
    onRun();
    return false;
  };
  script.target.querySelector('.py-editor-run-button').remove();
  script.target.querySelector('.py-editor-output').hidden = true;
  return {
    get source() {
      return view.state.doc.toString();
    },
    set source(value) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    },
    snapshot: () => ({ ...region.snapshot(view), original }),
    setMode: (mode) => region.setMode(view, mode),
    setFill: (fill) => region.setFill(view, fill),
    selectRegion: (id) => region.selectRegion(view, id),
    replaceRegion: (id, text) => region.replace(view, id, text),
    selection,
    select(from, to) {
      view.dispatch({ selection: { anchor: from, head: to }, scrollIntoView: true });
      view.focus();
    },
    replaceSelection(insert) {
      view.dispatch(view.state.replaceSelection(insert));
      view.focus();
    },
    undo: () => commands.undo(view),
    redo: () => commands.redo(view),
    destroy() {
      view.destroy();
      script.xworker?.terminate();
      script.target.remove();
      script.remove();
    },
  };
}

/** Own one PyScript worker; cancel stale requests and bound startup and execution. */
export function createRunner(onStatus) {
  let worker = null,
    loading = null,
    packagesKey = '',
    generation = 0,
    cancel = null;
  function stop(reason = 'Stopped. Your edits are kept.') {
    generation++;
    worker?.terminate();
    worker = null;
    loading = null;
    cancel?.(Error(reason));
    cancel = null;
  }
  return {
    stop,
    async run(request, packages = []) {
      if (cancel) throw Error('A run is already in progress.');
      const key = JSON.stringify(packages);
      if (key !== packagesKey) {
        stop();
        packagesKey = key;
      }
      const token = generation;
      let timeout;
      const cancellation = new Promise((_, reject) => {
        cancel = reject;
      });
      try {
        if (!worker) {
          onStatus(packages.length ? 'Loading Python and data libraries…' : 'Loading Python…');
          timeout = setTimeout(
            () => stop('Python could not start within 90 seconds. Check the connection and retry.'),
            90000,
          );
          loading = PyWorker(new URL('./runner.py', import.meta.url).href, {
            config: {
              sync_main_only: true,
              packages,
              interpreter: 'https://cdn.jsdelivr.net/pyodide/v314.0.3/full/pyodide.mjs',
            },
          });
          loading.then(
            (value) => {
              if (token !== generation) value.terminate();
            },
            () => {},
          );
          worker = await Promise.race([loading, cancellation]);
          clearTimeout(timeout);
        }
        onStatus('Running…');
        timeout = setTimeout(
          () => stop('Stopped after 5 seconds. Check for a loop that cannot finish.'),
          5000,
        );
        const result = await Promise.race([
          worker.sync.run_cases(JSON.stringify(request)),
          cancellation,
        ]);
        if (token !== generation) throw Error('This run was replaced.');
        return JSON.parse(result);
      } finally {
        clearTimeout(timeout);
        if (token === generation) cancel = null;
      }
    },
  };
}
