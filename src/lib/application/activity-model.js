/**
 * Purpose: Derive activity selection availability without rendering or mutating attempts.
 * Main contents: filters and alternative-set availability.
 * Used by: Activity. Uses: bank/search rules. Libs: none.
 */
import { matchingSearchGroup } from '#domain/search-sets.js';
import { chooseSearchEntries } from '#domain/search.js';
import {
  banks,
  puzzlePool,
  nextExamSubtopic,
  matchesSubtopic,
  hasAlternativeExamSet,
} from '#domain/bank.js';

export function activityModel(set, a, data) {
  const level = set.type === 0 ? (data.puzzleChallenge ?? 'all') : 'all';
  const subtopic = set.type === 1 ? (a.examSubtopic ?? 'all') : 'all';
  const mathsTopic =
    set.type === 0 && set.focus === 'classic maths' ? (a.mathsTopic ?? 'all') : 'all';
  const inSequence = set.type === 1 && Boolean(a.inSequence);
  const nextSubtopic = inSequence ? nextExamSubtopic(set.focus, subtopic) : null;
  const matchingQuestions =
    subtopic === 'all'
      ? 0
      : set.questions.filter((q) => q.parts.some((p) => matchesSubtopic(p, subtopic))).length;
  const searchGroup = matchingSearchGroup(set);
  const searchAlternatives = searchGroup
    ? Boolean(chooseSearchEntries(searchGroup, { previous: set, random: null }))
    : false;
  const searchPermutation = searchGroup
    ? Boolean(
        chooseSearchEntries(searchGroup, {
          previous: set,
          mode: 'permutation',
          random: null,
        }),
      )
    : false;
  const sameFocusAlternatives =
    set.type === 1
      ? hasAlternativeExamSet(set, subtopic)
      : (set.type === 0
          ? puzzlePool(set.focus, level, mathsTopic)
          : banks[set.type].filter((q) => q.focus === set.focus && !q.retired)
        ).length > set.questions.length;

  return {
    level,
    subtopic,
    mathsTopic,
    inSequence,
    nextSubtopic,
    matchingQuestions,
    searchGroup,
    searchAlternatives,
    searchPermutation,
    sameFocusAlternatives,
  };
}
