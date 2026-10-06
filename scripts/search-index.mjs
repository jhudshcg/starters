import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const inventory=JSON.parse(await readFile(new URL('data/coverage/core-inventory.json',root),'utf8'));
const topics=Object.fromEntries(inventory.focuses.map(row=>[row.focus,Object.fromEntries(row.elements.filter(e=>e.status!=='retired').map(e=>[e.key,e.topic]))]));
const parentLabels={
 'CA1.1':'Computational thinking','CA1.2':'Algorithmic design','CA1.3':'Problem-solving strategies',
 'CA2.1':'Data types','CA2.2':'Variables and constants','CA2.3':'Data structures',
 'CA2.4':'Operators','CA2.5':'Input and output','CA2.6':'Sequence, selection and iteration',
 'CA2.7':'Functions and procedures','CA2.8':'Validation','CA2.9':'Design and code style',
 'CA2.10':'Robust code','CA2.11':'Searching and sorting','CA2.12':'Testing'
};
// Use the subsection's own description, not its list of child concepts: a broad
// tag must not make a list task match dictionary or an iteration task match if.
const referenceLabels={...parentLabels,...Object.fromEntries(inventory.focuses.map(row=>[row.focus,row.source_text.split(/\n\s*-/)[0].replace(/\s+/g,' ').replace(/:$/,'').trim()]))};
const output='// Generated from core-inventory.json; curriculum labels only, never answers.\nexport const searchTopics = '+JSON.stringify(topics,null,2)+';\nexport const searchReferenceLabels = '+JSON.stringify(referenceLabels,null,2)+';\n';
const path=new URL('data/search-topics.js',root);
if(process.argv.includes('--check')){
 if(await readFile(path,'utf8')!==output)throw Error('Search topics are stale. Run npm run search:index.');
}else await writeFile(path,output);
