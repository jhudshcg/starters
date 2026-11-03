/**
 * Purpose: Own live Python work within the current profile and attempt.
 * Main contents: saved code, execution permissions, cancellation and source-bound checks.
 * Used by: practice.js. Uses: live-python and its lazy runtime. Libs: none.
 */
import { pythonRequest, assessPython } from '#domain/live-python.js';
import {
  studentCases,
  studentRunPlan,
  sameTest,
  testReferenceRequest,
  testRunOutput,
} from '#domain/task2-tests.js';
import { markQuestion } from '#domain/marking.js';

export function createPythonPractice({ session, activeSet, persist, render, load, clock }) {
  let runner,
    token = 0,
    disposed = false,
    runningFeedback = null,
    statusSink = () => {};
  const state = (a, slot) => ((a.python ??= {})[slot] ??= { runs: 0, checks: 0 });
  function cancel(message = 'Stopped. Your code is saved.') {
    token++;
    if (runningFeedback) {
      runningFeedback.status = message;
      runningFeedback.running = false;
    }
    runningFeedback = null;
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
    if (a.pythonBusy && source !== a.answers[slot]?.code)
      cancel('Run stopped because the code changed.');
    a.answers[slot] ??= {};
    a.answers[slot].code = source;
    const saved = state(a, slot);
    saved.editor = editor;
    const q = activeSet()?.questions.find((q) => q.slot === slot);
    for (const p of q?.parts ?? []) {
      if (!p.editorRegion) continue;
      const region = editor?.regions.find((r) => r.id === p.editorRegion);
      a.answers[slot][p.id] = region ? source.slice(region.from, region.to) : '';
    }
    if (saved.result?.source !== source)
      saved.result = {
        evidence: saved.evidence ?? [],
        testReferences: saved.result?.testReferences ?? [],
      };
    delete saved.output;
    a.saved = clock();
    persist();
    render();
  }
  function expression(slot, value) {
    const a = session.data.active;
    if (!a || a.finished || a.pythonSubmission) return;
    if (a.pythonBusy) cancel('Run stopped because the inputs changed.');
    state(a, slot).expression = value;
    persist();
    render();
  }
  /** Save exact custom inputs, cancelling any observation for the previous sequence. */
  function inputs(slot, value) {
    const a = session.data.active;
    if (!a || a.finished || a.pythonSubmission) return;
    if (a.pythonBusy) cancel('Run stopped because the inputs changed.');
    state(a, slot).inputs = value;
    persist();
    render();
  }
  /** Capture a changed prediction before execution, retaining earlier source/answer snapshots. */
  function capturePrediction(a, q, source) {
    const answers = a.answers[q.slot] ?? {},
      saved = state(a, q.slot),
      previous = saved.predictions?.at(-1);
    if (
      previous?.source === source &&
      q.livePython.predictions.every((id) => previous.answers[id] === answers[id])
    )
      return null;
    const results = markQuestion(q, answers);
    const prediction = {
      at: clock(),
      source,
      answers: Object.fromEntries(q.livePython.predictions.map((id) => [id, answers[id]])),
      afterRun: Boolean(saved.runs),
      rethink: results.some((r) => q.livePython.predictions.includes(r.id) && r.earned < r.max),
    };
    (saved.predictions ??= []).push(prediction);
    persist();
    render();
    return prediction;
  }
  async function execute(slot, action = 'check', submitting = false, options = {}) {
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
      document = options.document === 'original' ? 'original' : 'edited',
      source = document === 'original' ? q.code : (a.answers[slot]?.code ?? q.code);
    if (!submitting && !a.finished && q.livePython.predictions?.length) {
      if (q.livePython.predictions.some((id) => !String(a.answers[slot]?.[id] ?? '').trim())) {
        a.pythonStatus = 'Enter your predictions in the question parts before running.';
        render();
        return false;
      }
      const prediction = capturePrediction(a, q, source);
      if (prediction?.rethink && !prediction.afterRun) {
        a.pythonStatus =
          'Predictions recorded. Reconsider them or choose the action again to continue.';
        render();
        return false;
      }
    }
    let ownTests, feedback;
    const setStatus = (message) => {
      a.pythonStatus = message;
      if (feedback) feedback.status = message;
    };
    if (action === 'run' && q.livePython.testInputs) {
      // Reference evidence directly, including original observations reused from earlier runs.
      feedback = saved.runFeedback = {
        document,
        source,
        from: saved.evidence?.length ?? 0,
        to: saved.evidence?.length ?? 0,
        records: [],
        skipped: [],
        defaults: false,
        status: '',
        running: false,
      };
      try {
        const answers = a.answers[slot] ?? {};
        const cases = studentCases(q, answers);
        const id =
          options.caseId ??
          (cases.some((c) => c.id === saved.testCase) ? saved.testCase : cases[0].id);
        const plan = studentRunPlan(q, answers, { caseId: id, allTests: options.allTests });
        ownTests = plan.tests;
        feedback.skipped = plan.hasInputs ? plan.skipped : [];
        feedback.defaults = plan.defaults;
        saved.testCase = id;
        if (!ownTests.length) {
          setStatus(
            plan.hasInputs
              ? 'No runnable test inputs provided. Complete some inputs, then run the code again.'
              : 'No test inputs provided. Add some, then run the code again.',
          );
          persist();
          render();
          return false;
        }
      } catch (error) {
        setStatus(error.message);
        persist();
        render();
        return false;
      }
    }
    const expression = saved.expression ?? q.livePython.expression ?? '';
    const supplied = ownTests?.[0] ?? q.livePython.cases?.find((c) => c.id === options.caseId);
    let customInputs = [];
    if (action === 'run' && !supplied) {
      try {
        customInputs = JSON.parse(saved.inputs || '[]');
        if (
          !Array.isArray(customInputs) ||
          customInputs.length > 1000 ||
          customInputs.some((v) => typeof v !== 'string' || v.length > 10000)
        )
          throw Error();
      } catch {
        a.pythonStatus = 'Enter input values as an array of strings, for example ["abc", "4"].';
        render();
        return false;
      }
    }
    if (action === 'run' && !supplied && !expression.trim()) {
      a.pythonStatus = 'Enter a function call before running code.';
      persist();
      render();
      return false;
    }
    const mine = ++token;
    const current = () => !disposed && mine === token && session.data === data && data.active === a;
    a.pythonBusy = true;
    runningFeedback = feedback ?? null;
    if (feedback) feedback.running = true;
    setStatus('Preparing Python…');
    if (!submitting) saved[action === 'run' ? 'runs' : 'checks']++;
    persist();
    render();
    try {
      statusSink = (message) => {
        if (current()) {
          setStatus(message);
          persist();
          render();
        }
      };
      const runRequest = async (request) => {
        if (!runner) {
          const module = await load();
          if (!current()) return [];
          runner = module.createRunner((message) => statusSink(message));
        }
        return runner.run(request);
      };
      let testReferences = saved.result?.testReferences ?? [];
      if (action === 'check') {
        const reference = testReferenceRequest(q, a.answers[slot] ?? {});
        if (reference?.cases.length) {
          const expected = await runRequest(reference);
          if (!current()) return false;
          testReferences = reference.cases.map((c, i) => ({
            caseId: c.label,
            expression: c.expression,
            inputs: c.inputs,
            observation: expected[i],
          }));
          saved.result = { ...saved.result, testReferences };
        }
      }
      const requests = ownTests
        ? ownTests.flatMap((test) =>
            (document === 'edited' ? ['original', 'edited'] : ['original']).map((version) => ({
              test,
              document: version,
              request: {
                source: version === 'original' ? q.code : source,
                expression: test.expression,
                fixtures: q.livePython.fixtures,
                cases: [{ label: test.id, inputs: test.inputs }],
              },
            })),
          )
        : [
            action === 'run'
              ? {
                  source,
                  expression: supplied?.expression ?? expression,
                  fixtures: q.livePython.fixtures,
                  cases: [
                    { label: supplied?.id ?? 'Your run', inputs: supplied?.inputs ?? customInputs },
                  ],
                }
              : pythonRequest(q, source),
          ].map((request) => ({ request, document }));
      for (const { request, test, document: version } of requests) {
        if (!current()) return false;
        if (test && version === 'original') {
          const match = (saved.evidence ?? []).findLastIndex(
            (run) =>
              run.document === 'original' &&
              run.source === request.source &&
              run.revision === q.livePython.revision &&
              JSON.stringify(run.fixtures) === JSON.stringify(request.fixtures) &&
              sameTest(run, test) &&
              run.observation &&
              !run.observation.timedOut,
          );
          if (match !== -1) {
            feedback.records.push(match);
            persist();
            render();
            continue;
          }
        }
        let observations;
        try {
          // Separate requests give every chosen input a fresh execution and its own time limit.
          observations = await runRequest(request);
        } catch (error) {
          if (!current() || !ownTests || !error.message.startsWith('Stopped after 5 seconds'))
            throw error;
          // The terminated worker cannot report output or an input count; do not invent either.
          observations = [
            {
              timedOut: true,
              stdout: '',
              stderr: '',
              value: null,
              type: null,
              error: null,
              consumed: null,
            },
          ];
        }
        if (!current() || (document === 'edited' && source !== (a.answers[slot]?.code ?? q.code)))
          return false;
        if (action === 'check')
          saved.result = {
            source,
            revision: q.livePython.revision,
            parts: assessPython(q, observations),
            testReferences,
            evidence: saved.evidence ?? [],
          };
        else {
          const r = observations[0];
          (saved.evidence ??= []).push({
            at: clock(),
            document: version,
            source: request.source,
            revision: q.livePython.revision,
            ...(request.fixtures === undefined
              ? {}
              : { fixtures: structuredClone(request.fixtures) }),
            caseId: test?.id ?? supplied?.id ?? null,
            expression: request.expression,
            ...(test ? { expected: test.expected, caseName: test.name } : {}),
            inputs: request.cases[0].inputs,
            observation: r,
          });
          if (feedback) {
            feedback.to = saved.evidence.length;
            feedback.records.push(saved.evidence.length - 1);
          }
          saved.result = { ...saved.result, evidence: saved.evidence };
          saved.output = testRunOutput(r);
          persist();
          render();
        }
      }
      setStatus(
        action === 'check'
          ? 'Check finished.'
          : `${options.allTests ? `All ${ownTests.length} tests` : ownTests?.length > 1 ? `All ${ownTests.length} inputs` : (ownTests?.[0].name ?? 'Run')} finished on ${document === 'original' ? 'Original code' : 'Your code'}.`,
      );
      return true;
    } catch (error) {
      if (current() && error.message.startsWith('Stopped after 5 seconds') && action === 'check') {
        saved.result = {
          source,
          revision: q.livePython.revision,
          evidence: saved.evidence ?? [],
          testReferences: saved.result?.testReferences ?? [],
          parts: q.parts
            .filter((p) => p.kind === 'python')
            .map((p) => ({
              id: p.id,
              earned: 0,
              max: p.marks,
              message: 'Execution time limit reached. Check for a loop that cannot finish.',
            })),
        };
        a.pythonStatus = 'Code exceeded the execution time limit.';
        return true;
      }
      if (current()) setStatus(`${error.message} Your code is saved; retry when ready.`);
      return false;
    } finally {
      if (current()) {
        runningFeedback = null;
        if (feedback) feedback.running = false;
        a.pythonBusy = false;
        persist();
        render();
      }
    }
  }
  return {
    edit,
    expression,
    inputs,
    execute,
    cancel,
    module: load,
    dispose() {
      cancel();
      disposed = true;
    },
  };
}
