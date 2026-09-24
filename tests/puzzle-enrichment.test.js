import test from 'node:test';
import assert from 'node:assert/strict';
import puzzles from '../data/puzzles.js';
import maths from '../data/puzzles/maths-practice.js';
import {markChallenge} from '../js/challenge-rules.js';
import {renderChallenge} from '../js/challenge-controls.js';
import {choose,availableChallenges,puzzlePool} from '../js/bank.js';
import {markQuestion} from '../js/marking.js';

test('all puzzle families meet the 100-template floor; Go follows rank bands',()=>{
  for(const focus of new Set(puzzles.map(q=>q.focus)))assert.ok(puzzlePool(focus).length>=100,focus);
  for(const [low,high,level] of [[25,99,'beginner'],[18,24,'foundation'],[12,17,'standard'],[0,11,'stretch']]){
    const pool=puzzlePool('go',level);assert.ok(pool.length>=25,level);
    assert.ok(pool.every(q=>q.sourceRank>=low&&q.sourceRank<=high));
    assert.ok(availableChallenges('go').includes(level));
  }
});
test('rectangular paths use the true row count and reject row wrapping',()=>{
  const p={kind:'cover-path',size:3,rows:2,blocked:[],marks:3};
  assert.equal(markChallenge(p,JSON.stringify([0,1,2,5,4,3])).earned,3);
  assert.equal(markChallenge(p,JSON.stringify([0,1,2,3,4,5])).earned,0);
  assert.equal(markChallenge(p,JSON.stringify([0,1,2,5,4,3,6])).earned,0);
  const html=renderChallenge(p,'',false,0);
  assert.match(html,/viewBox="0 0 3 2"/);assert.match(html,/0 \/ 6 dots/);
});
test('small Sudoku checks boxes as well as Latin rows and columns',()=>{
  const p={kind:'sudoku',size:4,boxRows:2,boxCols:2,givens:Array(16).fill(0),marks:3};
  assert.equal(markChallenge(p,JSON.stringify([1,2,3,4,3,4,1,2,2,1,4,3,4,3,2,1])).earned,3);
  assert.equal(markChallenge(p,JSON.stringify([1,2,3,4,2,3,4,1,3,4,1,2,4,1,2,3])).earned,0);
  for(const q of puzzles.filter(q=>q.focus==='sudoku'))for(const v of q.variations)assert.equal(markChallenge(v.parts[0],v.parts[0].answer).earned,3);
});
test('guided tangrams retain complete geometric marking',()=>{
  const q=puzzles.find(q=>q.focus==='tangrams'&&q.variations[0].parts[0].guides?.length===2),p=q.variations[0].parts[0];
  assert.equal(markChallenge(p,p.answer).earned,3);
  const placements=JSON.parse(p.answer);placements[6]=null;
  assert.equal(markChallenge(p,JSON.stringify(placements)).earned,0);
  assert.match(renderChallenge(p,'',false,q.slot),/stroke-dasharray/);
});
test('maths topic and level constrain selections and new permutations',()=>{
  for(const level of ['beginner','foundation','standard','stretch']){
    const first=choose(0,'classic maths',null,'new',level,'algebra');
    assert.ok(first.questions.every(q=>q.challengeLevel===level&&q.tags.includes('maths:algebra')));
    const next=choose(0,'classic maths',first,'new',level,'algebra');
    assert.notDeepEqual(next.entries.map(e=>e.slot).sort(),first.entries.map(e=>e.slot).sort());
    const variant=choose(0,'classic maths',first,'permutation',level,'algebra');
    assert.equal(variant.mathsTopic,'algebra');
    assert.deepEqual(variant.entries.map(e=>e.slot),first.entries.map(e=>e.slot));
    assert.ok(variant.entries.every((e,i)=>e.variation!==first.entries[i].variation));
  }
});
test('every new maths model passes and lower-level tasks retain Foundation ceilings',()=>{
  for(const q of maths){
    if(['beginner','foundation'].includes(q.challengeLevel))assert.equal(q.mathsTier,'GCSE Foundation');
    for(const v of q.variations)assert.ok(markQuestion(v,Object.fromEntries(v.parts.map(p=>[p.id,p.answer]))).every(r=>r.earned===r.max),q.title);
    if(q.title.startsWith('Rearrange'))assert.ok(q.variations.every(v=>v.parts.filter(p=>p.kind==='algebra').every(p=>p.algebraForm==='rearranged'&&p.equivalentMarks===1)));
  }
});
