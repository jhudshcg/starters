/** Purpose: Make the proposed programming pair reviewable before production integration.
 * Main contents: separate preview drafts, execution policies, submission and feedback.
 * Used by: pilot.html. Uses: existing editor/runner, question fixtures and shared theme controller.
 * Libs: PyScript through adapter.js. This page never opens an application profile.
 */
import { createEditor, createRunner } from './adapter.js';
import { makePair, configurations, practiceAllowed, assess } from './pilot-questions.js';
import { createTheme, themePalettes } from '../../src/lib/theme/preferences.js';
const $ = (id) => document.getElementById(id);
const storageKey = 'starters-pyscript-pilot:v1';
const modeNames = {
  choices: 'Choose replacements',
  regions: 'Edit marked regions',
  free: 'Edit all code',
};
const modeHelp = {
  choices:
    'Use the dropdowns beside the outlined code. Ctrl/Cmd + Enter runs your function call when execution is available.',
  regions:
    'Edit inside the outlined regions. Reset or restore the original code to return to replacement choices.',
  free: 'Write your function in the editor. Ctrl/Cmd + Enter checks it when checking is available.',
};
let drafts = {},
  state,
  questions = [],
  editors = [],
  cards = [],
  key,
  loading = false,
  busy = false,
  generation = 0,
  viewGeneration = 0;
try {
  drafts = JSON.parse(localStorage.getItem(storageKey) || '{}');
} catch {
  /* Fresh preview draft. */
}
if (!drafts || typeof drafts !== 'object' || Array.isArray(drafts)) drafts = {};
const status = (message) => {
  $('status').textContent = message;
};
const runner = createRunner(status);
function save() {
  drafts[key] = state;
  try {
    localStorage.setItem(storageKey, JSON.stringify(drafts));
  } catch {
    status('This browser could not save the preview draft. Keep this page open.');
  }
}
function newState() {
  return {
    answers: questions.map((q) => ({
      source: q.source,
      expression: '',
      runs: 0,
      checks: 0,
    })),
    submitted: null,
    results: [null, null],
    revealed: [false, false],
  };
}
function permitted(index) {
  return Boolean(state.submitted || practiceAllowed($('configuration').value, index));
}
function syncControls() {
  cards.forEach((card, index) => {
    const q = questions[index],
      locked = Boolean(state.submitted),
      unavailable = busy || loading || !editors[index];
    for (const action of ['run', 'check'])
      card.querySelector(`.${action}`).disabled = unavailable || !permitted(index);
    card.querySelector('.reset').disabled = unavailable || locked;
    card.querySelector('.editing-mode').disabled = unavailable || locked;
    card.querySelector('.expression').disabled = busy || locked || !permitted(index);
    card.querySelector('.run-settings').hidden = !q.actions.includes('run') || !permitted(index);
    card.querySelector('.run').hidden = !q.actions.includes('run') || !permitted(index);
    card.querySelector('.check').hidden = !q.actions.includes('check') || !permitted(index);
    card.querySelector('.reset').hidden = locked;
    card.querySelector('.mode-label').hidden = q.modes.length < 2 || locked;
    card.querySelector('.mode-help').textContent = locked
      ? 'Submitted code · read only. Start a new attempt to edit.'
      : modeHelp[editors[index]?.snapshot().mode ?? q.modes[0]];
    card.querySelector('.access').textContent = locked
      ? 'Submitted. Checking uses the saved code below.'
      : practiceAllowed($('configuration').value, index)
        ? 'Practice question · you can run the available checks before submitting.'
        : 'Assessment question · execution and correctness feedback are available after submission.';
    card.querySelector('.reveal').hidden = !locked || state.results.some((r) => !r);
    card.querySelector('.reveal').disabled = busy;
  });
  $('stop').disabled = !busy;
  $('stop').hidden = !busy;
  $('submit').disabled = busy || loading;
  $('submit').textContent = state.submitted
    ? state.results.every(Boolean)
      ? 'Recheck submitted answers'
      : 'Retry submitted checks'
    : 'Submit answers';
  $('new-attempt').disabled = busy || loading;
  for (const id of ['configuration', 'variation']) $(id).disabled = busy || loading;
}
function stop(message = 'Stopped. Your code is saved.') {
  generation++;
  runner.stop(message);
  busy = false;
  syncControls();
  status(message);
}
function renderFeedback(index, result) {
  const feedback = cards[index].querySelector('.feedback');
  feedback.replaceChildren();
  if (!result) return;
  const title = document.createElement('h3');
  title.textContent = `${result.earned}/${result.max} marks · ${result.earned === result.max ? 'All requirements passed' : 'Some requirements did not pass'}`;
  const list = document.createElement('ul');
  for (const criterion of result.criteria) {
    const li = document.createElement('li');
    li.textContent = `${criterion.earned === criterion.max ? 'Pass' : 'Not yet'} — ${criterion.label} (${criterion.earned}/${criterion.max})`;
    list.append(li);
  }
  feedback.append(title, list);
  if (result.error) {
    const message = document.createElement('p');
    message.textContent = `${result.error.type}${result.error.line ? ` on line ${result.error.line}` : ''}: ${result.error.message}`;
    feedback.append(message);
  }
}
function summary() {
  $('summary').textContent = state.submitted
    ? state.results.every(Boolean)
      ? `Submitted result: ${state.results.reduce((sum, r) => sum + r.earned, 0)}/12. Preview only; no student progress recorded.`
      : 'Your submitted code is locked and saved. Checking is pending; retry if it was stopped or Python could not load.'
    : '';
}
async function mount(index) {
  const card = cards[index],
    q = questions[index],
    answer = state.answers[index],
    token = viewGeneration;
  editors[index]?.destroy();
  editors[index] = null;
  const locked = Boolean(state.submitted);
  const created = await createEditor(card.querySelector('.python-editor'), answer.source, {
    original: locked ? answer.source : q.source,
    definitions: locked ? [] : q.regions,
    saved: locked ? null : answer.editor,
    readOnly: locked,
    onNotice: (message) => {
      card.querySelector('.notice').textContent = message;
    },
    onSelect: () => {},
    onRun: () => execute(index, q.actions.includes('run') ? 'run' : 'check'),
    onChange: (source) => {
      if (token !== viewGeneration || state.submitted) return;
      if (busy) stop('Run stopped because the code changed.');
      answer.source = source;
      answer.editor = editors[index]?.snapshot();
      state.results[index] = null;
      renderFeedback(index, null);
      card.querySelector('.notice').textContent = '';
      card.querySelector('.editing-mode').value = answer.editor?.mode ?? q.modes[0];
      save();
      syncControls();
    },
  });
  if (token !== viewGeneration) {
    created.destroy();
    return;
  }
  editors[index] = created;
  if (!locked) {
    if (!q.modes.includes(created.snapshot().mode)) created.setMode(q.modes[0]);
    created.setFill(true);
    card.querySelector('.editing-mode').value = created.snapshot().mode;
  }
}
async function load() {
  generation++;
  viewGeneration++;
  runner.stop();
  busy = false;
  loading = true;
  for (const editor of editors) editor?.destroy();
  editors = [];
  cards = [];
  questions = makePair(Number($('variation').value));
  key = `${$('configuration').value}:${$('variation').value}`;
  state = drafts[key]?.answers?.length === 2 ? drafts[key] : newState();
  $('questions').replaceChildren();
  $('policy').textContent = {
    mixed:
      'Question 1 is for practice. Question 2 is completed without running code until you submit the set.',
    practice: 'Both questions are for practice. Use their available checks while you work.',
    assessment:
      'Both questions are assessed without running code. Submit the set to check your answers.',
  }[$('configuration').value];
  const url = new URL(location.href);
  url.searchParams.set('config', $('configuration').value);
  url.searchParams.set('variation', String(Number($('variation').value) + 1));
  history.replaceState(null, '', url);
  for (const [index, q] of questions.entries()) {
    const card = $('question-template').content.firstElementChild.cloneNode(true);
    card.dataset.question = String(index);
    card.querySelector('h2').textContent = `${index + 1}. ${q.title}`;
    card.querySelector('.question-meta').textContent = `${q.level} · 6 marks`;
    card.querySelector('.prompt').textContent = q.prompt;
    card.querySelector('.assumptions').textContent = q.assumptions;
    card.querySelector('.requirements').replaceChildren(
      ...q.requirements.map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }),
    );
    const mode = card.querySelector('.editing-mode');
    mode.replaceChildren(...q.modes.map((value) => new Option(modeNames[value], value)));
    mode.onchange = () => {
      if (state.submitted || !q.modes.includes(mode.value)) return;
      editors[index].setMode(mode.value);
      mode.value = editors[index].snapshot().mode;
      state.answers[index].editor = editors[index].snapshot();
      save();
      syncControls();
    };
    const expression = card.querySelector('.expression');
    expression.value = state.answers[index].expression;
    expression.oninput = () => {
      if (state.submitted) return;
      state.answers[index].expression = expression.value;
      save();
    };
    card.querySelector('.run').onclick = () => execute(index, 'run');
    card.querySelector('.check').onclick = () => execute(index, 'check');
    card.querySelector('.reset').onclick = async () => {
      if (busy || state.submitted) return;
      loading = true;
      syncControls();
      state.answers[index].source = q.source;
      delete state.answers[index].editor;
      state.results[index] = null;
      renderFeedback(index, null);
      save();
      await mount(index);
      loading = false;
      syncControls();
    };
    card.querySelector('.reveal').onclick = () => {
      if (!state.submitted || state.results.some((r) => !r)) return;
      state.revealed[index] = true;
      card.querySelector('.solution').hidden = false;
      save();
    };
    card.querySelector('.solution pre').textContent = q.solution;
    card.querySelector('.solution p').textContent = q.explanation;
    card.querySelector('.solution').hidden = !state.submitted || !state.revealed[index];
    cards.push(card);
    $('questions').append(card);
  }
  syncControls();
  try {
    for (let index = 0; index < questions.length; index++) await mount(index);
    state.results.forEach((r, i) => renderFeedback(i, r));
    summary();
    save();
    status(
      state.submitted
        ? 'Submitted answers restored.'
        : 'Ready. Work through both questions, then submit the set.',
    );
  } catch (error) {
    status(error.message);
  } finally {
    loading = false;
    syncControls();
  }
}
async function evaluate(index, action) {
  const q = questions[index],
    answer = state.answers[index],
    source = answer.source;
  const results = await runner.run({
    source,
    expression: action === 'check' ? q.testExpression : answer.expression,
    cases:
      action === 'check' ? q.criteria.flatMap((c) => c.tests) : [{ label: 'Your run', inputs: [] }],
  });
  return action === 'check' ? assess(q, results) : results[0];
}
async function execute(index, action) {
  if (busy || loading || !editors[index] || !questions[index].actions.includes(action)) return;
  if (!permitted(index)) {
    cards[index].querySelector('.notice').textContent =
      'Submit the set before running or checking this assessment question.';
    return;
  }
  if (action === 'run' && !state.answers[index].expression.trim()) {
    cards[index].querySelector('.notice').textContent = 'Enter a function call to run your code.';
    cards[index].querySelector('.expression').focus();
    return;
  }
  cards[index].querySelector('.notice').textContent = '';
  const token = generation;
  busy = true;
  syncControls();
  state.answers[index][action === 'check' ? 'checks' : 'runs']++;
  save();
  try {
    const result = await evaluate(index, action);
    if (token !== generation) return;
    if (action === 'check') {
      state.results[index] = result;
      renderFeedback(index, result);
      summary();
      save();
    } else {
      const output = document.createElement('pre');
      output.textContent =
        result.stdout +
        result.stderr +
        (result.error
          ? `${result.error.type}: ${result.error.message}`
          : `Returned ${JSON.stringify(result.value)} (${result.type})`);
      cards[index].querySelector('.feedback').replaceChildren(output);
    }
    status(action === 'check' ? 'Check finished.' : 'Run finished.');
  } catch (error) {
    if (token === generation) status(error.message);
  } finally {
    if (token === generation) {
      busy = false;
      syncControls();
    }
  }
}
async function submit() {
  if (busy || loading) return;
  const token = generation;
  busy = true;
  try {
    if (!state.submitted) {
      state.submitted = Date.now();
      state.results = [null, null];
      save();
      cards.forEach((card) => {
        card.querySelector('.python-editor').inert = true;
      });
      syncControls();
      summary();
      for (let index = 0; index < questions.length; index++) {
        await mount(index);
        cards[index].querySelector('.python-editor').inert = false;
      }
    }
    if (token !== generation) return;
    syncControls();
    for (let index = 0; index < questions.length; index++) {
      const result = await evaluate(index, 'check');
      if (token !== generation) return;
      state.results[index] = result;
      renderFeedback(index, result);
      save();
      summary();
    }
    status('Both submitted answers have been checked.');
  } catch (error) {
    if (token === generation) {
      status(error.message);
      summary();
    }
  } finally {
    if (token === generation) {
      busy = false;
      syncControls();
    }
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
for (const [value, label] of Object.entries(configurations))
  $('configuration').add(new Option(label, value));
for (let i = 0; i < 5; i++) $('variation').add(new Option(`Variation ${i + 1}`, String(i)));
const params = new URLSearchParams(location.search);
$('configuration').value = Object.hasOwn(configurations, params.get('config'))
  ? params.get('config')
  : 'mixed';
$('variation').value = String(Math.max(0, Math.min(4, (Number(params.get('variation')) || 1) - 1)));
for (const id of ['configuration', 'variation']) $(id).onchange = () => load();
$('submit').onclick = submit;
$('stop').onclick = () => {
  stop();
  summary();
};
$('new-attempt').onclick = () => {
  if (
    busy ||
    loading ||
    !confirm('Start a new attempt? This replaces the current preview answers.')
  )
    return;
  drafts[key] = newState();
  load();
};
window.addEventListener('pagehide', () => {
  save();
  stop();
});
window.pythonPilot = {
  get editors() {
    return editors;
  },
  get state() {
    return state;
  },
  get busy() {
    return busy || loading;
  },
  execute,
  submit,
};
load();
