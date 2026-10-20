/** Purpose: Supply the review draft's two programming questions and five variations.
 * Main contents: requirements, editor choices, independent test cases and model code.
 * Used by: pilot.js and focused verification. Uses: the existing trial runner protocol.
 * Libs: none. This draft is not imported by the production question bank.
 */
export const configurations = {
  mixed: 'Practice then assessment',
  practice: 'All practice',
  assessment: 'All assessed',
};
export const practiceAllowed = (configuration, index) =>
  configuration === 'practice' || (configuration === 'mixed' && index === 0);

function test(label, args, expected) {
  return { label, inputs: [JSON.stringify(args)], expected, type: 'int' };
}
export function makePair(variation = 0) {
  const [limit, fee, extra] = [
    [30, 4, 3],
    [25, 5, 2],
    [40, 3, 4],
    [50, 6, 3],
    [20, 4, 5],
  ][variation];
  const [low, high] = [
    [1, 8],
    [10, 20],
    [-5, 5],
    [0, 100],
    [3, 12],
  ][variation];
  const source = `def delivery_cost(order_total, express):
    if order_total > ${limit}:
        charge = 0
    else:
        charge = ${fee}
    if express:
        charge = ${extra}
    return order_total`;
  return [
    {
      id: 'delivery',
      title: 'Repair the delivery charge',
      level: 'Guided repair',
      prompt:
        'Repair the function so it meets all three requirements. Return the delivery charge as a whole number of pounds.',
      requirements: [
        `Ordinary delivery costs £${fee} when the order total is below £${limit}.`,
        `Ordinary delivery is free when the order total is £${limit} or more.`,
        `Express delivery adds £${extra} to the ordinary delivery charge, including when ordinary delivery is free.`,
      ],
      assumptions:
        'order_total is a non-negative integer. express is True or False. Input validation is not required.',
      source,
      modes: ['choices', 'regions'],
      actions: ['run', 'check'],
      testExpression: 'delivery_cost(*__import__("json").loads(input()))',
      regions: [
        {
          id: 'threshold',
          label: 'condition',
          text: `order_total > ${limit}`,
          choices: [`order_total > ${limit}`, `order_total >= ${limit}`, `order_total <= ${limit}`],
        },
        {
          id: 'express',
          label: 'charge update',
          text: `charge = ${extra}`,
          choices: [`charge = ${extra}`, `charge -= ${extra}`, `charge += ${extra}`],
        },
        {
          id: 'return',
          label: 'return statement',
          text: 'return order_total',
          choices: ['return order_total', 'return charge', 'return express'],
        },
      ],
      criteria: [
        {
          label: 'Ordinary delivery below the threshold',
          marks: 2,
          tests: [0, limit - 5, limit - 1].map((n) =>
            test(`Order £${n}, ordinary`, [n, false], fee),
          ),
        },
        {
          label: 'Free ordinary delivery at and above the threshold',
          marks: 2,
          tests: [limit, limit + 1, limit * 2].map((n) =>
            test(`Order £${n}, ordinary`, [n, false], 0),
          ),
        },
        {
          label: 'Express adds to the applicable ordinary charge',
          marks: 2,
          tests: [
            test('Express below threshold', [limit - 1, true], fee + extra),
            test('Express at threshold', [limit, true], extra),
            test('Express above threshold', [limit + 1, true], extra),
          ],
        },
      ],
      solution: source
        .replace(`order_total > ${limit}`, `order_total >= ${limit}`)
        .replace(`charge = ${extra}`, `charge += ${extra}`)
        .replace('return order_total', 'return charge'),
      explanation:
        'Include the threshold in the free-delivery condition. Add the express amount to the existing charge, then return that charge.',
    },
    {
      id: 'readings',
      title: 'Count readings within a range',
      level: 'Function writing',
      prompt: `Write count_readings(readings). It must return how many readings are from ${low} to ${high}, inclusive.`,
      requirements: [
        `Count both boundary values (${low} and ${high}) and every value between them.`,
        'Count repeated qualifying readings separately. Ignore values outside the range.',
        'Return an integer count. An empty list must return 0.',
      ],
      assumptions:
        'readings is a list of integers. Input validation and a particular Python construct are not required.',
      source: 'def count_readings(readings):\n    pass',
      modes: ['free'],
      actions: ['check'],
      regions: [],
      testExpression: 'count_readings(__import__("json").loads(input()))',
      criteria: [
        {
          label: 'Count ordinary qualifying readings',
          marks: 1,
          tests: [
            test('One reading', [low + 1], 1),
            test('Several readings', [low + 1, high - 1, low + 2], 3),
          ],
        },
        {
          label: 'Count repeated readings separately',
          marks: 1,
          tests: [
            test('Repeated reading', [low + 1, low + 1, low + 1], 3),
            test('Mixed repeated readings', [high - 1, low + 1, high - 1], 3),
          ],
        },
        {
          label: 'Include the lower boundary',
          marks: 1,
          tests: [test('Lower boundary', [low], 1), test('Repeated lower boundary', [low, low], 2)],
        },
        {
          label: 'Include the upper boundary',
          marks: 1,
          tests: [
            test('Upper boundary', [high], 1),
            test('Repeated upper boundary', [high, high], 2),
          ],
        },
        {
          label: 'Exclude readings outside the range',
          marks: 1,
          tests: [
            test('Only outside readings', [low - 1, high + 1, low - 10, high + 10], 0),
            test('Mixed readings', [low - 1, low + 1, high + 1], 1),
          ],
        },
        { label: 'Return zero for an empty list', marks: 1, tests: [test('Empty list', [], 0)] },
      ],
      solution: `def count_readings(readings):
    count = 0
    for reading in readings:
        if ${low} <= reading <= ${high}:
            count += 1
    return count`,
      explanation:
        'Start the count at zero. Add one for each reading inside the inclusive range, then return the count after considering the whole list. Other implementations can also meet the requirements.',
    },
  ];
}

/** Group multiple observations under each authored requirement, not one mark per test. */
export function assess(question, observations) {
  let offset = 0;
  const criteria = question.criteria.map((criterion) => {
    const results = observations.slice(offset, offset + criterion.tests.length);
    offset += criterion.tests.length;
    const passed =
      results.length === criterion.tests.length &&
      results.every(
        (result, i) =>
          !result.error && result.type === 'int' && result.value === criterion.tests[i].expected,
      );
    return { label: criterion.label, earned: passed ? criterion.marks : 0, max: criterion.marks };
  });
  return {
    criteria,
    earned: criteria.reduce((total, c) => total + c.earned, 0),
    max: criteria.reduce((total, c) => total + c.max, 0),
    error: observations.find((result) => result.error)?.error ?? null,
  };
}
