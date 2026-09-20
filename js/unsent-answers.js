import {challengeKinds,stateOf} from './challenge-rules.js';
export function hasUnsubmittedAnswers(attempt,set){
  if(!attempt||attempt.finished||!set)return false;
  return set.questions.some(q=>q.parts.some(p=>{
    const raw=attempt.answers?.[q.slot]?.[p.id];
    if(!challengeKinds.includes(p.kind))return String(raw??'').trim().length>0;
    const s=stateOf(raw,p);
    if(['logic-grid','equation-grid'].includes(p.kind))return Boolean(s.excluded?.length||s.values?.some(row=>row.some(v=>Number.isInteger(v)&&v>=0)));
    if(['sudoku','cage-grid'].includes(p.kind))return Boolean(s.values?.some((v,i)=>!p.givens[i]&&v>0)||Object.values(s.notes??{}).some(notes=>notes.length));
    if(p.kind==='cover-path')return Boolean(s.path?.length);
    if(p.kind==='tiling')return Boolean(s.placements?.some(Boolean));
    if(p.kind==='go')return Boolean(s.moves?.length||Number.isInteger(s.pending));
    return false;
  }));
}
