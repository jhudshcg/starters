/**
 * Purpose: decode this app's packed Go trees before using shared Go rules.
 * Main contents: Go play, hint and marking adapters. Used by: Go controls and tests.
 * Uses: packed-data and shared Go rules. Libs: none directly.
 */
import * as rules from '../packages/puzzles/rules/go-rules.js';
import {playTree} from './packed-data.js';
const unpackPart = part => ({...part, tree: playTree(part)});
export const goPosition = (part, moves) => rules.goPosition(unpackPart(part), moves);
export const playGo = (part, state, move) => rules.playGo(unpackPart(part), state, move);
export const nextGoHint = (part, state) => rules.nextGoHint(unpackPart(part), state);
export const markGo = (part, state) => rules.markGo(unpackPart(part), state);
export const goCoordinate = rules.goCoordinate;
