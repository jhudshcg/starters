/**
 * Purpose: Connect student-authored Task 2 tests to execution and marking.
 * Main contents: safe argument construction, reference checks and exact run matching.
 * Used by: practice service, marking and test-plan components. Uses: packed-data.
 * Libs: none. Responses remain JSON strings within the existing answer store.
 */
import { markingPart } from './packed-data.js';

export function testResponse(raw, fallback = {}) {
  try {
    const value = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return value && typeof value === 'object' && !Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

/** Stable input identities preserve results when another valid input is removed. */
export function testInputIds(baseId, data = {}) {
  const inputs = Array.isArray(data.inputs) ? data.inputs : [];
  const ids = data.inputIds;
  if (
    Array.isArray(ids) &&
    ids.length === inputs.length &&
    new Set(ids).size === ids.length &&
    ids.every(
      (id) =>
        typeof id === 'string' &&
        /^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(id) &&
        (id === baseId || id.startsWith(`${baseId}-input-`)),
    )
  )
    return ids;
  return inputs.map((_, i) => (i === 0 ? baseId : `${baseId}-input-${i + 1}`));
}

/** With answers, expand valid text values into independent runs; other cases stay intact. */
export const studentCases = (q, answers) =>
  q.testPlan.flatMap((row, i) =>
    row.cases.flatMap((c) => {
      const base = {
        ...c,
        baseId: c.id,
        row,
        name: `Test ${i + 1}${row.cases.length > 1 ? ` · ${c.label}` : ''}`,
      };
      if (!answers || q.livePython.testInputs.parameters.length || row.kind !== 'valid')
        return [base];
      const data = testResponse(answers[row.dataPart])[c.id] ?? {};
      const ids = testInputIds(c.id, data);
      // Keep one incomplete case so an empty plan cannot earn marks by skipping the loop.
      return (ids.length ? ids : [c.id]).map((id, inputIndex) => ({
        ...base,
        id,
        independent: true,
        inputIndex,
        input: data.inputs?.[inputIndex],
        label: `Input ${inputIndex + 1}`,
        name: `${base.name} · Input ${inputIndex + 1}`,
      }));
    }),
  );

/** Old single-case outcomes apply only to their original case, never to added inputs. */
export function testOutcome(raw, c) {
  const value = testResponse(raw);
  return value.outcomes ? testResponse(value.outcomes[c.id]) : c.id === c.baseId ? value : {};
}

export function withTestOutcome(raw, c, next) {
  if (!c.independent) return next;
  const value = testResponse(raw);
  return {
    outcomes: {
      ...(value.outcomes ?? (value.type ? { [c.baseId]: value } : {})),
      [c.id]: { ...next, name: c.name },
    },
  };
}

/** Build executable literals from named fields; student text never becomes Python syntax. */
export function studentTest(q, answers, id) {
  const c = studentCases(q, answers).find((c) => c.id === id);
  if (!c) throw Error('Choose a test in the test plan.');
  const data = testResponse(answers[c.row.dataPart])[c.baseId];
  const spec = q.livePython.testInputs;
  if (!data) throw Error(`Enter your inputs for ${c.name}.`);
  let inputs = [],
    args = [];
  if (!spec.parameters.length) {
    inputs = data.inputs;
    if (
      !Array.isArray(inputs) ||
      !inputs.length ||
      inputs.length > 20 ||
      inputs.some((v) => typeof v !== 'string' || v.length > 1000)
    )
      throw Error('Add between 1 and 20 input entries. An empty entry is allowed.');
    if (c.independent) inputs = [inputs[c.inputIndex]];
  } else {
    args = spec.parameters.map((p) => {
      const raw = data.args?.[p.name];
      if (p.type === 'bool') {
        if (!['True', 'False'].includes(raw)) throw Error(`Choose ${p.name}.`);
        return raw;
      }
      const values = p.type === 'list' ? String(raw ?? '').split(',') : [raw];
      const numbers = values.map((v) => {
        if (typeof v !== 'string' || !/^[+]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(v.trim()))
          throw Error(
            `Enter ${p.name} as ${p.type === 'list' ? 'comma-separated numbers' : 'a number'}.`,
          );
        const n = Number(v);
        if (
          !Number.isFinite(n) ||
          n <= 0 ||
          n > (p.max ?? 10000) ||
          (p.integer && !Number.isInteger(n))
        )
          throw Error(`Check the allowed values for ${p.name} in the requirements.`);
        return n;
      });
      if (numbers.length > 20) throw Error('Use at most 20 prices in a test.');
      return p.type === 'list' ? JSON.stringify(numbers) : String(numbers[0]);
    });
  }
  return { id, name: c.name, expression: `${spec.function}(${args.join(', ')})`, inputs };
}

export function sameTest(run, test) {
  return (
    run?.caseId === test.id &&
    run.expression === test.expression &&
    JSON.stringify(run.inputs) === JSON.stringify(test.inputs)
  );
}

export function recordedOutcome(observation) {
  return {
    type: observation.error ? 'error' : observation.type,
    value: observation.error?.type ?? String(observation.value ?? ''),
    consumed: String(observation.consumed),
  };
}

/** Render runtime evidence consistently in the test plan and saved attempt review. */
export function testRunOutput(observation) {
  if (observation.timedOut)
    return 'Execution stopped after 5 seconds. Output and the number of inputs used are unavailable.';
  return (
    observation.stdout +
    observation.stderr +
    (observation.error
      ? `${observation.error.type}: ${observation.error.message}`
      : `Returned ${JSON.stringify(observation.value)} (${observation.type})`) +
    `\nInputs used: ${observation.consumed}`
  );
}

export function completeOutcome(raw) {
  const value = testResponse(raw);
  return (
    ['int', 'float', 'str', 'error', 'NoneType', 'bool'].includes(value.type) &&
    typeof value.value === 'string' &&
    /^\d+$/.test(value.consumed ?? '') &&
    (['str', 'NoneType'].includes(value.type) || Boolean(value.value.trim()))
  );
}

function matchesOutcome(raw, observation) {
  if (!completeOutcome(raw)) return false;
  const given = testResponse(raw),
    expected = recordedOutcome(observation);
  if (given.type !== expected.type || Number(given.consumed) !== observation.consumed) return false;
  if (['int', 'float'].includes(given.type))
    return given.value.trim() !== '' && Number(given.value) === Number(expected.value);
  return given.value === expected.value;
}

/** Run the authored corrected reference, not student code, for each complete input plan. */
export function testReferenceRequest(q, answers) {
  if (!q.livePython.testInputs) return null;
  const source = markingPart(q.parts.find((p) => p.kind === 'python')).answer;
  const tests = studentCases(q, answers).flatMap((c) => {
    try {
      return [studentTest(q, answers, c.id)];
    } catch {
      return [];
    }
  });
  return {
    source,
    expression: 'None',
    cases: tests.map((t) => ({
      label: t.id,
      expression: t.expression,
      inputs: t.inputs,
    })),
  };
}

/** Assessment is independent of fixed examples and rejects evidence for changed inputs. */
export function markTestPart(q, p, answers, execution) {
  const result = { id: p.id, earned: 0, max: p.marks };
  const cases = studentCases(q, answers).filter((c) =>
    p.testRole === 'data' ? c.row.dataPart === p.id : c.baseId === p.testCase,
  );
  try {
    for (const c of cases) {
      const t = studentTest(q, answers, c.id);
      if (p.testRole === 'actual') {
        const run = execution?.evidence?.findLast(
          (r) => sameTest(r, t) && r.document === 'original' && r.source === q.code,
        );
        if (!run)
          return {
            ...result,
            message: `Run ${c.name} on Original code before recording its actual result.`,
          };
        if (run.observation.timedOut)
          return {
            ...result,
            message: `${c.name}: the run exceeded the time limit. Review the code and rerun before recording an actual result.`,
          };
        if (!matchesOutcome(testOutcome(answers[p.id], c), run.observation))
          return {
            ...result,
            message: `${c.name}: compare your recorded type, value or exception, and inputs used with the original run.`,
          };
      } else {
        const reference = execution?.testReferences?.find((r) => sameTest(r, t));
        if (!reference)
          return {
            ...result,
            pending: true,
            message: 'Check the test plan and code to assess these inputs.',
          };
        const r = reference.observation;
        const appropriate =
          !r.error &&
          (!q.livePython.testInputs.parameters.length
            ? r.consumed === t.inputs.length &&
              (c.row.kind === 'invalid' ? r.consumed > 1 : r.consumed === 1)
            : true);
        if (!appropriate)
          return {
            ...result,
            message:
              c.row.kind === 'invalid'
                ? 'Start with one or more invalid entries, then end with one valid entry so the intended function can finish.'
                : `${c.name}: enter a valid value that meets the requirements.`,
          };
        if (p.testRole === 'expected' && !matchesOutcome(testOutcome(answers[p.id], c), r))
          return {
            ...result,
            message: `${c.name}: check the expected return type, value and number of inputs used against the requirements.`,
          };
      }
    }
    if (p.testRole === 'data' && cases.length > 1) {
      const signatures = cases.map((c) => {
        const t = studentTest(q, answers, c.id);
        return JSON.stringify([t.expression, t.inputs]);
      });
      if (new Set(signatures).size !== signatures.length)
        return { ...result, message: 'Choose different inputs for each test case.' };
    }
    return {
      ...result,
      earned: p.marks,
      message:
        p.testRole === 'actual'
          ? 'Recorded result matches your original-code run.'
          : 'Requirement passed.',
    };
  } catch (error) {
    return { ...result, message: error.message };
  }
}

/** Keep archived structured answers readable without requiring today's question bank. */
export function describeTestResponse(raw) {
  const value = testResponse(raw);
  if (value.outcomes)
    return Object.entries(value.outcomes)
      .map(([id, outcome]) => `${outcome.name ?? id}: ${describeTestResponse(outcome)}`)
      .join('\n');
  if (value.type)
    return `${value.type}: ${JSON.stringify(value.value ?? '')} · inputs used: ${value.consumed ?? 'not recorded'}`;
  if (Object.values(value).some((v) => v?.inputs || v?.args))
    return Object.entries(value)
      .map(
        ([id, data]) =>
          `${id}: ${
            data.inputs
              ? data.inputs.map((v, i) => `input ${i + 1} = ${JSON.stringify(v)}`).join('; ')
              : Object.entries(data.args ?? {})
                  .map(([k, v]) => `${k} = ${v}`)
                  .join('; ')
          }`,
      )
      .join('\n');
  return raw;
}
