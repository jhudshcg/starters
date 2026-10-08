/**
 * Purpose: adapt packed app questions to shared marking, retaining non-puzzle checks.
 * Main contents: question result assembly and Excel/code/identifier handling.
 * Used by: submission, review and validation. Uses: package evaluator and app decoders.
 * Libs: none directly.
 */
import {markExcel} from './excel-answer.js';
import {markingPart,playTree} from './packed-data.js';
import {sameCode} from './code-answer.js';
import {markPart} from '../packages/puzzles/evaluation.js';
export function markQuestion(question, answers={}) {
 const results=[];
 for(const publicPart of question.parts){
  const p=markingPart(publicPart),raw=answers[p.id]??'',value=String(raw).trim().replace(/\s+/g,' ');
  if(p.kind==='excel'){
   results.push({id:p.id,...(value?markExcel(raw,p):{earned:0,message:'No answer entered.'}),max:p.marks,blank:!value});continue;
  }
  if(p.kind==='code'||p.kind==='identifier'){
   const correct=Boolean(value)&&(p.kind==='code'?[p.answer,...p.accepted??[]].some(a=>sameCode(raw,a)):/^[A-Za-z_][A-Za-z0-9_]*$/.test(value)&&[p.answer,...p.accepted??[]].includes(value));
   const dependency=p.dependsOn===undefined||results[Number(p.dependsOn)]?.earned>0;
   results.push({id:p.id,earned:correct&&dependency?p.marks:0,max:p.marks,blank:!value,message:correct&&!dependency?'Your reason needs to match a correct preceding choice.':correct?'Correct.':value?(p.feedback??(p.options?'That choice is not correct. Compare it with the model answer.':'This answer was not recognised. Check the requested format or compare it with the model answer.')):'No answer entered.'});
  }else results.push(markPart(p.playData?{...p,tree:playTree(p)}:p,raw,results));
 }
 return results;
}
