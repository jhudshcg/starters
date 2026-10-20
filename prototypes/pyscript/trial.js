/** Bind the local trial questions to PyScript; keep assessment controls outside the editor.
 * Uses adapter.js, question fixtures and a dedicated localStorage key. No application profile access.
 */
import { createEditor, createRunner } from './adapter.js';
import { questions } from './questions.js';
import { createTheme, themePalettes } from '../../src/lib/theme/preferences.js';
const $ = (id) => document.getElementById(id);
const storageKey = 'starters-pyscript-trial:v1';
let drafts = {},
  editor,
  question,
  busy = false,
  requestId = 0,
  lastResults = null;
try {
  drafts = JSON.parse(localStorage.getItem(storageKey) || '{}');
} catch {
  /* Trial starts fresh if unavailable. */
}
const status = (message) => {
  $('status').textContent = message;
};
const runner = createRunner(status);
function save() {
  if (!editor) return;
  drafts[question.id] = {
    source: editor.source,
    editor: editor.snapshot(),
    inputs: $('inputs').value,
    expression: $('expression').value,
  };
  try {
    localStorage.setItem(storageKey, JSON.stringify(drafts));
  } catch {
    status('Edits could not be saved in this browser.');
  }
}
function invalidate() {
  lastResults = null;
  $('results').replaceChildren();
  status('Code or inputs changed. Run again to check this version.');
  if (busy) stop('Run stopped because the code or inputs changed.');
}
function setBusy(value) {
  busy = value;
  for (const id of ['run', 'check', 'reset']) $(id).disabled = value;
  $('stop').disabled = !value;
}
function stop(message = 'Stopped. Your edits are kept.') {
  requestId++;
  runner.stop(message);
  setBusy(false);
  status(message);
}
function selectionChanged(selection) {
  $('selection').textContent = selection.text
    ? `Line ${selection.line}: ${selection.text}`
    : `Line ${selection.line} · No code selected.`;
}
function options(id, values) {
  $(id).replaceChildren(...values.map((value) => new Option(value, value)));
}
async function loadQuestion(reset = false) {
  const previous = editor?.snapshot();
  stop();
  editor?.destroy();
  editor = null;
  question = questions.find((q) => q.id === $('question').value);
  $('title').textContent = question.title;
  $('requirements').replaceChildren(
    ...question.requirements.map((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    }),
  );

  $('inputs').value = drafts[question.id]?.inputs ?? question.inputs.join('\n');
  $('expression').value = drafts[question.id]?.expression ?? question.expression;
  $('results').replaceChildren();
  lastResults = null;
  const token = requestId;
  $('run').disabled = $('check').disabled = true;
  const created = await createEditor(
    $('editor'),
    reset ? question.source : (drafts[question.id]?.source ?? question.source),
    {
      original: question.source,
      definitions: question.regions,
      saved: reset ? null : drafts[question.id]?.editor,
      onNotice: (message) => {
        $('editor-notice').textContent = message;
      },
      onChange: () => {
        $('editor-notice').textContent = '';
        syncMode();
        invalidate();
        save();
      },
      onSelect: selectionChanged,
      onRun: () => run(false),
    },
  );
  if (token !== requestId) {
    created.destroy();
    return;
  }
  editor = created;
  if (reset && previous) {
    editor.setMode(previous.mode);
    editor.setFill(previous.fill);
  }
  syncMode();
  $('editor-notice').textContent = '';
  if (reset) save();
  selectionChanged(editor.selection());
  setBusy(false);
  status('Ready. Run code or try the question tests.');
}
function passed(result, test) {
  if (result.error || result.type !== test.type || result.consumed !== test.consumed) return false;
  return 'expected' in test
    ? result.value === test.expected
    : result.value >= test.minimum && result.value <= test.maximum;
}
function renderResults(results, tests) {
  $('results').replaceChildren();
  for (const [index, result] of results.entries()) {
    const section = document.createElement('article');
    section.className = 'result';
    const heading = document.createElement('h3');
    const good = tests && passed(result, tests[index]);
    heading.textContent = result.label + (tests ? (good ? ' — Pass' : ' — Fail') : '');
    if (tests) heading.className = good ? 'pass' : 'fail';
    const output = document.createElement('pre');
    output.textContent = result.stdout + result.stderr;
    const detail = document.createElement('p');
    detail.textContent = result.error
      ? `${result.error.type}: ${result.error.message}`
      : `Returned ${JSON.stringify(result.value)} (${result.type}); inputs used: ${result.consumed}.`;
    section.append(heading, output, detail);
    if (result.error?.line && result.error.line <= editor.source.split('\n').length) {
      const button = document.createElement('button');
      button.textContent = `Highlight error line ${result.error.line}`;
      button.onclick = () => {
        const lines = editor.source.split('\n'),
          from = lines.slice(0, result.error.line - 1).reduce((n, line) => n + line.length + 1, 0);
        editor.select(from, from + lines[result.error.line - 1].length);
      };
      section.append(button);
    }
    for (const [i, plot] of result.plots.entries()) {
      const img = document.createElement('img');
      img.src = 'data:image/png;base64,' + plot;
      img.alt = `Chart ${i + 1} generated by this code`;
      section.append(img);
    }
    $('results').append(section);
  }
}
async function run(check) {
  if (busy || !editor) return;
  save();
  setBusy(true);
  $('results').replaceChildren();
  lastResults = null;
  const token = ++requestId,
    source = editor.source,
    started = performance.now();
  const tests = check ? question.tests : null;
  const cases = tests ?? [
    { label: 'Your run', inputs: $('inputs').value === '' ? [] : $('inputs').value.split('\n') },
  ];
  try {
    const results = await runner.run(
      {
        source,
        expression: check ? question.expression : $('expression').value,
        cases,
        plots: Boolean(question.packages),
      },
      question.packages,
    );
    if (token !== requestId || source !== editor.source) return;
    lastResults = results;
    renderResults(results, tests);
    status(
      `${tests ? `${results.filter((r, i) => passed(r, tests[i])).length}/${tests.length} tests passed.` : 'Run finished.'} ${(performance.now() - started).toFixed(0)} ms including any startup.`,
    );
  } catch (error) {
    if (token === requestId) status(error.message);
  } finally {
    if (token === requestId) setBusy(false);
  }
}
const theme = createTheme({
  root: document.documentElement,
  storage: localStorage,
  notify: status,
});
for (const mode of ['light', 'dark'])
  for (const palette of themePalettes)
    $('theme').add(new Option(palette[mode], `${mode}:${palette.id}`));
theme.subscribe((value) => {
  $('theme').value = `${value.mode}:${value.palette}`;
});
$('theme').onchange = () => theme.choose(...$('theme').value.split(':'));

options(
  'question',
  questions.map((q) => q.id),
);
for (const [i, q] of questions.entries()) $('question').options[i].textContent = q.title;
$('question').onchange = () => loadQuestion(false).catch((error) => status(error.message));
$('run').onclick = () => run(false);
$('check').onclick = () => run(true);
$('stop').onclick = () => stop();
$('reset').onclick = () => loadQuestion(true).catch((error) => status(error.message));
const modeHelp = {
  choices:
    'Use the arrows beside outlined code to choose replacements. The rest of the code is fixed.',
  regions:
    'Edit inside the outlined regions. The rest of the code is fixed. Click a region to select it; click again to position the cursor.',
  free: 'Edit anywhere. Outlines suggest regions to investigate. Editing a suggested region removes its outline; undo restores it.',
};
function syncMode() {
  const snapshot = editor.snapshot();
  $('mode').value = snapshot.mode;
  $('region-fill').checked = snapshot.fill;
  $('mode-help').textContent = snapshot.regions.length
    ? modeHelp[snapshot.mode]
    : 'No marked regions remain in this draft. Your edits are kept. Reset code to restore the regions and replacement choices.';
  $('region-fill').disabled = !snapshot.regions.length;
}
$('mode').onchange = () => {
  if (!editor) return;
  $('editor-notice').textContent = '';
  editor.setMode($('mode').value);
  syncMode();
  save();
};
$('region-fill').onchange = () => {
  editor?.setFill($('region-fill').checked);
  if (editor) save();
};
for (const id of ['inputs', 'expression'])
  $(id).oninput = () => {
    invalidate();
    save();
  };
window.addEventListener('pagehide', () => runner.stop());
// Test surface stays on this local prototype; no production/global app API is added.
window.pythonTrial = {
  get editor() {
    return editor;
  },
  get results() {
    return lastResults;
  },
  get busy() {
    return busy;
  },
  run,
  stop,
};
loadQuestion().catch((error) => status(error.message));
