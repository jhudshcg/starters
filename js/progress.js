import {decode, encode, parseQuestionCode} from './codes.js';
import {revisions} from './code-compatibility.js';
export const REATTEMPT_HOURS=4;
const gapMs=REATTEMPT_HOURS*60*60*1000;
// Timer settings and display order do not make a different set. Variations do.
export function setIdentity(code) {
  const fields=parseQuestionCode(code)??decode(code);
  const unchanged=version=>fields.entries.every(e=>revisions[version]?.[`${fields.type}:${e.slot}:${e.variation}`]===1);
  // An unchanged legacy/current code is the same practice set. An obsolete
  // version remains distinct from its revised replacement.
  const version=unchanged(fields.version)?Number(Object.keys(revisions).map(Number).sort((a,b)=>a-b).find(unchanged)):fields.version;
  return encode({...fields,version,minutes:null,entries:[...fields.entries].sort((a,b)=>a.slot-b.slot)});
}
export function attemptEligibility(data,code,now=Date.now()) {
  const key=setIdentity(code);
  let previous=data.recentAttempts?.[key]??null;
  for(const r of data.history) {
    try {if(setIdentity(r.code)===key)previous=Math.max(previous??0,r.finished);} catch {/* Ignore unavailable legacy identities. */}
  }
  return {key,previous,eligible:previous===null||now-previous>=gapMs,checkedAt:now};
}
export function recordPractice(data,record,eligibility) {
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
  return data;
}
export function saveStorage(data,storage=globalThis.localStorage) {storage.setItem(STORAGE_KEY,JSON.stringify(data));}
export function deadlineState(attempt,now=Date.now()) {
  return {expired:attempt.deadline!==null && now>=attempt.deadline,remaining:attempt.deadline===null?null:Math.max(0,Math.ceil((attempt.deadline-now)/1000))};
}
export function appendAttempt(history, record) { return history.some(a=>a.id===record.id)?history:[...history,record]; }
export function priorities(history) {
  const groups=new Map();
  for(const a of [...history].sort((a,b)=>b.finished-a.finished)) {
    if(a.type===0 || !a.firstMax) continue;
    const rows=groups.get(a.focus)??[];
    if(rows.length<5) rows.push(a);
    groups.set(a.focus,rows);
  }
  return [...groups].map(([focus,rows])=>({focus,count:rows.length,score:Math.round(rows.reduce((a,r)=>a+r.firstEarned,0)/rows.reduce((a,r)=>a+r.firstMax,0)*100)})).sort((a,b)=>a.score-b.score);
}
export function exportCSV(history) {
  const keys=['id','code','type','focus','finished','earned','max','percentage','seconds','attemptChecks','assisted','outcome'];
  const cell=v=>`"${String(v??'').replace(/^[=+@-]/,"'$&").replaceAll('"','""')}"`;
  return '\ufeff'+[keys.join(','),...history.map(a=>keys.map(k=>cell(k==='finished'?new Date(a[k]).toISOString():a[k])).join(','))].join('\r\n');
}
