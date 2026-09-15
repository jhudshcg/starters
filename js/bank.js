import {revisions,revisionDetails} from './code-compatibility.js';
import {banks,ensureBank} from './bank-data.js';
export {banks,ensureBank};
import {BANK_VERSION, decode, encode, parseQuestionCode} from './codes.js';
export async function loadSet(input){
  const fields=typeof input==='string'?parseQuestionCode(input)??decode(input):input;
  historicalSet(fields);
  await ensureBank(fields.type);
  return resolve(fields);
}
export const types = [
  {name:'Puzzles', icon:'◇', description:'Logic, shapes, paths and number grids. A fresh way to get thinking.', label:'Think it through', minutes:10},
  {name:'Exam practice', icon:'≡', description:'Short questions, clear feedback. Build your Core knowledge.', label:'Know your Core', minutes:10},
  {name:'Programming', icon:'</>', description:'Trace, complete and fix Python. One small challenge at a time.', label:'Read. Reason. Code.', minutes:10}
];
export const focusNames = {iteration:'Iteration',selection:'Selection',functions:'Functions',algorithms:'Searching and sorting',go:'Go · life and death'};
Object.assign(focusNames, {"CA1.1": "CA1.1 · Computational thinking", "CA1.2": "CA1.2 · Algorithmic design", "CA1.3": "CA1.3 · Problem-solving strategies", "CA2.1": "CA2.1 · Data types", "CA2.2": "CA2.2 · Variables and constants", "CA2.3": "CA2.3 · Data structures", "CA2.4": "CA2.4 · Operators", "CA2.5": "CA2.5 · Input and output", "CA2.6": "CA2.6 · Sequence, selection and iteration", "CA2.7": "CA2.7 · Functions and procedures", "CA2.8": "CA2.8 · Validation", "CA2.9": "CA2.9 · Design and code style", "CA2.10": "CA2.10 · Robust code", "CA2.11": "CA2.11 · Searching and sorting", "CA2.12": "CA2.12 · Testing"});
Object.assign(focusNames, {"logic grids": "Logic grids", "logic equations": "Logic equations", "tangrams": "Tangram silhouettes", "cover paths": "Cover every dot", "sudoku": "Sudoku", "number constraints": "Arithmetic cages", "sequences": "Sequences", "classic maths": "Classic maths"});
export const focuses = type => [...new Set(banks[type].map(q => q.focus))];
export const marks = q => q.parts.reduce((a,p) => a+p.marks,0);

// Historical scores can still be imported even when their questions were revised.
// These records contain only focus/marks, never the previous answers.
export function historicalSet(input) {
  const fields=typeof input==='string'?parseQuestionCode(input)??decode(input):input;
  const code=encode(fields),details=revisionDetails[fields.version];
  if(!details)throw Error('Unsupported question-bank version.');
  const entries=fields.entries.map(e=>details[`${fields.type}:${e.slot}:${e.variation}`]);
  if(entries.some(e=>!e))throw Error('Unknown historical question.');
  const focus=entries[0][0],total=entries.reduce((sum,e)=>sum+e[1],0);
  if(entries.some(e=>e[0]!==focus))throw Error('Historical set mixes focuses.');
  if(entries.length!==1){
    if(entries.length!==(fields.type===2?2:3))throw Error('Invalid historical set size.');
    if(fields.type===1&&(total<15||total>22)||fields.type===2&&(total<10||total>15))throw Error('Invalid historical mark total.');
  }
  return {...fields,code,focus,total};
}

export function resolve(input) {
  const fields = typeof input === 'string' ? parseQuestionCode(input) ?? decode(input) : input;
  // Encoding validates integer ranges, duplicate slots and field structure.
  const code = encode(fields);
  const revision=revisions[fields.version];
  if(!revision)throw Error('This question-bank version is not available. Reload to check for an update.');
  for(const entry of fields.entries){
    const state=revision[`${fields.type}:${entry.slot}:${entry.variation}`];
    if(state===0)throw Error('This code contains a question that has been updated or removed. Ask for a current set code.');
    if(state===undefined)throw Error('This question or variation was not available in that bank version.');
  }
  const questions = fields.entries.map(e => {
    const template = banks[fields.type].find(q => q.slot === e.slot);
    if (!template || !template.variations[e.variation]) throw Error('This question or variation is not available in the pilot.');
    return {...template, ...template.variations[e.variation], variation:e.variation};
  });
  const total = questions.reduce((a,q)=>a+marks(q),0);
  if(fields.type===0&&![1,3].includes(questions.length)) throw Error('Puzzle sets contain three questions; individual question codes open one.');
  if (questions.length > 1) {
    if (questions.length !== (fields.type===2?2:3)) throw Error('This set has the wrong number of questions.');
    if (new Set(questions.map(q=>q.focus)).size!==1) throw Error('Choose questions with the same focus.');
    if (fields.type===1 && (total<15 || total>22) || fields.type===2 && (total<10 || total>15)) throw Error('This set does not meet the mark limits.');
    if (fields.type===2 && new Set(questions.map(q=>q.format)).size!==2) throw Error('Programming questions must test different aspects.');
  }
  return {...fields, code, questions, total, focus:questions[0].focus};
}

const pick = values => values[Math.floor(Math.random()*values.length)];
export function choose(type, focus, previous = null, mode = 'new') {
  if(mode==='permutation' && previous && previous.entries.some(e=>banks[type].find(q=>q.slot===e.slot)?.variations.length<2)) throw Error('This fixed problem has no variations. Choose another puzzle.');
  if(mode==='permutation' && previous) return resolve({...previous, version:BANK_VERSION, entries:previous.entries.map(e=>({slot:e.slot,variation:pick(banks[type].find(q=>q.slot===e.slot).variations.map((_,i)=>i).filter(i=>i!==e.variation))}))});
  const pool = banks[type].filter(q=>q.focus===focus&&!q.retired);
  const size = type===2?2:3;
  const combinations=[];
  function build(start, entries) {
    if(entries.length===size) { combinations.push(entries); return; }
    for(let i=start;i<pool.length;i++) build(i+1,[...entries,pool[i]]);
  }
  build(0,[]);
  const eligible=combinations.filter(qs=> !previous || qs.map(q=>q.slot).join(',')!==previous.entries.map(e=>e.slot).join(','));
  if(!eligible.length) throw Error('No other question combination is available in this focus yet. Use Get new permutation.');
  return resolve({version:BANK_VERSION,type,entries:pick(eligible).map(q=>({slot:q.slot,variation:pick(q.variations.map((_,i)=>i))})),minutes:previous?.minutes??null});
}

export function validateBank() {
  const errors=[];
  banks.forEach((bank,type)=>{
    if(new Set(bank.map(q=>q.slot)).size!==bank.length) errors.push('Duplicate question slots');
    for(const focus of focuses(type)) if(bank.filter(q=>q.focus===focus&&!q.retired).length<(type===0?5:3)) errors.push(`${focus}: needs ${type===0?5:3} templates`);
    for(const q of bank) {
      if(q.variations.length<(q.fixed?1:type===1?2:5) || q.variations.length>8) errors.push(`${q.title}: variation count`);
      for(const [i,v] of q.variations.entries()) {
        if(!v.prompt || !v.hint) errors.push(`${q.title}: missing prompt or hint`);
        if(v.code && v.code.split('\n').filter(l=>l.trim()&&!l.trim().startsWith('#')).length>12) errors.push(`${q.title}: too many lines`);
        v.parts.forEach((p,j)=>{
          if(!Number.isInteger(p.marks)||p.marks<1||p.marks>3) errors.push(`${q.title}: invalid marks`);
          if(p.options && !p.options.includes(p.answer)) errors.push(`${q.title} V${i}: answer absent from options`);
          if(p.dependsOn!==undefined && (!v.parts[Number(p.dependsOn)]||Number(p.dependsOn)>=j)) errors.push(`${q.title}: invalid dependency`);
        });
        try {resolve({version:BANK_VERSION,type,entries:[{slot:q.slot,variation:i}],minutes:null});} catch(e){errors.push(e.message);}
      }
    }
  });
  return errors;
}
