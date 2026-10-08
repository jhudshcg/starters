/**
 * Purpose: distinguish puzzle work from selection and undo metadata.
 * Main contents: hasAnswer. Used by: parent navigation policy and player.
 * Uses: shared board state reader. Libs: none.
 */
import {challengeKinds,stateOf} from './rules/challenge-rules.js';
export function hasAnswer(p,raw){
    
    if(!challengeKinds.includes(p.kind))return String(raw??'').trim().length>0;
    const s=stateOf(raw,p);
    if(['logic-grid','equation-grid'].includes(p.kind))return Boolean(s.excluded?.length||s.values?.some(row=>row.some(v=>Number.isInteger(v)&&v>=0)));
    if(['sudoku','cage-grid'].includes(p.kind))return Boolean(s.values?.some((v,i)=>!p.givens[i]&&v>0)||Object.values(s.notes??{}).some(notes=>notes.length));
    if(p.kind==='cover-path')return Boolean(s.path?.length);
    if(p.kind==='tiling')return Boolean(s.placements?.some(Boolean));
    if(p.kind==='go')return Boolean(s.moves?.length||Number.isInteger(s.pending));
    return false;
}
