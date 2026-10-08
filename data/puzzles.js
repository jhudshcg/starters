/**
 * Purpose: adapt the shared puzzle catalogue to this app's existing bank contract.
 * Main contents: legacy slots, variation order, challenge labels and set policy.
 * Used by: bank-data and content tooling. Uses: shared puzzle library. Libs: none.
 */
import catalogue from '../packages/puzzles/catalogue.js';
import {challengeBands} from '../packages/puzzles/metadata.js';

export default catalogue.map(question => {
  const {id, legacySlot, type, challenge, rank, variations, tags, ...content} = question;
  const challengeLevel = challengeBands.find(band => band.level === challenge).key;
  return {
    ...content, slot: legacySlot, focus: type, setSize: 3, challengeLevel,
    tags: [...new Set([...tags, `challenge:${challengeLevel}`])],
    variations: variations.map(({id, ...variation}) => variation)
  };
});
