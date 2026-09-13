import {banks,validateBank,focuses,choose,resolve} from '../js/bank.js';
import {markQuestion} from '../js/marking.js';
const errors=validateBank();
for(const [type,bank] of banks.entries()) {
  for(const q of bank)for(const v of q.variations){
    const result=markQuestion(v,Object.fromEntries(v.parts.map(p=>[p.id,p.answer])));
    if(result.some(r=>r.earned!==r.max))errors.push(`${q.title}: model answers did not earn full marks`);
  }
  for(const focus of focuses(type))for(let i=0;i<20;i++){
    const set=choose(type,focus);if(resolve(set.code).code!==set.code)errors.push('Unstable set code');
  }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log(`Validated ${banks.flat().length} templates, ${banks.flat().reduce((s,q)=>s+q.variations.length,0)} variations and ${banks.reduce((s,_,type)=>s+focuses(type).length,0)} focuses. All model answers receive full marks.`);
