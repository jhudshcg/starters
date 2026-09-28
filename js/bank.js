import {sameGeneration} from './progress-generation.js';
import {matchingVariations,subtopicOptions,preferSubtopic} from './exam-selection.js';
export {matchesSubtopic} from './exam-selection.js';
import {revisions,revisionDetails} from './code-compatibility.js';
import {banks,ensureBank} from './bank-data.js';
export {banks,ensureBank};
import {BANK_VERSION, decode, decodeRecordedCode, encode, parseQuestionCode} from './codes.js';
export async function loadSet(input){
  const fields=typeof input==='string'?parseQuestionCode(input)??decode(input):input;
  historicalSet(fields);
  await ensureBank(fields.type);
  return resolve(fields);
}
export const types = [
  {name:'Puzzles', icon:'◇', description:'Logic, shapes, paths and number grids. A fresh way to get thinking.', label:'Think it through', minutes:10},
  {name:'Exam practice', icon:'≡', description:'Short questions, clear feedback. Build your Core knowledge.', label:'Know your Core', minutes:10},
  {name:'Programming', icon:'</>', description:'Trace, complete and fix Python. One small challenge at a time.', label:'Read. Reason. Code.', minutes:10},
  {name:'ESP practice',icon:'▦',description:'Plan a project, find code faults and document tests. Practise Tasks 1 and 2.',label:'Plan. Test. Explain.',minutes:15}
];
export const focusNames = {task1:'Task 1 · Planning',task2:'Task 2 · Testing and repair',iteration:'Iteration',selection:'Selection',functions:'Functions',algorithms:'Searching and sorting',go:'Go · life and death'};
Object.assign(focusNames, Object.fromEntries(['validation','arrays','operators','data types','strings','lists','records','boolean logic','nested iteration','input output','robust code','testing','sorting','design','collections','code style'].map(f=>[f,f[0].toUpperCase()+f.slice(1)])));
Object.assign(focusNames, {"CA1.1": "CA1.1 · Computational thinking", "CA1.2": "CA1.2 · Algorithmic design", "CA1.3": "CA1.3 · Problem-solving strategies", "CA2.1": "CA2.1 · Data types", "CA2.2": "CA2.2 · Variables and constants", "CA2.3": "CA2.3 · Data structures", "CA2.4": "CA2.4 · Operators", "CA2.5": "CA2.5 · Input and output", "CA2.6": "CA2.6 · Sequence, selection and iteration", "CA2.7": "CA2.7 · Functions and procedures", "CA2.8": "CA2.8 · Validation", "CA2.9": "CA2.9 · Design and code style", "CA2.10": "CA2.10 · Robust code", "CA2.11": "CA2.11 · Searching and sorting", "CA2.12": "CA2.12 · Testing"});
Object.assign(focusNames, {"logic grids": "Logic grids", "logic equations": "Logic equations", "tangrams": "Tangram silhouettes", "cover paths": "Cover every dot", "sudoku": "Sudoku", "number constraints": "Arithmetic cages", "sequences": "Sequences", "classic maths": "Classic maths"});
export const espRecipeNames={'T1.1':'Build a feasible schedule','T1.2':'Calculate costs and forecasts','T1.2F':'Excel · Costs and copied formulas','T1.3':'Adapt to constraints','T1.4':'Justify planning decisions','T1.5':'Reconcile the plan','T1.5F':'Excel · Forecasts and reconciliation','T2.1':'Choose tests that expose faults','T2.2':'Derive expected results','T2.3':'Repair and retest','T2.4':'Complete the test log','T2.5':'Investigate independently'};
export const challengeLevels = {all:'Mixed challenge',beginner:'Beginner',foundation:'Foundation',standard:'Standard',stretch:'Stretch'};
export const challengeLabel = (level,focus) => focus==='go'?({all:'Mixed challenge',beginner:'Beginner · 25k+',foundation:'Foundation · 18–24k',standard:'Standard · 12–17k',stretch:'Stretch · 11k and stronger'}[level]??challengeLevels[level]):challengeLevels[level];
export const puzzlePool = (focus, level='all', topic='all') => banks[0].filter(q=>q.focus===focus&&!q.retired&&(level==='all'||q.challengeLevel===level)&&(topic==='all'||q.tags.includes(`maths:${topic}`)));
export const availableChallenges = (focus,topic='all') => Object.keys(challengeLevels).filter(level=>puzzlePool(focus,level,topic).length>=3);
export const focuses = type => [...new Set(banks[type].filter(q=>!q.retired).map(q => q.focus))];
export const examSubtopics = focus => subtopicOptions(banks[1],focus);
// Sequence only through selectable references, so every step has bank coverage.
export function nextExamSubtopic(focus, reference='all') {
  const sequence=focuses(1).flatMap(parent=>examSubtopics(parent).map(option=>({focus:parent,reference:option.reference})));
  if(reference==='all')return sequence.find(option=>option.focus===focus)??null;
  const index=sequence.findIndex(option=>option.reference===reference);
  if(index<0)return null;
  return sequence[index+1]??null;
}
export const marks = q => q.parts.reduce((a,p) => a+p.marks,0);

// Historical scores can still be imported even when their questions were revised.
// These records contain only focus/marks, never the previous answers.
export function historicalSet(input) {
  const fields=typeof input==='string'?parseQuestionCode(input)??decode(input):input;
  const code=encode(fields),details=revisionDetails[fields.version];
  if(!details)throw Error(`Unsupported question-bank version ${fields.version}; this page has bank ${BANK_VERSION}. Check the code or reload the page.`);
  const entries=fields.entries.map(e=>details[`${fields.type}:${e.slot}:${e.variation}`]);
  if(entries.some(e=>!e))throw Error('Unknown historical question: this page does not recognise a question or variation in that code. Check the copied code or reload the page.');
  const focus=entries[0][0],total=entries.reduce((sum,e)=>sum+e[1],0);
  if(entries.some(e=>e[0]!==focus))throw Error('Historical set mixes focuses.');
  if(entries.length!==1){
    if(entries.length!==(fields.type===2?2:3))throw Error('Invalid historical set size.');
    if(fields.type===1&&(total<15||total>22)||fields.type===2&&(total<10||total>15))throw Error('Invalid historical mark total.');
  }
  return {...fields,code,focus,total};
}

export function contentChanged(set, version=set.version) {
  return set.entries.some(e=>revisions[version]?.[`${set.type}:${e.slot}:${e.variation}`]===0);
}

export function resolve(input) {
  const fields = typeof input === 'string' ? parseQuestionCode(input) ?? decode(input) : input;
  // Encoding validates integer ranges, duplicate slots and field structure.
  const code = encode(fields);
  const original = historicalSet(fields);
  const revision=revisions[fields.version];
  if(!revision)throw Error('This question-bank version is not available. Reload to check for an update.');
  for(const entry of fields.entries){
    const state=revision[`${fields.type}:${entry.slot}:${entry.variation}`];
    if(state===undefined)throw Error('This question or variation was not available in that bank version.');
  }
  const questions = fields.entries.map(e => {
    if(!banks[fields.type])throw Error('This question bank is not installed in this release.');
    const template = banks[fields.type].find(q => q.slot === e.slot);
    if (!template || !template.variations[e.variation]) {
      const error=new Error('A question in this set is no longer available. You can choose a replacement set.');
      error.replacement={type:fields.type,focus:original.focus};
      throw error;
    }
    return {...template, ...template.variations[e.variation], variation:e.variation};
  });
  const total = questions.reduce((a,q)=>a+marks(q),0);
  if(fields.type===0&&![1,3].includes(questions.length)) throw Error('Puzzle sets contain three questions; individual question codes open one.');
  const updated=contentChanged(fields);
  if (questions.length > 1 && !updated) {
    if (questions.length !== (fields.type===2?2:3)) throw Error('This set has the wrong number of questions.');
    if (new Set(questions.map(q=>q.focus)).size!==1) throw Error('Choose questions with the same focus.');
    if (fields.type===1 && (total<15 || total>22) || fields.type===2 && (total<10 || total>15)) throw Error('This set does not meet the mark limits.');
    if(fields.type===3&&(new Set(questions.map(q=>q.recipe)).size!==1||new Set(questions.map(q=>q.variation)).size!==1))throw Error('ESP sets require one recipe and a shared variation.');
    if (fields.type===2 && new Set(questions.map(q=>q.format)).size!==2) throw Error('Programming questions must test different aspects.');
  }
  return {...fields, code, questions, total, focus:questions[0].focus, updated};
}

const pick = values => values[Math.floor(Math.random()*values.length)];
function candidateSets(type,focus,challengeLevel='all',subtopic='all') {
  const pool=banks[type].filter(q=>q.focus===focus&&!q.retired&&(type!==0||challengeLevel==='all'||q.challengeLevel===challengeLevel));
  const size=type===2?2:3,combinations=[];
  function build(start,entries){
    if(entries.length===size){
      const total=entries.reduce((sum,q)=>sum+marks(q.variations[0]),0);
      if(type===2&&(new Set(entries.map(q=>q.format)).size!==2||total<10||total>15)||type===1&&(total<15||total>22))return;
      combinations.push(entries);return;
    }
    for(let i=start;i<pool.length;i++)build(i+1,[...entries,pool[i]]);
  }
  build(0,[]);
  return type===1?preferSubtopic(combinations,subtopic):combinations;
}
const slotsKey = entries => entries.map(e=>e.slot).sort((a,b)=>a-b).join(',');
export function hasAlternativeExamSet(set,subtopic='all') {
  return candidateSets(1,set.focus,'all',subtopic).some(qs=>slotsKey(qs)!==slotsKey(set.entries));
}
export function choose(type, focus, previous = null, mode = 'new', challengeLevel = 'all', subtopic = 'all') {
  if(type===3){
    const pool=banks[3].filter(q=>q.focus===focus&&!q.retired&&(subtopic==='all'||q.recipe===subtopic));
    let group;
    if(mode==='permutation'&&previous)group=previous.entries.map(e=>banks[3].find(q=>q.slot===e.slot));
    else {
      const recipes=[...new Set(pool.map(q=>q.recipe))].filter(r=>!previous||r!==previous.questions?.[0]?.recipe);
      if(!recipes.length)throw Error('Choose another recipe or a new permutation.');
      const recipe=pick(recipes);group=pool.filter(q=>q.recipe===recipe);
    }
    const variations=group[0].variations.map((_,i)=>i).filter(i=>mode!=='permutation'||i!==previous.entries[0].variation);
    const variation=pick(variations);
    return resolve({version:BANK_VERSION,type,entries:group.map(q=>({slot:q.slot,variation})),minutes:previous?.minutes??null});
  }
  const variationPool=q=>{
    const matching=type===1&&subtopic!=='all'?matchingVariations(q,subtopic):[];
    return matching.length?matching:q.variations.map((_,i)=>i);
  };
  if(mode==='permutation'&&previous){
    const entries=previous.entries.map(e=>{
      const q=banks[type].find(q=>q.slot===e.slot),options=q?variationPool(q).filter(i=>i!==e.variation):[];
      if(!options.length)throw Error('These questions have no other matching permutation. Choose a new set.');
      return {slot:e.slot,variation:pick(options)};
    });
    return {...resolve({...previous,version:BANK_VERSION,entries}),examSubtopic:type===1?subtopic:'all',mathsTopic:type===0&&focus==='classic maths'?subtopic:'all'};
  }
  if(type===0) {
    const topic=focus==='classic maths'?subtopic:'all',pool=puzzlePool(focus,challengeLevel,topic);
    if(pool.length<3||pool.length===3&&previous&&slotsKey(pool)===slotsKey(previous.entries))throw Error('No other question combination matches this selection. Use Get new permutation.');
    const remaining=pool.slice(),selected=[];
    for(let i=0;i<3;i++)selected.push(remaining.splice(Math.floor(Math.random()*remaining.length),1)[0]);
    if(previous&&slotsKey(selected)===slotsKey(previous.entries))selected[2]=pick(remaining);
    return {...resolve({version:BANK_VERSION,type,entries:selected.map(q=>({slot:q.slot,variation:pick(variationPool(q))})),minutes:previous?.minutes??null}),mathsTopic:topic};
  }
  // Choose the best matching combinations before excluding the last set: never
  // weaken the filter just to manufacture another combination.
  const candidates=candidateSets(type,focus,challengeLevel,subtopic);
  const alternatives=candidates.filter(qs=>!previous||slotsKey(qs)!==slotsKey(previous.entries));
  // Adjacent sequence focuses may share their only best whole-question set.
  const eligible=mode==='sequence'&&!alternatives.length?candidates:alternatives;
  if(!eligible.length)throw Error('No other question combination matches this selection. Use Get new permutation.');
  const entries=pick(eligible).map(q=>{
    const options=variationPool(q),prior=previous?.entries.find(entry=>entry.slot===q.slot)?.variation;
    const fresh=mode==='sequence'?options.filter(variation=>variation!==prior):options;
    return {slot:q.slot,variation:pick(fresh.length?fresh:options)};
  });
  return {...resolve({version:BANK_VERSION,type,entries,minutes:previous?.minutes??null}),examSubtopic:type===1?subtopic:'all'};
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
          if(p.kind==='algebra' && (!Array.isArray(p.variables)||!p.variables.length||p.variables.some(v=>!/^[a-z]$/.test(v))||!['equivalent','simplified','expanded','factorised','rearranged'].includes(p.algebraForm)||!Number.isInteger(p.equivalentMarks)||p.equivalentMarks<0||p.equivalentMarks>=p.marks)) errors.push(`${q.title}: invalid algebra marking policy`);
          if(p.options && !p.options.includes(p.answer)) errors.push(`${q.title} V${i}: answer absent from options`);
          if(p.termRules!==undefined) {
            const strings=list=>Array.isArray(list)&&list.length>0&&list.every(s=>typeof s==='string'&&s.trim()===s&&s.length>0);
            if(p.kind!=='text'||p.options||p.caseSensitive||!Array.isArray(p.termRules)||!p.termRules.length||
              p.termRules.some(rule=>!rule||!strings(rule.terms)||(rule.prefixWords!==undefined&&![0,3].includes(rule.prefixWords))||(rule.qualifiers!==undefined&&!strings(rule.qualifiers)))) {
              errors.push(`${q.title} V${i} part ${j}: invalid conceptual term rules`);
            }
          }
          if(p.dependsOn!==undefined && (!v.parts[Number(p.dependsOn)]||Number(p.dependsOn)>=j)) errors.push(`${q.title}: invalid dependency`);
        });
        try {resolve({version:BANK_VERSION,type,entries:[{slot:q.slot,variation:i}],minutes:null});} catch(e){errors.push(e.message);}
      }
    }
  });
  return errors;
}

// Historical generations use their recorded score/topic snapshot, never the
// current content at a possibly reused slot. Import still validates fields/scores.
export function recordedSet(record){
  if(record.generation!==undefined&&record.generation!==null&&(!Number.isSafeInteger(record.generation)||record.generation<0))throw Error('Invalid recorded generation.');
  if(sameGeneration(record))return historicalSet(record.code);
  if(!Number.isInteger(record.type)||record.type<0||record.type>7||typeof record.focus!=='string'||!record.focus.trim()||record.focus.length>120||!Number.isInteger(record.max)||record.max<1||record.max>100)throw Error('Invalid historical record metadata.');
  const fields=parseQuestionCode(record.code)??decodeRecordedCode(record.code,record.generation);
  if(fields.type!==record.type)throw Error('Historical bank does not match its code.');
  return {...fields,code:record.code,focus:record.focus,total:record.max};
}
