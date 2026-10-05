import test from 'node:test';
import assert from 'node:assert/strict';
import {lastTracked,weeklyProgress,averageSetPercentage} from '../js/weekly-progress.js';
const at=(day,hour=12)=>new Date(2026,9,day,hour).getTime();
const row=(day,percentage,seconds=60)=>({finished:at(day),percentage,seconds});
test('weekly stats count sets equally, keep empty weeks distinct from zero and exclude future records',()=>{
 const weeks=weeklyProgress([row(4,100),row(5,0),row(5,80),row(6,100)],at(5,23));
 assert.equal(weeks.length,8);assert.equal(weeks.at(-1).count,2);assert.equal(weeks.at(-1).average,40);assert.equal(weeks.at(-1).days,1);
 assert.equal(weeks.at(-2).average,100);assert.equal(weeks.at(-3).average,null);
 assert.equal(weeklyProgress([row(5,0)],at(5,23)).at(-1).average,0);
 assert.equal(weeks.at(-1).minutes,2);
});
test('week boundaries use local Mondays across the UK daylight-saving change',()=>{
 const prior=process.env.TZ;process.env.TZ='Europe/London';
 try{
  const weeks=weeklyProgress([{finished:new Date(2026,9,25,23,59).getTime(),percentage:50,seconds:0},{finished:new Date(2026,9,26,0,0).getTime(),percentage:90,seconds:0}],new Date(2026,9,26,12).getTime());
  assert.equal(weeks.at(-2).count,1);assert.equal(weeks.at(-1).count,1);
  assert.equal(weeks.at(-2).end-weeks.at(-2).start,169*3600000);
 }finally{if(prior===undefined)delete process.env.TZ;else process.env.TZ=prior;}
});
test('last tracked date uses all history and handles an empty profile',()=>{
 assert.equal(lastTracked([]),null);assert.equal(lastTracked([row(5,0),row(4,100)]),at(5));
});

test('percentage averages normalise different set maxima and round only the final mean',()=>{
 const rows=[{...row(5,50),earned:1,max:2},{...row(5,90),earned:9,max:10}];
 assert.equal(averageSetPercentage(rows),70);
 assert.equal(weeklyProgress(rows,at(5,23)).at(-1).average,70);
 const rounding=[{earned:2,max:3,percentage:67},{earned:1,max:2,percentage:50}];
 assert.equal(Math.round(averageSetPercentage(rounding)),58); // Averaging rounded percentages would produce 59%.
 assert.equal(averageSetPercentage([]),null);
 assert.equal(averageSetPercentage([{percentage:40},{percentage:80}]),60);
});
