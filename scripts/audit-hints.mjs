import {pathToFileURL} from 'node:url';

const normalise = text => typeof text === 'string' ? text.trim().replace(/\s+/g, ' ').toLowerCase() : '';
const placeholders = new Set([
  'Answer each part separately. Use a term, value or short sentence as requested.',
  'Use the stated requirement and consider why the alternatives do not meet it.'
].map(normalise));

// Structural checks expose omissions/repetition; editorial review judges usefulness.
export function auditHints(banks) {
  const errors = [], groups = new Map();
  banks.forEach((bank, type) => {
    for (const question of bank) for (const [index, variation] of question.variations.entries()) {
      const hint = normalise(variation.hint), address = `${type}:${question.slot}:${index}`;
      if (!hint || placeholders.has(hint) || hint === normalise(variation.prompt)) {
        errors.push(`${address}: missing, placeholder or instruction-only hint`);
      }
      const key = `${type}:${hint}`;
      if (!groups.has(key)) groups.set(key, {type, hint: variation.hint, slots: new Set()});
      groups.get(key).slots.add(question.slot);
    }
  });
  const repeated = [...groups.values()].filter(group => group.slots.size > 1)
    .map(group => ({...group, slots: [...group.slots]}));
  return {errors, repeated};
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const {banks} = await import('../js/bank-data.js');
  const {errors, repeated} = auditHints(banks);
  for (const error of errors) console.error(error);
  for (const group of repeated) console.log(`Review type ${group.type}, slots ${group.slots.join(',')}: ${group.hint}`);
  console.log(`${errors.length} hint errors; ${repeated.length} repeated-hint groups for editorial review (same-template variations excluded).`);
  if (errors.length) process.exitCode = 1;
}
