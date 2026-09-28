import {bankRelease,CODE_FORMAT} from './bank-release.js';
import {sameGeneration} from './progress-generation.js';
import {decode, decodeLegacyCode, encode, parseQuestionCode} from './codes.js';
import {revisions} from './code-compatibility.js';
export const REATTEMPT_HOURS=4;
const gapMs=REATTEMPT_HOURS*60*60*1000;
// Timer settings and display order do not make a different set. Variations do.
export function setIdentity(code) {
  const fields=parseQuestionCode(code)??decode(code);
  // Permanent question/variation addresses identify practice across editorial revisions.
  const exists=version=>fields.entries.every(e=>revisions[version]?.[`${fields.type}:${e.slot}:${e.variation}`]!==undefined);
  const version=Number(Object.keys(revisions).map(Number).sort((a,b)=>a-b).find(exists)??fields.version);
  return encode({...fields,version,minutes:null,entries:[...fields.entries].sort((a,b)=>a.slot-b.slot)});
}
export function attemptEligibility(data,code,now=Date.now()) {
  const key=setIdentity(code);
  let previous=null;
  // Include keys written by earlier releases, even for untracked practice.
  for(const [code,finished] of Object.entries((data.recentAttemptsGeneration===undefined&&bankRelease.generation===0)||data.recentAttemptsGeneration===bankRelease.generation?data.recentAttempts??{}:{})) {
    try {if(setIdentity(code)===key)previous=Math.max(previous??0,finished);} catch {}
  }
  for(const r of data.history) {
    if(!sameGeneration(r))continue;
    try {if(setIdentity(r.code)===key)previous=Math.max(previous??0,r.finished);} catch {/* Ignore unavailable legacy identities. */}
  }
  return {key,previous,eligible:previous===null||now-previous>=gapMs,checkedAt:now};
}
export function recordPractice(data,record,eligibility) {
  if(data.recentAttemptsGeneration!==undefined&&data.recentAttemptsGeneration!==bankRelease.generation)data.recentAttempts={};
  data.recentAttemptsGeneration=bankRelease.generation;
  data.recentAttempts??={};
  data.recentAttempts[eligibility.key]=Math.max(data.recentAttempts[eligibility.key]??0,record.finished);
  if(eligibility.eligible)data.history=appendAttempt(data.history,record);
}
export const STORAGE_KEY='dsd-starters-v1';
export function loadStorage(storage=globalThis.localStorage) {
  const empty={schema:1,active:null,history:[]};
  const raw=storage.getItem(STORAGE_KEY);
  if(!raw) return empty;
  const data=JSON.parse(raw);
  if(data.schema!==1 || !Array.isArray(data.history)) throw Error('Saved progress has an unsupported format.');
  return migrateStoredCodes(data);
}
export function migrateStoredCodes(data){
  if(data.codeFormat===CODE_FORMAT)return classifySavedGenerations(data);
  if(data.codeFormat===54){stampLegacyGeneration(data);data.codeFormat=CODE_FORMAT;return classifySavedGenerations(data);}
  if(data.codeFormat!==undefined&&data.codeFormat!==48)throw Error('Unsupported saved code format.');
  const convert=code=>typeof code==='string'&&!parseQuestionCode(code)?encode(decodeLegacyCode(code),{generation:0}):code;
  for(const row of data.history??[])row.code=convert(row.code);
  if(data.active){
    const prior=data.active.code;data.active.code=convert(prior);
    if(prior!==data.active.code)data.active.migratedCodeFrom=prior;
    if(data.active.result)data.active.result.code=convert(data.active.result.code);
    if(data.active.tracking?.key)data.active.tracking.key=convert(data.active.tracking.key);
  }
  if(data.recentAttempts)data.recentAttempts=Object.fromEntries(Object.entries(data.recentAttempts).map(([code,at])=>[convert(code),at]));
  stampLegacyGeneration(data);data.codeFormat=CODE_FORMAT;return classifySavedGenerations(data);
}
function stampLegacyGeneration(data){
  for(const row of data.history??[])row.generation??=0;
  if(data.active)data.active.generation??=0;
  data.recentAttemptsGeneration??=0;
}
export function classifySavedGenerations(data){
  if(data.active&&!sameGeneration(data.active)){
    data.archivedActive??=[];data.archivedActive.push(data.active);data.active=null;
  }
  if((data.recentAttemptsGeneration!==undefined&&data.recentAttemptsGeneration!==bankRelease.generation)||(data.recentAttemptsGeneration===undefined&&bankRelease.generation>0&&data.recentAttempts)){
    data.archivedRecentAttempts??=[];
    data.archivedRecentAttempts.push({generation:data.recentAttemptsGeneration,attempts:data.recentAttempts??{}});
    data.recentAttempts={};data.recentAttemptsGeneration=bankRelease.generation;
  }
  return data;
}
export function saveStorage(data,storage=globalThis.localStorage) {
  data.codeFormat=CODE_FORMAT;data.lastSeenRelease={...bankRelease};
  storage.setItem(STORAGE_KEY,JSON.stringify(data));
}
export function deadlineState(attempt,now=Date.now()) {
  return {expired:attempt.deadline!==null && now>=attempt.deadline,remaining:attempt.deadline===null?null:Math.max(0,Math.ceil((attempt.deadline-now)/1000))};
}
export function appendAttempt(history, record) { return history.some(a=>a.id===record.id)?history:[...history,record]; }
// Snapshot the marking and attribution while the authored question is available.
// Programming retains its named focus: its tags are not part-level CA mappings.
export function partScores(set, firstResponses, finalResults) {
  if(set.type===0)return undefined;
  return set.questions.flatMap(q=>q.parts.map(p=>{
    const first=firstResponses[q.slot];
    const initial=first.results.find(r=>r.id===p.id);
    const final=finalResults[q.slot].find(r=>r.id===p.id);
    const refs=set.type===1?[...new Set(p.coverage.map(link=>link.focus))]:[set.focus];
    return {slot:q.slot,variation:q.variation,part:p.id,refs,earned:final.earned,max:final.max,
      firstEarned:first.assisted?0:initial.earned,firstMax:first.assisted?0:initial.max};
  }));
}

// No migration flag or date cutoff. Absence means a historical aggregate-only result.
export function validatePartScores(record, set) {
  if(record.partScores===undefined)return true;
  const parts=record.partScores;
  if(record.type===0||!Array.isArray(parts)||!parts.length||parts.length>record.max)return false;
  const identities=new Set(),totals={earned:0,max:0,firstEarned:0,firstMax:0};
  for(const p of parts){
    if(!p||typeof p!=='object'||typeof p.part!=='string'||!/^\d{1,3}$/.test(p.part)||
      !set.entries.some(e=>e.slot===p.slot&&e.variation===p.variation)||
      !Array.isArray(p.refs)||!p.refs.length||p.refs.length>20||new Set(p.refs).size!==p.refs.length)return false;
    const id=`${p.slot}:${p.variation}:${p.part}`;
    if(identities.has(id))return false;
    identities.add(id);
    for(const ref of p.refs){
      if(typeof ref!=='string')return false;
      if(record.type===1){
        if(!/^CA\d+\.\d+\.\d+(?:\.\d+)?$/.test(ref)||!ref.startsWith(record.focus+'.'))return false;
      }else if(ref!==record.focus)return false;
    }
    if(!Number.isInteger(p.max)||p.max<1||p.max>3||!Number.isInteger(p.earned)||p.earned<0||p.earned>p.max||
      ![0,p.max].includes(p.firstMax)||!Number.isInteger(p.firstEarned)||p.firstEarned<0||p.firstEarned>p.firstMax)return false;
    for(const key of Object.keys(totals))totals[key]+=p[key];
  }
  return Object.entries(totals).every(([key,value])=>value===record[key]);
}

export function priorities(history, level='topic') {
  // Select a common window at the parent focus before computing either view.
  // This avoids showing a parent and children based on different old attempts.
  const windows=new Map();
  for(const a of [...history].sort((a,b)=>b.finished-a.finished)) {
    if(a.type===0||!a.firstMax||!Array.isArray(a.partScores)||!a.partScores.length)continue;
    const key=`${a.type}:${a.focus}`,rows=windows.get(key)??[];
    if(rows.length<5)rows.push(a);
    windows.set(key,rows);
  }
  const groups=new Map();
  for(const rows of windows.values())for(const a of rows){
    if(level==='subtopic'&&a.type!==1)continue;
    const attempt=new Map();
    for(const p of a.partScores){
      if(!p.firstMax)continue;
      const refs=level==='subtopic'?[...new Set(p.refs)]:[a.focus];
      for(const ref of refs){
        const tally=attempt.get(ref)??{earned:0,max:0};
        tally.earned+=p.firstEarned/refs.length;tally.max+=p.firstMax/refs.length;
        attempt.set(ref,tally);
      }
    }
    for(const [focus,tally] of attempt){
      const key=`${a.type}:${focus}`,group=groups.get(key)??{focus,count:0,earned:0,max:0};
      group.count++;group.earned+=tally.earned;group.max+=tally.max;groups.set(key,group);
    }
  }
  return [...groups.values()].map(g=>({...g,score:Math.round(g.earned/g.max*100)})).sort((a,b)=>a.score-b.score||a.focus.localeCompare(b.focus));
}
export function exportCSV(history) {
  const keys=['id','code','generation','bankVersion','type','focus','started','finished','earned','max','percentage','seconds','attemptChecks','assisted','outcome','firstEarned','firstMax','partScores','espReview'];
  const cell=v=>`"${String(v??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')}"`;
  return '\ufeff'+[keys.join(','),...history.map(a=>keys.map(k=>cell(k==='finished'?new Date(a[k]).toISOString():['partScores','espReview'].includes(k)&&a[k]?JSON.stringify(a[k]):a[k])).join(','))].join('\r\n');
}
