// Profiles are local conveniences, not authentication. Keep the legacy save intact.
import {loadStorage,saveStorage,STORAGE_KEY} from './progress.js';
export const PROFILE_KEY='dsd-starters-profiles-v1';
export const normaliseName=name=>name.trim().replace(/\s+/g,' ');
export function nameMatch(name,names){
  const input=normaliseName(name).toLocaleLowerCase();
  const exact=names.find(n=>n.toLocaleLowerCase()===input);
  if(exact)return {exact};
  const distance=(a,b)=>{let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=0;i<a.length;i++){const next=[i+1];for(let j=0;j<b.length;j++)next.push(Math.min(next[j]+1,row[j+1]+1,row[j]+(a[i]!==b[j])));row=next;}return row[b.length];};
  const ranked=names.map(name=>({name,distance:distance(input,name.toLocaleLowerCase())})).sort((a,b)=>a.distance-b.distance);
  return ranked[0]?.distance<=Math.min(2,Math.floor(input.length/4))?{suggestion:ranked[0].name}:{};
}
export function profiles(storage=globalThis.localStorage){return JSON.parse(storage.getItem(PROFILE_KEY)??'{"current":null,"names":[]}');}
function scoped(name,storage){return {getItem:()=>storage.getItem(`${STORAGE_KEY}:profile:${encodeURIComponent(name)}`),setItem:(_,value)=>storage.setItem(`${STORAGE_KEY}:profile:${encodeURIComponent(name)}`,value)};}
export function loadProfile(name,storage=globalThis.localStorage){
  const data={...loadStorage(scoped(name,storage)),username:name};
  if(data.active?.practiceClock){data.active.practiceClock.running=false;data.active.practiceClock.interacted=false;}
  return data;
}
export function saveProfile(data,storage=globalThis.localStorage){saveStorage(data,data.username?scoped(data.username,storage):storage);}
export function selectProfile(name,storage=globalThis.localStorage){
  name=normaliseName(name);if(!name||name.length>80)throw Error('Enter a name of 1–80 characters.');
  const index=profiles(storage);name=nameMatch(name,index.names).exact??name;
  const data=index.names.includes(name)?loadProfile(name,storage):{...(index.names.length?{schema:1,active:null,history:[]}:loadStorage(storage)),username:name};
  return activateProfile(data,storage);
}

// Call only after all imported records have been validated and merged in memory.
export function activateProfile(data,storage=globalThis.localStorage){
  const index=profiles(storage);
  saveProfile(data,storage);
  storage.setItem(PROFILE_KEY,JSON.stringify({current:data.username,names:[...new Set([...index.names,data.username])]}));
  return data;
}
