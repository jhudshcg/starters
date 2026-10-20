/** Trial cases: one real Task 2 function plus original library exercises.
 * Used by trial.js; authored checks stay separate from executable student source.
 */
import task2 from '../../data/esp-task2.js';
const workshop = task2[0].variations[0];
export const questions = [
  {
    id: 'workshop',
    title: 'ESP Task 2 · Test a workshop selection',
    requirements: workshop.requirements,
    source: workshop.code,
    expression: 'read_workshop()',
    inputs: ['8'],
    regions: [
      {
        id: 'condition',
        label: 'if condition',
        text: '1 <= value < 8',
        choices: ['1 <= value < 8', '1 <= value <= 8', '1 < value < 8'],
      },
      {
        id: 'exception',
        label: 'exception handler',
        text: 'except TypeError:',
        choices: ['except TypeError:', 'except ValueError:'],
      },
    ],
    tests: [
      ...['1', '4', '8'].map((value) => ({
        label: `Valid input ${value}`,
        inputs: [value],
        expected: Number(value),
        type: 'int',
        consumed: 1,
      })),
      ...['0', '9', '20', 'abc', '2.5'].map((value) => ({
        label: `Invalid ${value}, then 4`,
        inputs: [value, '4'],
        expected: 4,
        type: 'int',
        consumed: 2,
      })),
    ],
  },
  {
    id: 'random',
    title: 'Programming · Roll a six-sided die',
    requirements: [
      'roll_die() must return an integer from 1 to 6 inclusive.',
      'Use Python’s random library. Test repeated rolls against the required bounds.',
    ],
    source:
      'import random\n\ndef roll_die():\n    result = random.randint(1, 7)\n    return result',
    expression: 'roll_die()',
    inputs: [],
    regions: [
      {
        id: 'roll',
        label: 'random expression',
        text: 'random.randint(1, 7)',
        choices: ['random.randint(1, 7)', 'random.randint(1, 6)', 'random.randint(0, 6)'],
      },
    ],
    tests: Array.from({ length: 20 }, (_, seed) => ({
      label: `Seed ${seed}`,
      inputs: [],
      seed,
      minimum: 1,
      maximum: 6,
      type: 'int',
      consumed: 0,
    })),
  },
  {
    id: 'data',
    title: 'Library trial · Summarise sales and plot totals',
    packages: ['pandas', 'matplotlib'],
    requirements: [
      'Calculate each row’s revenue as quantity × price.',
      'Return total revenue as a float and display a labelled bar chart by product.',
    ],
    source:
      'import pandas as pd\nimport matplotlib.pyplot as plt\n\ndef sales_total():\n    sales = pd.DataFrame({\n        "product": ["Notebook", "Pen", "Notebook"],\n        "quantity": [2, 3, 1],\n        "price": [4.0, 1.5, 4.0]\n    })\n    sales["revenue"] = sales["quantity"] * sales["price"]\n    totals = sales.groupby("product")["revenue"].sum()\n    totals.plot.bar()\n    plt.ylabel("Revenue (£)")\n    plt.title("Revenue by product")\n    plt.tight_layout()\n    plt.show()\n    return float(sales["revenue"].sum())',
    expression: 'sales_total()',
    inputs: [],
    regions: [
      {
        id: 'revenue',
        label: 'revenue expression',
        text: 'sales["quantity"] * sales["price"]',
        choices: ['sales["quantity"] * sales["price"]', 'sales["quantity"] + sales["price"]'],
      },
    ],
    tests: [{ label: 'Supplied sales', inputs: [], expected: 16.5, type: 'float', consumed: 0 }],
  },
];
