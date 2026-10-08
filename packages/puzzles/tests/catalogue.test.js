/**
 * Purpose: validate the portable catalogue and its independently usable rules.
 * Main contents: identity, metadata, rank, model-answer and invalid-answer checks.
 * Used by: node --test. Uses: catalogue and rules. Libs: Node test/assert.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import puzzles from '../catalogue.js';
import {challengeBands, puzzleTypes, bandForGoRank} from '../metadata.js';
import {challengeKinds, markChallenge} from '../rules/challenge-rules.js';
import {markAlgebra} from '../rules/algebra-answer.js';

test('catalogue has unique permanent identities and complete family metadata', () => {
  assert.equal(new Set(puzzles.map(q => q.id)).size, puzzles.length);
  for (const question of puzzles) {
    assert.ok(puzzleTypes.some(type => type.id === question.type && type.instructions && type.guidance));
    assert.ok(challengeBands.some(band => band.level === question.challenge));
    assert.equal(question.setSize, undefined);
    assert.equal(question.challengeLevel, undefined);
    assert.ok(question.tags.every(tag => !tag.startsWith('challenge:')));
    assert.equal(new Set(question.variations.map(v => v.id)).size, question.variations.length);
    for (const variation of question.variations) {
      assert.ok(variation.prompt && variation.hint);
      assert.ok(variation.parts.every(part => part.answer !== undefined && part.explanation));
    }
  }
  for (const type of puzzleTypes) for (const link of type.links) assert.equal(new URL(link.url).protocol, 'https:');
});

test('Go keeps individual kyu ranks, separately from broad challenge bands', () => {
  for (const question of puzzles.filter(q => q.type === 'go')) {
    assert.deepEqual(question.rank, {value: question.sourceRank, unit: 'kyu'});
    assert.equal(question.challenge, bandForGoRank(question.rank.value));
    assert.ok(question.source?.url);
  }
  assert.deepEqual([30, 25, 24, 18, 17, 12, 11, 1].map(bandForGoRank), [1, 1, 2, 2, 3, 3, 4, 4]);
  assert.throws(() => bandForGoRank(NaN));
});

test('shared board rules accept every recorded solution and reject empty state', () => {
  for (const question of puzzles) for (const variation of question.variations) {
    for (const part of variation.parts.filter(part => challengeKinds.includes(part.kind))) {
      assert.equal(markChallenge(part, part.answer).earned, part.marks, `${question.id}/${variation.id}`);
      assert.equal(markChallenge(part, '{}').earned, 0, `${question.id}/${variation.id}`);
    }
  }
});

test('shared algebra rules preserve partial credit and exact comparison', () => {
  const part = {answer: '2x+3', algebraForm: 'simplified', variables: ['x'], marks: 2, equivalentMarks: 1};
  assert.equal(markAlgebra('3+2x', part).correct, true);
  assert.equal(markAlgebra('x+x+3', part).earned, 1);
  assert.equal(markAlgebra('2x+4', part).correct, false);
});
