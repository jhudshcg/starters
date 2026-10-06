import {question as q, part as p, number as n, choice as c} from './helpers.js';
const token = (prompt, answer, extra = {}) => p(prompt, answer, {kind: 'code', ...extra});

// Simplified versions retain the original question and variation identities.
export default [
  q(54, 'arrays', 'Read and update an array', 'Predict the output',
    ['CA2.3.2', 'arrays', 'indexing'], i => {
      const a = i + 3;
      return {
        prompt: 'This array of readings is represented by a Python list. Trace the update, then answer the questions.',
        code: `readings = [${a}, ${a + 2}, ${a + 4}]\nreadings[1] += 1\nprint(readings[0], readings[1], readings[2])`,
        hint: 'Write an index above each item. An update changes only the item at the selected index.',
        parts: [
          n('Printed value 1', a), n('Printed value 2', a + 3),
          n('Printed value 3', a + 4), n('Value of len(readings)', 3),
          n('Highest valid non-negative index', 2),
          c('Would readings[3] access an existing item?', 'No', ['Yes', 'No'],
            {explanation: 'There are three items, at indices 0, 1 and 2. Index 3 is outside this list.'})
        ]
      };
    }),
  q(34, 'input output', 'Read two lines from a file', 'Complete the code',
    ['CA2.5.2', 'CA2.5.3', 'input output', 'files'], i => {
      const a = i + 3;
      return {
        prompt: `readings.txt contains two lines: ${a} on the first and 8 on the second, each ending with a newline. Complete the code to read the first line and remove its newline. Predict the five printed values.`,
        code: 'file = open("readings.txt", "r")\nfirst = ___\nrest = file.read().strip()\nat_end = file.read() == ""\nfile.close()\nprint(\n    first, rest, int(first) + int(rest),\n    len(first), at_end\n)',
        hint: 'Reading moves through the file. Track what remains after the first line has been read; strip removes surrounding whitespace.',
        parts: [
          token('Expression for ___', 'file.readline().strip()'),
          p('Printed value 1', a), p('Printed value 2', '8'),
          n('Printed value 3', a + 8), n('Printed value 4', 1),
          p('Printed value 5', 'True', {caseSensitive: true,
            explanation: 'A read at the end of the file returns an empty string.'})
        ]
      };
    }),
  q(35, 'input output', 'Replace a saved identifier', 'Fix the code',
    ['CA2.5.2', 'CA2.5.5', 'input output', 'files'], i => {
      const identifier = `ID${i + 3}`;
      return {
        prompt: `identifier.txt currently contains OLD with no newline. The program must replace it with ${identifier}. Repair the opening mode, then predict the five printed values of the corrected program.`,
        code: `file = open("identifier.txt", "a")\nfile.write("${identifier}")\nfile.close()\nfile = open("identifier.txt", "r")\ntext = file.read()\nat_end = file.read() == ""\nfile.close()\nprint(text, len(text), text[0], text[-1], at_end)`,
        hint: 'Decide whether the old file contents should remain. Close the written file before opening it again to read.',
        parts: [
          p('Replacement for a in the first opening mode (one letter)', 'w', {caseSensitive: true,
            explanation: 'Mode w replaces the old contents; mode a adds to the end.'}),
          p('Printed value 1 (without quotes)', identifier, {caseSensitive: true}),
          n('Printed value 2', 3), p('Printed value 3', 'I', {caseSensitive: true}),
          p('Printed value 4', i + 3), p('Printed value 5', 'True', {caseSensitive: true,
            explanation: 'The first read consumes all the text. The next read returns an empty string.'})
        ]
      };
    })
].map(question => ({...question, reviewStatus: 'teacher-review-pending'}));
