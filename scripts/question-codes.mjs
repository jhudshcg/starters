import {readFile,writeFile} from 'node:fs/promises';
import {banks} from '../js/bank.js';
import {snapshotBanks,nextHistory,compatibilityModule} from './question-identities.mjs';
const historyURL=new URL('../data/code-history.json',import.meta.url);
const moduleURL=new URL('../js/code-compatibility.js',import.meta.url);
let history=JSON.parse(await readFile(historyURL,'utf8'));
const snapshot=snapshotBanks(banks);
if(process.argv.includes('--update')){
  history=nextHistory(history,snapshot);
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
