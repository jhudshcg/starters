/**
 * Purpose: protect legal Go exploration and staged recorded-reply behaviour.
 * Main contents: captures, suicide/ko, unrecorded play, hints and saved replies.
 * Used by: npm test. Uses: package Go rules. Libs: node:test/assert.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {applyGoMove,goPosition,playGo,completeGoReply,nextGoHint,markGo} from '../rules/go-rules.js';
import puzzles from '../catalogue.js';

const sacrifice=()=>{
 const board='...W.W.W.',after=applyGoMove(board,3,'b',4).board;
 const reply={move:1,colour:'w',board:applyGoMove(after,3,'w',1).board,children:[],failure:true};
 return {kind:'go',size:3,player:'b',marks:3,view:[0,0,2,2],tree:{board,children:[{move:4,colour:'b',board:after,children:[reply]}]}};
};
test('a sacrifice remains visible until its deferred reply, with one-turn Undo history',()=>{
 const p=sacrifice(),history=[{moves:[]}],first=playGo(p,{history},4,{deferReply:true}).state;
 assert.deepEqual(first.moves,[4]);assert.equal(goPosition(p,first.moves).board[4],'B');
 assert.equal(first.replyMove,1);assert.ok(playGo(p,first,0).error);assert.equal(nextGoHint(p,first),null);
 const final=completeGoReply(p,JSON.parse(JSON.stringify(first)));
 assert.deepEqual(final.moves,[4,1]);assert.equal(goPosition(p,final.moves).board[4],'.');
 assert.equal(final.replyMove,undefined);assert.deepEqual(final.history,history);
 assert.deepEqual(playGo(p,{},4).state.moves,[4,1]);
});
test('legal unrecorded moves are actual stones and can be explored and replayed',()=>{
 const p={...sacrifice(),tree:{board:'.'.repeat(9),children:[]}};
 const first=playGo(p,{},4).state,second=playGo(p,first,1).state;
 assert.deepEqual(second.moves,[4,1]);
 assert.equal(goPosition(p,second.moves).board,'.W..B....');
 assert.equal(goPosition(p,first.moves).recorded,false);
 assert.match(markGo(p,first).message,/No recorded response/);
 assert.equal(markGo(p,first).earned,0);assert.equal(nextGoHint(p,first),null);
 assert.ok(playGo(p,first,4).error);
});
test('unrecorded captures obey liberties and reject suicide and immediate ko',()=>{
 const p=sacrifice();p.tree.children=[];
 let state=playGo(p,{},4).state;state=playGo(p,state,1).state;
 assert.equal(goPosition(p,state.moves).board[4],'.');
 assert.ok(applyGoMove('.W.W.W.W.',3,'b',4).error);
 // Black captures the single centre white stone; White cannot immediately recapture.
 const cells=Array(25).fill('.');for(const i of [7,11,17])cells[i]='B';for(const i of [12,8,14,18])cells[i]='W';
 const board=cells.join(''),capture=applyGoMove(board,5,'b',13);
 assert.equal(capture.board[12],'.');assert.equal(capture.board[13],'B');
 assert.match(applyGoMove(capture.board,5,'w',12,board).error,/ko/);
 assert.equal(applyGoMove(capture.board,5,'w',12).board,board);
});
test('invalid exploration and stale scheduled replies cannot fabricate winning nodes',()=>{
 const p=sacrifice();assert.equal(goPosition(p,[4,4]),null);
 assert.equal(markGo(p,{moves:[4,4]}).earned,0);
 assert.deepEqual(completeGoReply(p,{moves:[],replyMove:1,replyDue:0}),{moves:[]});
 assert.equal(markGo(p,{moves:[4],pending:0}).earned,0);
});

test('legal move simulation agrees with independently imported boards on every recorded branch',()=>{
 for(const q of puzzles.filter(q=>q.type==='go'))for(const v of q.variations){
  const p=v.parts[0];
  function visit(node,previous=null){
   for(const child of node.children){
    const result=applyGoMove(node.board,p.size,child.colour,child.move,previous);
    assert.equal(result.error,undefined,`${q.id}: ${child.move}`);
    assert.equal(result.board,child.board,`${q.id}: ${child.move}`);
    visit(child,node.board);
   }
  }
  visit(p.tree);
 }
});
