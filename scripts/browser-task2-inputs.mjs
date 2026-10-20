/** Browser-only helpers for entering authored example tests through native form events.
 * Used by the Task 2 presentation and runtime suites. Python provides independent outcomes.
 */
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { studentCases, testReferenceRequest } from '../js/task2-tests.js';
export function testOutcomes(q) {
  const answers = Object.fromEntries(q.parts.map((p) => [p.id, p.answer]));
  const request = testReferenceRequest(q, answers);
  const run = (source) =>
    JSON.parse(
      execFileSync(
        'python3',
        [
          '-c',
          "import sys;sys.path.insert(0,'prototypes/pyscript');from runner import run_cases;print(run_cases(sys.stdin.read()))",
        ],
        {
          input: JSON.stringify({ ...request, source }),
          encoding: 'utf8',
          timeout: 5000,
        },
      ),
    );
  return { expected: run(request.source), actual: run(q.code) };
}
export async function enterOutcome(b, slot, id, observation, interactive) {
  const prefix = `#test-${slot}-${id}`;
  await b.change(`${prefix}-type`, observation.error ? 'error' : observation.type);
  await b.change(
    `${prefix}-value`,
    observation.error?.type ?? String(observation.value ?? ''),
    'input',
  );
  if (interactive && id.endsWith('-own-expected')) {
    const actual = id.replace('-own-expected', '-own-actual');
    assert.equal(await b.evaluate(`document.querySelector('[data-test-response="${actual}"] button').disabled`), true);
  }
  if (interactive) await b.change(`${prefix}-consumed`, String(observation.consumed), 'input');
}
export async function enterTestInputs(b, slot, q) {
  for (const row of q.testPlan) {
    const data = JSON.parse(q.parts.find((p) => p.id === row.dataPart).answer);
    for (const c of row.cases) {
      const prefix = `#test-${slot}-${row.dataPart}-${c.id}`;
      if (data[c.id].inputs)
        for (const [i, input] of data[c.id].inputs.entries()) {
          await b.evaluate(
            `[...[...document.querySelectorAll('[data-test-response="${row.dataPart}"] fieldset')][${row.cases.indexOf(c)}].querySelectorAll('button')].find(b=>b.textContent.trim()==='Add input').click()`,
          );
          await b.change(`${prefix}-${i}`, input, 'input');
        }
      else
        for (const [name, value] of Object.entries(data[c.id].args))
          await b.change(
            `${prefix}-${name}`,
            value,
            ['True', 'False'].includes(value) ? 'change' : 'input',
          );
    }
  }
}
export async function enterExpectations(b, slot, q, observations) {
  for (const c of studentCases(q))
    await enterOutcome(
      b,
      slot,
      c.expectedPart,
      observations.find((r) => r.label === c.id),
      !q.livePython.testInputs.parameters.length,
    );
}
