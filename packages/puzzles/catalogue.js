/**
 * Purpose: expose reusable puzzle content without application codes or set policy.
 * Main contents: catalogue, stable question/variation IDs and numeric challenge bands.
 * Used by: consuming applications and library validation.
 * Uses: authored family data and challenge metadata. Libs: none.
 */
import {challengeBands, bandForGoRank} from './metadata.js';
import logic from './data/logic-grids.js';
import equations from './data/logic-equations.js';
import tangrams from './data/tangrams.js';
import paths from './data/cover-paths.js';
import sudoku from './data/sudoku.js';
import numbers from './data/number-constraints.js';
import sequences from './data/sequences.js';
import classics from './data/classic-maths.js';
import go from './data/go.js';
import sequenceBeginner from './data/sequences-beginner.js';
import mathsApplied from './data/maths-applied.js';
import mathsReasoningStretch from './data/maths-reasoning-stretch.js';
import sequenceMore from './data/sequences-more.js';
import mathsMore from './data/maths-more.js';
import mathsPractice from './data/maths-practice.js';
import mathsBeginner from './data/maths-beginner.js';
import sequencesEnriched from './data/sequences-enriched.js';

/** Normalise authored records; IDs and variation positions must never be reused. */
export default [...logic,...equations,...tangrams,...paths,...sudoku,...numbers,...sequences,...classics,...go,...sequenceMore,...mathsMore,...mathsPractice,...mathsBeginner,...sequencesEnriched,...sequenceBeginner,...mathsApplied,...mathsReasoningStretch].map(question => {
  const {slot, focus, setSize, challengeLevel, tags, variations, ...content} = question;
  const rank = focus === 'go'
    ? (question.sourceRank ?? (slot === 175 ? 25 : Number(question.source?.note.match(/(\d+) kyu/)?.[1])))
    : null;
  if (focus === 'go' && !Number.isFinite(rank)) throw Error(`Missing Go source rank for slot ${slot}`);
  const challenge = rank !== null ? bandForGoRank(rank)
    : challengeBands.find(band => band.key === (challengeLevel ?? 'standard'))?.level;
  if (!challenge) throw Error(`Unknown challenge band for slot ${slot}`);
  return {
    ...content,
    id: `puzzle-${slot}`,
    legacySlot: slot,
    type: focus,
    challenge,
    tags: tags.filter(tag => !tag.startsWith('challenge:')),
    ...(rank !== null ? {sourceRank: rank, rank: {value: rank, unit: 'kyu'}} : {}),
    variations: variations.map((variation, index) => ({...variation, id: `v${index}`}))
  };
});
