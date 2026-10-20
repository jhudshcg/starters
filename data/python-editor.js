/**
 * Purpose: Embed bounded completion/repair answers in the shared Python editor.
 * Main contents: explicit repair locations, blank regions and prediction-first parts.
 * Used by: python.js. Uses: authored variations. Libs: none.
 */
const repairs = {
  1: /\+=/, 4: /\bor\b/, 6: /print\(amount \* \d+\)/,
  11: /        return -1/, 14: /value \/= 2/, 17: /round\(-value\)/,
  20: /row\.split\(":"\)/, 23: /grid\[0\]\[1\] \+= grid\[0\]\[0\]/,
  26: /count, name, active = record/, 29: /(?<=print\(a == b, )a == b/,
  32: /values\[index\] == -1/, 38: /len\(text\) == 3 or text\.isdigit\(\)/,
  41: /if values:/, 44: /values\.sort\(\)/, 47: /value \+ 2/,
  50: /start=0/, 53: /minutes \+ SECONDS_PER_MINUTE/, 55: /len\(counts\)/,
  58: />/, 62: /\/\//, 35: /(?<=identifier.txt", ")a/,
  64: /append/, 68: /(?<=while low )</, 71: /\+=/,
};
const predictionParts = {
  1: [1,2,3,4], 2: [3,4], 4: [1,2,3], 5: [3,4,5], 6: [2,3],
  8: [1,2,3,4], 10: [1,2,3,4], 11: [2,3,4,5],
  16: [1,2,3,4,5], 26: [1,2,3,4], 52: [1,2], 53: [1,2],
  55: [1,2,3], 56: [1,2,3], 58: [1,2,3,4], 59: [1,2,3,4],
  61: [1,2,3,4,5], 62: [1,2,3,4], 64: [1,2,3,4], 65: [1,2,3,4],
  67: [1,2,3,4,5], 68: [1,2,3,4],
};

/** Adapt only the explicitly scoped completion/repair formats, preserving question identities. */
export function editorQuestions(bank) {
  return bank.map((template) => {
    if (!['Complete the code', 'Fix the code'].includes(template.format)) return template;
    return { ...template, liveCoding: true, variations: template.variations.map((v) => adapt(template.slot, v)) };
  });
}

/** Locate each region once in authored code; offsets remove ambiguity between identical gaps. */
function adapt(slot, variation) {
  const v = structuredClone(variation);
  if (slot === 2) v.code = 'START = ___\nSTOP = ___\n' + v.code;
  const matches = repairs[slot]
    ? [...v.code.matchAll(new RegExp(repairs[slot].source, 'g'))].slice(0, 1)
    : [...v.code.matchAll(/___/g)];
  if (!matches.length) throw Error(`Missing editor region for Python ${slot}`);
  const ids = slot === 2 ? ['1', '2', '0'] : matches.map((_, i) => String(i));
  let offset = 0;
  const regions = matches.map((match, i) => {
    const p = v.parts.find((p) => p.id === ids[i]);
    const text = repairs[slot] ? match[0] : '';
    const from = match.index + offset;
    v.code = v.code.slice(0, from) + text + v.code.slice(from + match[0].length);
    offset += text.length - match[0].length;
    p.editorRegion = p.id;
    p.prompt = p.prompt.replaceAll('___', 'the highlighted gap');
    // This part now assesses the line itself, including its indentation.
    if (slot === 11) {
      p.id = 'return-line';
      p.editorRegion = p.id;
      p.answer = '    return -1';
      p.prompt = 'Move the final return to the correct indentation in the editor.';
      p.kind = 'code';
      p.exactWhitespace = true;
      delete p.options;
    }
    return { id: p.editorRegion, label: p.prompt, from, text, choices: [] };
  });
  if ([13,17,29].includes(slot))
    for (const p of v.parts.filter((p) => !p.editorRegion))
      p.prompt = p.prompt.replace(/ \(.*\)(?= — no quotes)/, '');
  if (slot === 56) v.parts[4].prompt = 'Before appending, would assigning to readings[2] add a new item?';
  v.livePython = {
    revision: 2, access: 'practice', actions: ['run'], modes: ['regions'], regions,
    embedded: true,
    predictions: (predictionParts[slot] ?? [1,2,3,4,5]).map(String),
    rethink: 'Trace the corrected code one step at a time. Write down how each value changes, then reconsider your predictions.',
    expression: /^def /m.test(v.code) && !/^print\(/m.test(v.code) ? '' : 'None',
    fixtures: slot === 34 ? { 'readings.txt': `${v.parts[1].answer}\n8\n` }
      : slot === 35 ? { 'identifier.txt': 'OLD' } : {},
  };
  v.prompt += ' Complete the marked code and enter your predictions before running. You can then compare them with the output.';
  return v;
}
