/**
 * Purpose: Question-owned Python execution requests and requirement-level marking.
 * Main contents: test requests, typed comparisons, source-bound results and editing policy.
 * Used by: practice service, question component and independent Python tests.
 * Uses: packed-data. Libs: none.
 */
import { markingPart } from './packed-data.js';

const canonical = (value) =>
  JSON.stringify(value, (_, v) =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a.localeCompare(b)))
      : v,
  );

export function pythonRequest(q, source, expression = null) {
  return {
    source,
    expression:
      expression ??
      (q.livePython.function
        ? `${q.livePython.function}(*__import__("json").loads(input()))`
        : 'None'),
    cases:
      expression === null
        ? q.parts
            .filter((p) => p.kind === 'python')
            .flatMap((p) =>
              markingPart(p).pythonTests.map((test) => ({
                label: p.id,
                inputs: test.inputs ?? [JSON.stringify(test.args)],
                ...(test.expression ? { expression: test.expression } : {}),
              })),
            )
        : [{ label: 'Your run', inputs: [] }],
  };
}

export function assessPython(q, observations) {
  let index = 0;
  return q.parts
    .filter((p) => p.kind === 'python')
    .map((part) => {
      const tests = markingPart(part).pythonTests;
      const actual = observations.slice(index, index + tests.length);
      index += tests.length;
      const correct =
        actual.length === tests.length &&
        tests.every(
          (test, i) =>
            !actual[i].error &&
            actual[i].type === test.type &&
            (test.consumed === undefined || actual[i].consumed === test.consumed) &&
            (test.stdoutIncludes ?? []).every((line) => actual[i].stdout.includes(line)) &&
            canonical(actual[i].value) === canonical(test.value),
        );
      const error = actual.find((r) => r.error)?.error;
      return {
        id: part.id,
        earned: correct ? part.marks : 0,
        max: part.marks,
        message: correct
          ? 'Requirement passed.'
          : error
            ? `${error.type}${error.line ? ` on line ${error.line}` : ''}: ${error.type === 'EOFError' ? 'This check ran out of input. Check whether a valid entry ends the loop.' : error.message}`
            : 'This requirement did not pass. Try another input and trace your code.',
      };
    });
}

export function pythonResults(q, answers = {}, result) {
  return result?.source === (answers.code ?? q.code) && result.revision === q.livePython.revision
    ? (result.parts ?? [])
    : q.parts
        .filter((p) => p.kind === 'python')
        .map((p) => ({
          id: p.id,
          earned: 0,
          max: p.marks,
          pending: true,
          message: 'Code has not been checked.',
        }));
}

export function pythonModes(q, level = 'foundation', hint = false) {
  const modes = q.livePython.modes;
  const preferred = {
    beginner: 'choices',
    foundation: 'regions',
    standard: 'free',
    stretch: 'free',
  }[level];
  const defaultMode = modes.includes(preferred) ? preferred : modes[0];
  return {
    defaultMode,
    modes: modes.filter(
      (mode) =>
        mode !== 'choices' ||
        modes.length === 1 ||
        hint ||
        ['beginner', 'foundation', 'all'].includes(level),
    ),
  };
}

let modulePromise;
/** Lazy-load the shared, locally shipped PyScript adapter; retry failed loads. */
export function loadPython(base = '/python/') {
  if (!modulePromise)
    modulePromise = import(/* @vite-ignore */ `${base}adapter.js`).catch((error) => {
      modulePromise = null;
      throw error;
    });
  return modulePromise;
}
