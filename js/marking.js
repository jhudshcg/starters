import {sameCode} from './code-answer.js';
import {expressionValue,validCoinSystems,fractionValue} from './maths-answer.js';
import {challengeKinds as interactiveKinds, markChallenge as markPuzzle} from './challenge-rules.js';
const normalise = (value, sensitive=false) => {
  const text=String(value??'').trim().replace(/\s+/g,' ');
  return sensitive?text:text.toLowerCase();
};
const normaliseTerm=value=>normalise(value).replace(/[.!]$/, '').replace(/^(?:it is|this is|it's|the answer is)\s+/, '').replace(/^(?:a|an|the)\s+/, '');
export function markQuestion(question, answers={}) {
  const results=[];
  for(const p of question.parts) {
    const raw=answers[p.id]??'', value=normalise(raw,p.caseSensitive);
    if(interactiveKinds.includes(p.kind)){
      const result=value?markPuzzle(p,raw):{earned:0,message:'No answer entered.'};
      results.push({id:p.id,...result,max:p.marks,blank:!value});continue;
    }
    let correct=false;
    if(value) {
      if(p.kind==='number') correct=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) && Number(value)===Number(p.answer);
      else if(p.kind==='fraction') {
        const supplied=fractionValue(raw),expected=fractionValue(p.answer);
        correct=supplied!==null&&expected!==null&&Math.abs(supplied-expected)<1e-9;
      }
      else if(p.kind==='coin-systems') correct=validCoinSystems(raw);
      else if(p.kind==='expression') {
        const supplied=expressionValue(raw,p.digit);correct=supplied!==null&&Math.abs(supplied-6)<1e-9;
      }
      else if(p.kind==='integer-set') {
        const parse=s=>{const text=String(s).trim().replace(/^\[|\]$/g,'');return /^\d+(?:\s*,\s*\d+)*$/.test(text)?text.split(',').map(Number).sort((a,b)=>a-b):null;};
        const supplied=parse(raw),expected=parse(p.answer);correct=Boolean(supplied&&expected&&new Set(supplied).size===supplied.length&&JSON.stringify(supplied)===JSON.stringify(expected));
      }
      else if(p.kind==='code') correct=[p.answer,...p.accepted??[]].some(a=>sameCode(raw,a));
      else {
        const clean=p.allowSentence&&!p.caseSensitive?normaliseTerm:a=>normalise(a,p.caseSensitive);
        correct=[p.answer,...p.accepted??[],...p.typos??[]].some(a=>clean(a)===clean(raw));
      }
    }
    const dependency=p.dependsOn===undefined || results[Number(p.dependsOn)]?.earned>0;
    results.push({id:p.id,earned:correct&&dependency?p.marks:0,max:p.marks,blank:!value,message:correct&&!dependency?'Your reason needs to match a correct preceding choice.':correct?'Correct.':value?(p.explanation.startsWith('The answer is ')?'Check the question and try again. Use a hint if you need a starting point.':p.explanation):'No answer entered.'});
  }
  return results;
}
