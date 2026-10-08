/**
 * Purpose: evaluate every supplied puzzle answer kind independently of the UI.
 * Main contents: per-part feedback, aggregate marks and maximum marks.
 * Used by: consumers and app marking adapter. Uses: package rule helpers. Libs: none directly.
 */
import {expressionValue,validCoinSystems,fractionValue} from './rules/maths-answer.js';
import {markAlgebra} from './rules/algebra-answer.js';
import {challengeKinds as interactiveKinds,markChallenge as markPuzzle} from './rules/challenge-rules.js';
export const puzzleAnswerKinds=[...interactiveKinds,'number','fraction','algebra','coin-systems','expression','integer-set','choice','text'];
const normalise = (value, sensitive=false) => {
  const text=String(value??'').trim().replace(/\s+/g,' ');
  return sensitive?text:text.toLowerCase();
};
const normaliseTerm=value=>normalise(value).replace(/[.!]$/, '').replace(/^(?:it is|this is|it's|the answer is)\s+/, '').replace(/^(?:a|an|the)\s+/, '');
export function markPart(p,raw='',results=[]) {
    if(!puzzleAnswerKinds.includes(p.kind))throw Error(`Unsupported puzzle answer kind: ${p.kind}`);
    const value=normalise(raw,p.caseSensitive);
    if(interactiveKinds.includes(p.kind)){
      const result=value?markPuzzle(p,raw):{earned:0,message:'No answer entered.'};
      return {id:p.id,...result,max:p.marks,blank:!value};
    }
    let correct=false, algebraMessage, algebraEarned=0;
    if(value) {
      if(p.kind==='number') correct=/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(value) && [p.answer,...p.accepted??[]].some(a=>Number(value)===Number(a));
      else if(p.kind==='fraction') {
        const supplied=fractionValue(raw);
        correct=supplied!==null&&[p.answer,...p.accepted??[]].some(a=>{const expected=fractionValue(a);return expected!==null&&Math.abs(supplied-expected)<1e-9;});
      }
      else if(p.kind==='algebra') {const result=markAlgebra(raw,p);correct=result.correct;algebraMessage=result.message;algebraEarned=result.earned??0;}
      else if(p.kind==='coin-systems') correct=validCoinSystems(raw);
      else if(p.kind==='expression') {
        const supplied=expressionValue(raw,p.digit);correct=supplied!==null&&Math.abs(supplied-6)<1e-9;
      }
      else if(p.kind==='integer-set') {
        const parse=s=>{const text=String(s).trim().replace(/^\[|\]$/g,'');return /^\d+(?:\s*,\s*\d+)*$/.test(text)?text.split(',').map(Number).sort((a,b)=>a-b):null;};
        const supplied=parse(raw),expected=parse(p.answer);correct=Boolean(supplied&&expected&&new Set(supplied).size===supplied.length&&JSON.stringify(supplied)===JSON.stringify(expected));
      }
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
    return {id:p.id,earned:dependency?(correct?p.marks:algebraEarned):0,max:p.marks,blank:!value,message:correct&&!dependency?'Your reason needs to match a correct preceding choice.':correct?'Correct.':value?(algebraMessage??p.feedback??(p.options?'That choice is not correct. Compare it with the model answer.':'This answer was not recognised. Check the requested format or compare it with the model answer.')):'No answer entered.'};
}

/** Read available marks without evaluating answers or accessing the DOM. */
export const maximumMark=puzzle=>puzzle.parts.reduce((total,part)=>total+part.marks,0);

/** Explicitly check answers; no state, assistance or submission policy is changed. */
export function evaluatePuzzle(puzzle,answers={}) {
  const parts=[];
  for(const part of puzzle.parts)parts.push(markPart(part,answers[part.id]??'',parts));
  const earned=parts.reduce((total,part)=>total+part.earned,0),maximum=maximumMark(puzzle);
  return {earned,maximum,complete:earned===maximum,parts};
}
