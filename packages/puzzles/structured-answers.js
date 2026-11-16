/**
 * Purpose: Parse and update checkbox sets and ordered numeric fields consistently.
 * Main contents: safe array parsing, numeric parsing and DOM input conversion.
 * Used by: puzzle rendering, evaluation, player and application host.
 * Uses: none. Libs: none.
 */
export function answerArray(raw) {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** Accept ordinary decimal numbers and correctly grouped thousands, never expressions. */
export function numericAnswer(raw, thousands = false) {
  const text = String(raw ?? '').trim();
  const pattern = thousands
    ? /^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$|^[+-]?\.\d+$/
    : /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;
  return pattern.test(text) ? Number(text.replaceAll(',', '')) : null;
}

/** Preserve sibling fields when one input changes; values stay serialisable strings. */
export function inputAnswer(input, previous) {
  if (input.type === 'checkbox') {
    const values = answerArray(previous).filter((value) => value !== input.value);
    if (input.checked) values.push(input.value);
    return JSON.stringify(values);
  }
  if (input.dataset.field !== undefined) {
    const values = answerArray(previous);
    values[Number(input.dataset.field)] = input.value;
    return JSON.stringify(values);
  }
  return input.value;
}

/** Update values in place so typing never replaces an input or its caret. */
export function syncInput(input, answer) {
  if (input.type === 'checkbox') input.checked = answerArray(answer).includes(input.value);
  else if (input.type === 'radio') input.checked = input.value === answer;
  else {
    const value =
      input.dataset.field === undefined
        ? answer
        : (answerArray(answer)[Number(input.dataset.field)] ?? '');
    if (input.value !== String(value)) input.value = value;
  }
}
