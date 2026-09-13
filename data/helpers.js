export function part(prompt, answer, extra = {}) {
  return {prompt, answer: String(answer), marks: 1, kind: 'text', explanation: `The answer is ${answer}.`, ...extra};
}
export const number = (prompt, answer, extra = {}) => part(prompt, answer, {kind: 'number', ...extra});
export const choice = (prompt, answer, options, extra = {}) => part(prompt, answer, {kind: 'choice', options: options.map(String), ...extra});
export function question(slot, focus, title, format, tags, make) {
  return {slot, focus, title, format, tags, variations: Array.from({length: 5}, (_, i) => {
    const v = make(i);
    return {hint: 'Work through one step at a time.', ...v, parts: v.parts.map((p, index) => ({id: String(index), ...p}))};
  })};
}
