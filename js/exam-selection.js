// A filter selects whole questions; coverage on the displayed parts determines matches.
export const matchesSubtopic = (part, reference) => part.coverage?.some(link=>link.focus===reference||link.focus.startsWith(reference+'.'))??false;
export const matchingVariations = (question, reference) => question.variations.flatMap((v,i)=>v.parts.some(p=>matchesSubtopic(p,reference))?[i]:[]);
export function subtopicOptions(bank, focus) {
  const pool=bank.filter(q=>q.focus===focus&&!q.retired),refs=new Set();
  for(const q of pool)for(const v of q.variations)for(const p of v.parts)for(const link of p.coverage??[]){
    if(!link.focus.startsWith(focus+'.'))continue;
    const segments=link.focus.split('.');
    for(let length=3;length<=segments.length;length++)refs.add(segments.slice(0,length).join('.'));
  }
  return [...refs].sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).map(reference=>({reference,count:pool.filter(q=>matchingVariations(q,reference).length).length}));
}
export function preferSubtopic(combinations, reference) {
  if(reference==='all')return combinations;
  const scored=combinations.map(questions=>({questions,count:questions.filter(q=>matchingVariations(q,reference).length).length}));
  const best=Math.max(0,...scored.map(row=>row.count));
  if(!best)throw Error('No questions cover this subtopic in the selected topic.');
  return scored.filter(row=>row.count===best).map(row=>row.questions);
}
