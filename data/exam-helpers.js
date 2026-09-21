// Each item has two authored scenarios. Coverage belongs to the item, not its title.
export function item(coverage, first, second, explanation, extra = {}) {
  const links = Object.entries(coverage).map(([focus, elements]) => ({focus: `CA${focus}`, elements: elements.split(',')}));
  return [first, second].map(([prompt, answer, accepted = [], overrides = {}]) => ({
    prompt, answer: String(answer), accepted, marks: 1, kind: 'text',
    coverage: links, explanation, allowSentence:true, ...extra, ...overrides
  }));
}
export function examQuestion(slot, focus, title, items, hint) {
  const hints = Array.isArray(hint) ? hint : [hint, hint];
  if (hints.length !== 2 || hints.some(value => typeof value !== 'string' || !value.trim())) {
    throw new Error(`Exam slot ${slot}: author a hint for both variations`);
  }
  return {
    slot, focus, title, format: 'Short-answer practice', reviewStatus: 'teacher-review-pending',
    tags: [...new Set(items.flatMap(pair => pair.flatMap(p => p.coverage.map(c => c.focus))))],
    variations: [0, 1].map(i => ({
      prompt: 'Give a short answer for each part.', hint: hints[i],
      parts: items.map((pair, index) => ({id: String(index), ...pair[i]}))
    }))
  };
}
