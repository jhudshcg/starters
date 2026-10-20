/** Check the prototype's Python observation contract independently of the browser UI. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('../prototypes/pyscript/', import.meta.url));
function execute(source, expression, cases = [{ label: 'case', inputs: [] }]) {
  return JSON.parse(
    execFileSync(
      'python3',
      [
        '-c',
        'import sys; sys.path.insert(0, sys.argv[1]); from runner import run_cases; print(run_cases(sys.stdin.read()))',
        directory,
      ],
      {
        input: JSON.stringify({ source, expression, cases }),
        encoding: 'utf8',
        timeout: 3000,
      },
    ),
  );
}
test('Python trial captures exact types, output and retry inputs', () => {
  const [result] = execute(
    'def read():\n    print("Ready")\n    return int(input("Value: "))',
    'read()',
    [{ label: 'entry', inputs: ['7'] }],
  );
  assert.equal(result.value, 7);
  assert.equal(result.type, 'int');
  assert.equal(result.consumed, 1);
  assert.equal(result.stdout, 'Ready\nValue: 7\n');
  assert.equal(result.error, null);
});
test('Python trial distinguishes source faults from call faults and exhausted input', () => {
  assert.equal(execute('def broken(:', 'broken()')[0].error.line, 1);
  assert.equal(execute('value = 1', '(')[0].error.line, null);
  assert.equal(execute('def read():\n    return input()', 'read()')[0].error.type, 'EOFError');
  const [name] = execute('def value():\n    return missing', 'value()');
  assert.deepEqual(
    { type: name.error.type, line: name.error.line },
    { type: 'NameError', line: 2 },
  );
});
test('Python trial resets question globals between cases and bounds output', () => {
  const rows = execute('count = globals().get("count",0) + 1', 'count', [
    { label: 'a', inputs: [] },
    { label: 'b', inputs: [] },
  ]);
  assert.deepEqual(
    rows.map((r) => r.value),
    [1, 1],
  );
  const [large] = execute('print("x" * 20000)', 'None');
  assert.equal(large.stdout.length, 12000);
  assert.equal(large.error.type, 'OutputLimit');
});
