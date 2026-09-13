import puzzles from '../data/puzzles.js';
import exam from '../data/exam.js';
import python from '../data/python.js';
import {decode, encode, parseQuestionCode} from './codes.js';
export const banks = [puzzles, exam, python];
export const types = [
  {name:'Puzzles', icon:'◇', description:'Logic, shapes, paths and number grids. A fresh way to get thinking.', label:'Think it through', minutes:5},
  {name:'Exam practice', icon:'≡', description:'Short questions, clear feedback. Build your Core knowledge.', label:'Know your Core', minutes:10},
  {name:'Programming', icon:'</>', description:'Trace, complete and fix Python. One small challenge at a time.', label:'Read. Reason. Code.', minutes:10}
];
export const focusNames = {'number grids':'Number grids',spatial:'Spatial reasoning',logic:'Logic puzzles',shapes:'Shape puzzles',paths:'Path puzzles','CA2.4':'CA2.4 · Operators','CA2.8':'CA2.8 · Validation',iteration:'Iteration',selection:'Selection'};
export const focuses = type => [...new Set(banks[type].map(q => q.focus))];
export const marks = q => q.parts.reduce((a,p) => a+p.marks,0);

export function resolve(input) {
  const fields = typeof input === 'string' ? parseQuestionCode(input) ?? decode(input) : input;
  // Encoding validates integer ranges, duplicate slots and field structure.
  const code = encode(fields);
  if (fields.version !== 1) throw Error('This question-bank version is not available. Reload to check for an update.');
  const questions = fields.entries.map(e => {
    const template = banks[fields.type].find(q => q.slot === e.slot);
    if (!template || !template.variations[e.variation]) throw Error('This question or variation is not available in the pilot.');
    return {...template, ...template.variations[e.variation], variation:e.variation};
  });
  const total = questions.reduce((a,q)=>a+marks(q),0);
  if (questions.length > 1) {
    if (questions.length !== (fields.type===1?3:2)) throw Error('This set has the wrong number of questions.');
    if (new Set(questions.map(q=>q.focus)).size!==1) throw Error('Choose questions with the same focus.');
    if (fields.type===1 && (total<15 || total>22) || fields.type===2 && (total<10 || total>15)) throw Error('This set does not meet the mark limits.');
    if (fields.type===2 && new Set(questions.map(q=>q.format)).size!==2) throw Error('Programming questions must test different aspects.');
  }
  return {...fields, code, questions, total, focus:questions[0].focus};
}

const pick = values => values[Math.floor(Math.random()*values.length)];
export function choose(type, focus, previous = null, mode = 'new') {
  if(mode==='permutation' && previous) return resolve({...previous, entries:previous.entries.map(e=>({slot:e.slot,variation:pick(banks[type].find(q=>q.slot===e.slot).variations.map((_,i)=>i).filter(i=>i!==e.variation))}))});
  const pool = banks[type].filter(q=>q.focus===focus&&!q.retired);
  const size = type===1?3:2;
  const combinations=[];
  function build(start, entries) {
    if(entries.length===size) { combinations.push(entries); return; }
    for(let i=start;i<pool.length;i++) build(i+1,[...entries,pool[i]]);
  }
  build(0,[]);
  const eligible=combinations.filter(qs=> !previous || qs.map(q=>q.slot).join(',')!==previous.entries.map(e=>e.slot).join(','));
  if(!eligible.length) throw Error('No other question combination is available in this focus yet. Use Get new permutation.');
  return resolve({version:1,type,entries:pick(eligible).map(q=>({slot:q.slot,variation:pick(q.variations.map((_,i)=>i))})),minutes:previous?.minutes??null});
}

export function validateBank() {
  const errors=[];
  banks.forEach((bank,type)=>{
    if(new Set(bank.map(q=>q.slot)).size!==bank.length) errors.push('Duplicate question slots');
    for(const focus of focuses(type)) if(bank.filter(q=>q.focus===focus&&!q.retired).length<3) errors.push(`${focus}: needs three templates`);
    for(const q of bank) {
      if(q.variations.length<(type===1?2:5) || q.variations.length>8) errors.push(`${q.title}: variation count`);
      for(const [i,v] of q.variations.entries()) {
        if(!v.prompt || !v.hint) errors.push(`${q.title}: missing prompt or hint`);
        if(v.code && v.code.split('\n').filter(l=>l.trim()&&!l.trim().startsWith('#')).length>12) errors.push(`${q.title}: too many lines`);
        v.parts.forEach((p,j)=>{
          if(!Number.isInteger(p.marks)||p.marks<1||p.marks>3) errors.push(`${q.title}: invalid marks`);
          if(p.options && !p.options.includes(p.answer)) errors.push(`${q.title} V${i}: answer absent from options`);
          if(p.dependsOn!==undefined && (!v.parts[Number(p.dependsOn)]||Number(p.dependsOn)>=j)) errors.push(`${q.title}: invalid dependency`);
        });
        try {resolve({version:1,type,entries:[{slot:q.slot,variation:i}],minutes:null});} catch(e){errors.push(e.message);}
      }
    }
  });
  return errors;
}
