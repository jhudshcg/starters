/** Public consumer checks: all authored answer kinds, state isolation and rendering. */
import test from 'node:test';
import assert from 'node:assert/strict';
import puzzles from '../catalogue.js';
import {evaluatePuzzle,maximumMark} from '../evaluation.js';
import {renderPart,renderHint,renderSolution} from '../ui/render.js';

test('every variation marks through the package alone, without mutation or implicit reveal',()=>{
 for(const question of puzzles)for(const variation of question.variations){
  const answers=Object.fromEntries(variation.parts.map(part=>[part.id,part.answer]));
  const before=JSON.stringify(answers),result=evaluatePuzzle(variation,answers);
  assert.equal(result.earned,maximumMark(variation),question.id+'/'+variation.id);
  assert.equal(result.maximum,result.earned);assert.equal(result.complete,true);
  assert.equal(JSON.stringify(answers),before);
  assert.equal(evaluatePuzzle(variation,{}).earned,0);
  for(const part of variation.parts){
   const markup=renderPart(part,'',{instanceId:'consumer',tools:false,assistance:false});
   assert.ok(!markup.includes('data-challenge-action="reset"'));
   assert.ok(!markup.includes('data-challenge-action="go-hint"'));
  }
 }
});
test('maximum marks do not inspect answers; partial credit and dependencies remain explicit',()=>{
 const puzzle={parts:[{id:'0',kind:'algebra',marks:2,answer:'2x+3',variables:['x'],algebraForm:'simplified',equivalentMarks:1}]};
 assert.equal(maximumMark({parts:[{marks:2,get answer(){throw Error('answer accessed');}}]}),2);
 assert.equal(evaluatePuzzle(puzzle,{'0':'x+x+3'}).earned,1);
 assert.equal(evaluatePuzzle(puzzle,{'0':'2x+4'}).earned,0);
 assert.equal(evaluatePuzzle(puzzle,{'0':'x+x+3'}).complete,false);
});
test('rendering escapes text, namespaces controls and preserves explicit hints/solutions',()=>{
 const puzzle={hint:'Try <x>',parts:[{id:'0',kind:'number',marks:1,prompt:'Find <x>',answer:'42',explanation:'It is <42>.'}]};
 assert.ok(renderPart(puzzle.parts[0],'"<',{instanceId:'one'}).includes('answer-one-0'));
 assert.ok(renderPart(puzzle.parts[0],'"<',{instanceId:'two'}).includes('&quot;&lt;'));
 assert.ok(renderHint(puzzle).includes('Try &lt;x&gt;'));
 assert.ok(renderSolution(puzzle).includes('It is &lt;42&gt;.'));
 assert.throws(()=>renderPart(puzzle.parts[0],'',{instanceId:'bad"id'}));
});
