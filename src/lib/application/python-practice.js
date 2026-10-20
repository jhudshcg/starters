/**
 * Purpose: Own live Python work within the current profile and attempt.
 * Main contents: saved code, execution permissions, cancellation and source-bound checks.
 * Used by: practice.js. Uses: live-python and its lazy runtime. Libs: none.
 */
import { pythonRequest, assessPython } from '#domain/live-python.js';

export function createPythonPractice({ session, activeSet, persist, render, load, clock }) {
  let runner,
    token = 0,
    disposed = false,
    statusSink = () => {};
  const state = (a, slot) => ((a.python ??= {})[slot] ??= { runs: 0, checks: 0 });
  function cancel(message = 'Stopped. Your code is saved.') {
    token++;
    runner?.stop(message);
    const a = session.data.active;
    if (a?.pythonBusy) {
      a.pythonBusy = false;
      a.pythonStatus = message;
      persist();
      render();
    }
  }
  function edit(slot, source, editor) {
    const a = session.data.active;
    if (!a || a.finished || a.pythonSubmission) return;
    if (a.pythonBusy) cancel('Run stopped because the code changed.');
    a.answers[slot] ??= {};
    a.answers[slot].code = source;
    const saved = state(a, slot);
    saved.editor = editor;
    if (saved.result?.source !== source) delete saved.result;
    delete saved.output;
    a.saved = clock();
    persist();
  }
  function expression(slot, value) {
    const a = session.data.active;
    if (!a || a.finished || a.pythonSubmission) return;
    state(a, slot).expression = value;
    persist();
  }
  async function execute(slot, action = 'check', submitting = false) {
    const data = session.data,
      a = data.active;
    const q = activeSet()?.questions.find((q) => q.slot === slot);
    if (disposed || !a || !q?.livePython || a.pythonBusy) return false;
    if (
      !submitting &&
      (!q.livePython.actions.includes(action) ||
        (a.pythonSubmission && !a.finished) ||
        (!a.finished && q.livePython.access !== 'practice'))
    )
      return false;
    const saved = state(a, slot),
      source = a.answers[slot]?.code ?? q.code;
    if (action === 'run' && !saved.expression?.trim()) {
      a.pythonStatus = 'Enter a function call before running code.';
      persist();
      render();
      return false;
    }
    const mine = ++token;
    const current = () => !disposed && mine === token && session.data === data && data.active === a;
    a.pythonBusy = true;
    a.pythonStatus = 'Preparing Python…';
    if (!submitting) saved[action === 'run' ? 'runs' : 'checks']++;
    persist();
    render();
    try {
      const module = await load();
      if (!current()) return false;
      statusSink = (message) => {
        if (current()) {
          a.pythonStatus = message;
          persist();
          render();
        }
      };
      runner ??= module.createRunner((message) => statusSink(message));
      const observations = await runner.run(
        pythonRequest(q, source, action === 'run' ? saved.expression : null),
      );
      if (!current() || source !== (a.answers[slot]?.code ?? q.code)) return false;
      if (action === 'check')
        saved.result = {
          source,
          revision: q.livePython.revision,
          parts: assessPython(q, observations),
        };
      else {
        const r = observations[0];
        saved.output =
          r.stdout +
          r.stderr +
          (r.error
            ? `${r.error.type}: ${r.error.message}`
            : `Returned ${JSON.stringify(r.value)} (${r.type})`);
      }
      a.pythonStatus = action === 'check' ? 'Check finished.' : 'Run finished.';
      return true;
    } catch (error) {
      if (current() && error.message.startsWith('Stopped after 5 seconds') && action === 'check') {
        saved.result = {
          source,
          revision: q.livePython.revision,
          parts: q.parts.map((p) => ({
            id: p.id,
            earned: 0,
            max: p.marks,
            message: 'Execution time limit reached. Check for a loop that cannot finish.',
          })),
        };
        a.pythonStatus = 'Code exceeded the execution time limit.';
        return true;
      }
      if (current()) a.pythonStatus = `${error.message} Your code is saved; retry when ready.`;
      return false;
    } finally {
      if (current()) {
        a.pythonBusy = false;
        persist();
        render();
      }
    }
  }
  return {
    edit,
    expression,
    execute,
    cancel,
    module: load,
    dispose() {
      cancel();
      disposed = true;
    },
  };
}
