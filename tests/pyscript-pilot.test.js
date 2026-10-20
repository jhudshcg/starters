/** Purpose: Check all review-draft variants against real Python and plausible faulty solutions.
 * Main contents: model/alternative implementations, boundary errors and preview policies.
 * Used by: focused local checks. Uses: pilot fixtures and the existing observation runner.
 * Libs: Node test/assert/child_process and local Python 3.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { makePair, assess, practiceAllowed } from '../prototypes/pyscript/pilot-questions.js';
const directory = fileURLToPath(new URL('../prototypes/pyscript/', import.meta.url));
function check(q, source) {
  const observations = JSON.parse(
    execFileSync(
      'python3',
      [
        '-c',
        'import sys; sys.path.insert(0, sys.argv[1]); from runner import run_cases; print(run_cases(sys.stdin.read()))',
        directory,
      ],
      {
        input: JSON.stringify({
          source,
          expression: q.testExpression,
          cases: q.criteria.flatMap((c) => c.tests),
        }),
        encoding: 'utf8',
        timeout: 3000,
      },
    ),
  );
  return assess(q, observations);
}
test('every draft variation accepts model code and distinguishes partial repairs and boundary faults', () => {
  for (let i = 0; i < 5; i++) {
    const [delivery, readings] = makePair(i);
    assert.equal(check(delivery, delivery.solution).earned, 6);
    assert.equal(check(delivery, delivery.source).earned, 0);
    assert.equal(check(delivery, delivery.solution.replace('>=', '>')).earned, 2);
    assert.equal(check(delivery, delivery.solution.replace('charge +=', 'charge =')).earned, 4);
    assert.equal(check(readings, readings.solution).earned, 6);
    assert.equal(check(readings, readings.source).earned, 0);
    assert.equal(check(readings, readings.solution.replace('<= reading', '< reading')).earned, 5);
    assert.equal(
      check(readings, readings.solution.replace('readings:', 'set(readings):')).earned,
      3,
    );
    assert.equal(check(readings, 'def count_readings(readings):\n    return True').earned, 0);
    const condition = readings.solution.match(/if (.+):/)[1];
    assert.equal(
      check(
        readings,
        `def count_readings(readings):\n    return sum(1 for reading in readings if ${condition})`,
      ).earned,
      6,
    );
  }
});
test('the three preview configurations grant the intended per-question access', () => {
  assert.deepEqual(
    [0, 1].map((i) => practiceAllowed('mixed', i)),
    [true, false],
  );
  assert.deepEqual(
    [0, 1].map((i) => practiceAllowed('practice', i)),
    [true, true],
  );
  assert.deepEqual(
    [0, 1].map((i) => practiceAllowed('assessment', i)),
    [false, false],
  );
});
