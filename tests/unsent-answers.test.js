import test from 'node:test';
import assert from 'node:assert/strict';
import {hasUnsubmittedAnswers} from '../js/unsent-answers.js';
const check=(kind,raw,extra={},finished=null)=>hasUnsubmittedAnswers({answers:{1:{a:raw}},finished},{questions:[{slot:1,parts:[{id:'a',kind,...extra}]}]});
test('only entered, unsubmitted text counts, including zero',()=>{
 for(const raw of [undefined,'','  '])assert.equal(check('text',raw),false);
 for(const raw of ['answer','0',0])assert.equal(check('text',raw),true);
 assert.equal(check('text','answer',{},123),false);
});
test('puzzle selections, givens, reset and history alone are not answers',()=>{
 for(const kind of ['sudoku','cage-grid','tiling','go','cover-path','logic-grid'])assert.equal(check(kind,JSON.stringify({selected:0,noteMode:true,history:[{moves:[1]}]}),{givens:[1,0]}),false);
 assert.equal(check('sudoku',JSON.stringify({values:[1,0]}),{givens:[1,0]}),false);
 assert.equal(check('logic-grid',JSON.stringify({values:[[-1,-1]]})),false);
});
test('entered puzzle work, including notes and candidate exclusions, counts',()=>{
 for(const [kind,state] of [['sudoku',{values:[1,2]}],['cage-grid',{notes:{1:[2]}}],['tiling',{placements:[{x:0,y:0}]}],['go',{pending:0}],['go',{moves:[2]}],['cover-path',{path:[0]}],['logic-grid',{excluded:['0,0,0']}],['equation-grid',{values:[[0,-1]]}]])assert.equal(check(kind,JSON.stringify(state),{givens:[1,0]}),true,kind);
});
