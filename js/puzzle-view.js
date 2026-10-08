/**
 * Purpose: adapt packed puzzle parts for package rendering at the parent's request.
 * Main contents: part/reveal delegates. Used by: app question cards.
 * Uses: package renderer and app data decoders. Libs: none.
 */
import {renderPart,renderSolutionPart} from '../packages/puzzles/ui/render.js';
import {playTree,revealPart} from './packed-data.js';
const playable=part=>part.playData?{...part,tree:playTree(part)}:part;
export const puzzlePartHTML=(part,answer,options)=>renderPart(playable(part),answer,options);
export const puzzleSolutionHTML=(part,index,slot)=>renderSolutionPart(playable(revealPart(part)),index,slot);
