import test from 'node:test';
import assert from 'node:assert/strict';
import {auditHints} from '../scripts/audit-hints.mjs';
import {examQuestion} from '../data/exam-helpers.js';
import {banks} from '../js/bank-data.js';

test('hint validation rejects omissions and known instruction placeholders', () => {
  const variations = [undefined, '   ', 'Answer each part separately. Use a term, value or short sentence as requested.',
    'Use the stated requirement and consider why the alternatives do not meet it.', 'Trace the loop.']
    .map(hint => ({prompt: 'Trace the loop.', hint}));
  assert.equal(auditHints([[{slot: 1, variations}]]).errors.length, variations.length);
  assert.throws(() => examQuestion(1, 'CA1.1', 'Missing hint', []), /author a hint/);
  assert.throws(() => examQuestion(1, 'CA1.1', 'Missing second hint', [], ['Useful', '']), /author a hint/);
});

test('repetition flags different templates without banning useful shared strategies', () => {
  const variation = {prompt: 'Find the total.', hint: 'Track the running total after each addition.'};
  assert.deepEqual(auditHints([[{slot: 1, variations: [variation, variation]}]]), {errors: [], repeated: []});
  const result = auditHints([[{slot: 1, variations: [variation]}, {slot: 2, variations: [variation]}]]);
  assert.equal(result.errors.length, 0);
  assert.deepEqual(result.repeated[0].slots, [1, 2]);
  assert.deepEqual(auditHints(banks).errors, []);
});
