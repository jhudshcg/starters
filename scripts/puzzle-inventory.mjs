import {writeFile} from 'node:fs/promises';
import puzzles from '../data/puzzles.js';
const report={date:'2026-09-24',total:puzzles.length,families:[...new Set(puzzles.map(q=>q.focus))].map(focus=>{
  const bank=puzzles.filter(q=>q.focus===focus&&!q.retired);
  return {focus,templates:bank.length,variations:bank.reduce((sum,q)=>sum+q.variations.length,0),levels:bank.reduce((out,q)=>(out[q.challengeLevel]=(out[q.challengeLevel]??0)+1,out),{})};
})};
await writeFile(new URL('../data/coverage/puzzle-inventory.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(`Recorded ${report.total} puzzle templates across ${report.families.length} families.`);
