import test from 'node:test';
import assert from 'node:assert/strict';
import {initialisePractice,settlePractice,engagePractice,notePracticeInteraction,pollPractice,pausePractice,practiceSeconds,validPracticeTime,backupFilename} from '../js/practice-time.js';
import {weeklyProgress} from '../js/weekly-progress.js';
import {exportCSV} from '../js/progress.js';
const attempt=()=>({started:0,deadline:null,finished:null});
test('idle time is capped at two minutes, resumes without charging the idle gap, and settles once',()=>{
 const a=attempt();engagePractice(a,0);settlePractice(a,119999);assert.equal(a.practiceClock.milliseconds,119999);
 settlePractice(a,120000);settlePractice(a,180000);assert.equal(a.practiceClock.milliseconds,120000);
 engagePractice(a,240000);pausePractice(a,255000);assert.equal(a.practiceClock.milliseconds,135000);
 settlePractice(a,500000);assert.equal(a.practiceClock.milliseconds,135000);
});
test('regular interaction extends measurement, visibility/navigation pauses exclude absence, reload checkpoints survive',()=>{
 const a=attempt();engagePractice(a,0);engagePractice(a,50000);pausePractice(a,70000);assert.equal(a.practiceClock.milliseconds,70000);
 const saved=JSON.parse(JSON.stringify(a));engagePractice(saved,1000000);pausePractice(saved,1010000);
 assert.equal(saved.practiceClock.milliseconds,80000);
});
test('deadline remains absolute; measurement caps at deadline and starting a new countdown does not reset it',()=>{
 const a=attempt();a.deadline=90000;engagePractice(a,0);engagePractice(a,50000);settlePractice(a,120000);
 assert.equal(a.practiceClock.milliseconds,90000);assert.equal(a.deadline,90000);
 a.deadline=500000;engagePractice(a,150000);pausePractice(a,160000);assert.equal(a.practiceClock.milliseconds,100000);
});
test('legacy duration falls back to elapsed, measurements validate and CSV includes both bases',()=>{
 assert.equal(practiceSeconds({seconds:100}),100);assert.equal(practiceSeconds({seconds:100,engagedSeconds:0}),0);
 assert.ok(validPracticeTime({seconds:100}));
 const r={started:0,finished:100000,seconds:100,engagedSeconds:60,practiceMeasuredFrom:0};
 assert.ok(validPracticeTime(r));for(const patch of [{engagedSeconds:-1},{engagedSeconds:101},{engagedSeconds:'60'},{practiceMeasuredFrom:-1},{practiceMeasuredFrom:100001}])assert.equal(validPracticeTime({...r,...patch}),false);
 assert.match(exportCSV([r]),/engagedSeconds,practiceMeasuredFrom,totalSeconds/);
 const now=Date.now(),weeks=weeklyProgress([{finished:now,seconds:600,engagedSeconds:60,percentage:100},{finished:now,seconds:120,percentage:50}],now);
 assert.equal(weeks.at(-1).minutes,3);
});
test('filename preserves readable usernames and uses a safe local timestamp and json extension',()=>{
 assert.equal(backupFilename('Joe Hudson',new Date(2026,9,5,14,3,9)),'tlevel-practice-Joe Hudson-2026-10-05-140309.json');
 assert.ok(!/[<>:"/\\|?*]/.test(backupFilename('A/B:C*?<>"|\\',new Date())));
 const a=attempt();initialisePractice(a,500);assert.equal(a.practiceClock.measuredFrom,500);assert.equal(a.practiceClock.milliseconds,0);
});

test('mouse bursts only flag interaction; five-second polling renews the expiry once',()=>{
 const a=attempt();engagePractice(a,0);notePracticeInteraction(a,1000);
 for(let i=1001;i<4000;i++)notePracticeInteraction(a,i);
 assert.equal(a.practiceClock.expiresAt,120000);assert.equal(a.practiceClock.milliseconds,0);assert.equal(a.saved,1000);
 pollPractice(a,5000);assert.equal(a.practiceClock.expiresAt,125000);assert.equal(a.practiceClock.interacted,false);
 pollPractice(a,10000);assert.equal(a.practiceClock.expiresAt,125000);
 pollPractice(a,130000);assert.equal(a.practiceClock.running,false);assert.equal(a.practiceClock.milliseconds,125000);
 notePracticeInteraction(a,200000);assert.equal(a.practiceClock.running,true);assert.equal(a.practiceClock.milliseconds,125000);
 pausePractice(a,210000);assert.equal(a.practiceClock.milliseconds,135000);
});
test('poll handles delayed callbacks, pause clears pending flags, and old clocks migrate',()=>{
 const a=attempt();engagePractice(a,0);notePracticeInteraction(a,1000);pollPractice(a,500000);
 assert.equal(a.practiceClock.milliseconds,120000);
 pausePractice(a,500000);pollPractice(a,600000);assert.equal(a.practiceClock.running,false);
 a.practiceClock={milliseconds:2000,measuredFrom:0,accountedAt:2000,lastActivity:1000,running:false};
 engagePractice(a,900000);assert.equal(a.practiceClock.milliseconds,2000);assert.equal(a.practiceClock.expiresAt,1020000);
});
