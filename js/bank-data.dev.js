/**
 * Purpose: Load readable question banks on demand in the development browser.
 * Main contents: the same banks/ensureBank contract as the production loader.
 * Used by: Vite's development replacement for bank-data.js. Uses: authored banks.
 * Libs: native dynamic imports deduplicate module loading and retain Vite content updates.
 */
const loaders = [
  () => import('../data/puzzles.js'),
  () => import('../data/exam.js'),
  () => import('../data/python.js'),
  () => import('../data/esp.js'),
];
export const banks = loaders.map(() => null);

export async function ensureBank(type) {
  if (!Number.isInteger(type) || !loaders[type]) throw Error('Unknown activity type.');
  return banks[type] ?? (banks[type] = (await loaders[type]()).default);
}
