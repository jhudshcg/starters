import {interactiveKinds, markPuzzle} from './puzzle-rules.js';
const normalise = (value, sensitive=false) => {
  const text=String(value??'').trim().replace(/\s+/g,' ');
  return sensitive?text:text.toLowerCase();
};
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
      else correct=[p.answer,...p.accepted??[],...p.typos??[]].some(a=>normalise(a,p.caseSensitive)===value);
    }
    const dependency=p.dependsOn===undefined || results[Number(p.dependsOn)]?.earned>0;
    results.push({id:p.id,earned:correct&&dependency?p.marks:0,max:p.marks,blank:!value,message:correct&&!dependency?'Your reason needs to match a correct preceding choice.':correct?'Correct.':value?(p.explanation.startsWith('The answer is ')?'Check the question and try again. Use a hint if you need a starting point.':p.explanation):'No answer entered.'});
  }
  return results;
}
