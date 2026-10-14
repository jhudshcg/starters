/**
 * Purpose: Select practice sets constrained by search matches.
 *
 * Main contents: matchingSearchGroup and makeSearchSet
 *
 * Used by: Search.svelte and application/practice.js.
 * Uses: bank and search selection.
 * Libs: none.
 */
import { banks, focusNames, espRecipeNames, resolve } from './bank.js';
import { searchGroups, chooseSearchEntries, cleanSearchQuery } from './search.js';
import { BANK_VERSION } from './codes.js';
export function matchingSearchGroup(set) {
  return set.search
    ? searchGroups(banks[set.type], set.type, set.search.query, {
        focusNames,
        recipeNames: espRecipeNames,
      }).find((g) => g.key === set.search.group)
    : null;
}
export function makeSearchSet(group, query, { previous = null, mode = 'new' } = {}) {
  const selection = chooseSearchEntries(group, { previous, mode });
  if (!selection)
    throw Error(
      mode === 'permutation'
        ? 'No other permutation keeps these search matches. Choose another topic or broaden your search.'
        : 'No other question combination keeps these search matches. Try a new permutation or broaden your search.',
    );
  return {
    ...resolve({
      version: BANK_VERSION,
      type: group.type,
      entries: selection.entries,
      minutes: previous?.minutes ?? null,
    }),
    search: { query: cleanSearchQuery(query), group: group.key },
  };
}
