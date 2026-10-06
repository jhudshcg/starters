import {searchKeywords} from '../data/search-keywords.js';
import {searchTopics,searchReferenceLabels} from '../data/search-topics.js';

// Deliberately small teaching vocabulary, independent of answers and distractors.
const aliases = {
  loops:'iteration',loop:'iteration',looping:'iteration',iterate:'iteration',
  dict:'dictionary',dicts:'dictionary',dictionaries:'dictionary',
  arrays:'array',lists:'list',functions:'function',variables:'variable',
  tuples:'tuple',sets:'set',comprehensions:'comprehension',recursive:'recursion',
  constants:'constant',operators:'operator',strings:'string',files:'file',
  'boolean expressions':'boolean logic','boolean expression':'boolean logic',
  'data types':'data type','if statements':'selection','if statement':'selection',
  'for loops':'iteration','while loops':'iteration',
  'for loop':'iteration','while loop':'iteration',
  debugging:'debug',
  'zero based':'indexing',indices:'indexing',indexes:'indexing',index:'indexing',
  'linear searching':'linear search','binary searching':'binary search',
  'bubble sorting':'bubble sort','merge sorting':'merge sort',
  'spreadsheet formulas':'excel formulas','formula':'formulas',
  testing:'test',tests:'test',
  'tsumego':'go',tsumigo:'go'
};
const basic=value=>String(value??'').toLowerCase().normalize('NFKC').replace(/[_–—-]/g,' ').replace(/[^a-z0-9.]+/g,' ').trim().replace(/\s+/g,' ');
export function normaliseSearch(value){
 let text=basic(value);
 for(const [from,to] of Object.entries(aliases).filter(([key])=>key.includes(' ')))text=text.replace(new RegExp(`\\b${from}\\b`,'g'),to);
 return text.split(' ').map(word=>aliases[word]??word).join(' ');
}
export const cleanSearchQuery=value=>String(value??'').trim().replace(/\s+/g,' ').slice(0,100);
const tokens=value=>normaliseSearch(value).split(' ').filter(Boolean);
const tokenMatches=(term,word)=>/^ca\d/.test(term)?word===term||word.startsWith(term+'.'):word===term||term.length>=3&&word.startsWith(term);
const matches=(terms,fields)=>terms.every(term=>fields.some(field=>tokens(field).some(word=>tokenMatches(term,word))));

export function searchGroups(bank,type,query,{focusNames={},recipeNames={}}={}){
 const terms=tokens(cleanSearchQuery(query));
 if(!terms.length)return [];
 const groups=new Map();
 for(const q of bank){
  if(q.retired)continue;
  const key=type===3?`${q.focus}:${q.recipe}`:q.focus;
  const group=groups.get(key)??{key,type,focus:q.focus,recipe:q.recipe,label:focusNames[q.focus]??q.focus,recipeLabel:recipeNames[q.recipe]??q.recipe,questions:[],matches:new Map(),rank:0,topics:new Set()};
  groups.set(key,group);group.questions.push(q);
  const found=[];
  q.variations.forEach((v,variation)=>{
   const refs=v.parts.flatMap(p=>p.coverage??[]);
   const concepts=refs.flatMap(link=>(link.elements??[]).map(key=>searchTopics[link.focus]?.[key]).filter(Boolean));
   const caTags=[...(type===1?[]:q.tags??[]),...(v.tags??[])].filter(tag=>/^CA\d+(?:\.\d+)+$/.test(tag));
   const referenceFields=[q.focus,...refs.map(link=>link.focus),...caTags];
   const taggedLabels=caTags.flatMap(ref=>{
    const parts=ref.split('.');
    return parts.slice(1).map((_,index)=>searchReferenceLabels[parts.slice(0,index+2).join('.')]).filter(Boolean);
   });
   const topicFields=[focusNames[q.focus]??q.focus,recipeNames[q.recipe]??q.recipe,...concepts,...taggedLabels,
    ...(q.tags??[]).filter(tag=>type!==1||!/^CA\d/.test(tag)),...(q.keywords??[]),...(searchKeywords[type]?.[q.slot]??[]),
    ...(v.tags??[]),...(v.skills??[]),...(v.keywords??[]),...v.parts.flatMap(p=>p.keywords??[])].filter(Boolean);
   // No prompts, snippets, hints, options, answers, or revealed/decoded marking data.
   if(!matches(terms,[...referenceFields,...topicFields,q.title]))return;
   const rank=matches(terms,referenceFields)?400:matches(terms,topicFields)?300:100;
   const labels=[...concepts,...taggedLabels,...(v.skills??[]),...(q.tags??[]),...(searchKeywords[type]?.[q.slot]??[])].filter(label=>matches(terms,[label])).slice(0,4);
   found.push({variation,rank});group.rank=Math.max(group.rank,rank);
   labels.forEach(label=>group.topics.add(label));
  });
  if(found.length)group.matches.set(q.slot,found);
 }
 return [...groups.values()].filter(g=>g.matches.size).sort((a,b)=>b.rank-a.rank||b.matches.size-a.matches.size||a.label.localeCompare(b.label));
}
const marks=v=>v.parts.reduce((sum,p)=>sum+p.marks,0);
const slotsKey=entries=>entries.map(e=>e.slot).sort((a,b)=>a-b).join(',');
function shuffled(values,random){
 const list=[...values];if(!random)return list;
 for(let i=list.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[list[i],list[j]]=[list[j],list[i]];}return list;
}
function findSet(group,target,{previous=null,mode='new',random=null}={}){
 const size=group.type===2?2:3;
 const match=(q,i)=>group.matches.get(q.slot)?.some(v=>v.variation===i)??false;
 const pool=shuffled(group.questions,random).sort((a,b)=>Number(group.matches.has(b.slot))-Number(group.matches.has(a.slot)));
 const limits=group.type===1?[15,22]:group.type===2?[10,15]:[0,Infinity];
 if(mode==='permutation'){
  if(!previous||previous.entries.length!==size)return null;
  const ordered=previous.entries.map(e=>pool.find(q=>q.slot===e.slot));
  if(ordered.some(q=>!q))return null;
  return build(ordered,0,[],0,0,true);
 }
 return build(pool,0,[],0,0,false);
 function build(questions,start,entries,total,hits,permutation){
  if(total>limits[1]||hits>target||hits+size-entries.length<target)return null;
  if(entries.length===size){
   if(total<limits[0]||hits!==target)return null;
   if(!permutation&&previous&&slotsKey(entries)===slotsKey(previous.entries))return null;
   return {entries,total,matched: hits,related:size-hits};
  }
  const end=permutation?start+1:questions.length;
  for(let index=start;index<end;index++){
   const q=questions[index];
   if(group.type===2&&entries.some(e=>pool.find(item=>item.slot===e.slot).format===q.format))continue;
   const options=shuffled(q.variations.map((_,i)=>i),random);
   for(const variation of options){
    if(permutation&&variation===previous.entries[entries.length].variation)continue;
    if(group.type===3&&entries.length&&variation!==entries[0].variation)continue;
    const result=build(questions,index+1,[...entries,{slot:q.slot,variation}],total+marks(q.variations[variation]),hits+Number(match(q,variation)),permutation);
    if(result)return result;
   }
  }
  return null;
 }
}
export function searchPlan(group){
 const size=group.type===2?2:3;
 for(let count=Math.min(size,group.matches.size);count>=1;count--){const plan=findSet(group,count);if(plan)return plan;}
 return null;
}
export function chooseSearchEntries(group,{previous=null,mode='new',random=Math.random}={}){
 const best=searchPlan(group);
 if(!best)return null;
 return findSet(group,best.matched,{previous,mode,random});
}
export function searchSetMatches(group,entries){
 return entries.filter(e=>group.matches.get(e.slot)?.some(v=>v.variation===e.variation)).length;
}
