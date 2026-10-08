/**
 * Purpose: preserve puzzle checks for readable and packed application banks.
 * Main contents: rule exports and the packed Go adapter. Used by: marking and controls.
 * Uses: shared challenge rules and packed-data. Libs: none directly.
 */
export * from '../packages/puzzles/rules/challenge-rules.js';
import {markChallenge as mark} from '../packages/puzzles/rules/challenge-rules.js';
import {playTree} from './packed-data.js';
export const markChallenge = (part, raw) => mark(
  part.kind === 'go' ? {...part, tree: playTree(part)} : part, raw
);
