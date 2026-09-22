import {markingPart} from './packed-data.js';
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
  for(const publicPart of question.parts) {
    const p=markingPart(publicPart);
    const raw=answers[p.id]??'', value=normalise(raw,p.caseSensitive);
    if(interactiveKinds.includes(p.kind)){
      const result=value?markPuzzle(p,raw):{earned:0,message:'No answer entered.'};
      results.push({id:p.id,...result,max:p.marks,blank:!value});continue;
    }
    let correct=false;
    if(value) {
      if(p.kind==='number') correct=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) && [p.answer,...p.accepted??[]].some(a=>Number(value)===Number(a));
      else if(p.kind==='fraction') {
        const supplied=fractionValue(raw);
        correct=supplied!==null&&[p.answer,...p.accepted??[]].some(a=>{const expected=fractionValue(a);return expected!==null&&Math.abs(supplied-expected)<1e-9;});
      }
      else if(p.kind==='coin-systems') correct=validCoinSystems(raw);
      else if(p.kind==='expression') {
        const supplied=expressionValue(raw,p.digit);correct=supplied!==null&&Math.abs(supplied-6)<1e-9;
      }
      else if(p.kind==='integer-set') {
        const parse=s=>{const text=String(s).trim().replace(/^\[|\]$/g,'');return /^\d+(?:\s*,\s*\d+)*$/.test(text)?text.split(',').map(Number).sort((a,b)=>a-b):null;};
        const supplied=parse(raw),expected=parse(p.answer);correct=Boolean(supplied&&expected&&new Set(supplied).size===supplied.length&&JSON.stringify(supplied)===JSON.stringify(expected));
      }
      else if(p.kind==='identifier') {const name=normalise(raw,true);correct=/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)&&[p.answer,...p.accepted??[]].includes(name);}
      else if(p.kind==='code') correct=[p.answer,...p.accepted??[]].some(a=>sameCode(raw,a));
      else {
        const clean=p.allowSentence&&!p.caseSensitive?normaliseTerm:a=>normalise(a,p.caseSensitive);
        correct=[p.answer,...p.accepted??[],...p.typos??[]].some(a=>clean(a)===clean(raw));
        if(!correct && p.kind==='text' && !p.options && !p.caseSensitive && p.termRules?.length) {
          const forms=[p.answer,...p.accepted??[],...p.typos??[],
            ...p.termRules.flatMap(rule=>rule.terms.flatMap(term=>[term,...(rule.qualifiers??[]).map(q=>`${term} ${q}`)]))].map(clean);
          const exact=answer=>forms.includes(answer);
          const matches=answer=>{
            if(exact(answer))return true;
            return p.termRules.some(rule=>rule.terms.some(term=>['',...(rule.qualifiers??[])].some(qualifier=>{
              const ending=clean(qualifier?`${term} ${qualifier}`:term);
              if(!answer.endsWith(` ${ending}`))return false;
              const prefix=answer.slice(0,-ending.length).trim();
              if(prefix.split(/\s+/).length>(rule.prefixWords??0))return false;
              if(/\b(?:not|no|non|never|neither|nor|without|except|excluding|but|rather|instead|versus|vs|and|or)\b|n['’]t\b|\bnon(?:-|\s)/i.test(prefix))return false;
              // A repeated term is not a descriptive prefix.
              return !forms.some(form=>(` ${prefix} `).includes(` ${form} `));
            })));
          };
          const answer=clean(raw);
          // Authored phrases such as "start or end" remain atomic alternatives.
          correct=exact(answer)||answer.split(/\bor\b/i).every(operand=>Boolean(clean(operand))&&matches(clean(operand)));
        }
      }
    }
    const dependency=p.dependsOn===undefined || results[Number(p.dependsOn)]?.earned>0;
    results.push({id:p.id,earned:correct&&dependency?p.marks:0,max:p.marks,blank:!value,message:correct&&!dependency?'Your reason needs to match a correct preceding choice.':correct?'Correct.':value?(p.feedback??(p.options?'That choice is not correct. Compare it with the model answer.':'This answer was not recognised. Check the requested format or compare it with the model answer.')):'No answer entered.'});
  }
  return results;
}
