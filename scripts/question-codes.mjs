import {bankRelease} from '../js/bank-release.js';
import {readFile,writeFile} from 'node:fs/promises';
import {banks} from '../js/bank.js';
import {snapshotBanks,nextHistory,compatibilityModule,rolloverHistory} from './question-identities.mjs';
const historyURL=new URL('../data/code-history.json',import.meta.url);
const moduleURL=new URL('../js/code-compatibility.js',import.meta.url);
let history=JSON.parse(await readFile(historyURL,'utf8'));
const snapshot=snapshotBanks(banks);
if(process.argv.includes('--update')){
  const rollover=process.argv.find(arg=>arg.startsWith('--rollover-date='));
  if(rollover){
    const next=rolloverHistory(history,snapshot,bankRelease,rollover.slice('--rollover-date='.length));
    await writeFile(new URL(`../data/code-history-generation-${bankRelease.generation}.json`,import.meta.url),JSON.stringify(history,null,2)+'\n',{flag:'wx'});
    await writeFile(new URL('../js/bank-release.js',import.meta.url),`// Release-wide generation; updated by codes:update.\nexport const bankRelease = ${JSON.stringify(next.release)};\nexport const CODE_FORMAT='54-bank3';\n`);
    history=next.history;
  }else history=nextHistory(history,snapshot);
  await writeFile(historyURL,JSON.stringify(history,null,2)+'\n');
  await writeFile(moduleURL,compatibilityModule(history));
  console.log(`Prepared question revision ${Math.max(...Object.keys(history).map(Number))}. Unchanged older entries remain valid.`);
}else{
  const latest=history[Math.max(...Object.keys(history).map(Number))];
  if(JSON.stringify(latest)!==JSON.stringify(snapshot)||await readFile(moduleURL,'utf8')!==compatibilityModule(history)){
    throw Error('Question identities need updating. Run npm run codes:update after completing the question edits, then validate again.');
  }
  console.log('Question revisions and compatibility records match the authored banks.');
}
