/** Real compiled GNU Go estimates, plus cancellation of the optional browser worker. */
import test from 'node:test';
import assert from 'node:assert/strict';
import createGnuGo from '../../../engines/gnugo/gnugo.js';
import {createGnuGoEstimator} from '../ui/gnugo-client.js';
const engine=await createGnuGo();
const estimate=(size,board,komi=6.5,turn=1)=>JSON.parse(engine.ccall('estimate_position','string',
  ['number','string','number','number'],[size,board,turn,komi]));
test('GNU Go handles supported sizes, komi, open corners and colour reversal',()=>{
  for(const size of [5,9,13,19]) {
    const result=estimate(size,'.'.repeat(size*size));
    assert.equal(result.lead,6.5); assert.equal(result.ownership,'.'.repeat(size*size));
  }
  const board=Array(81).fill('.');
  for(const i of [13,24,34])board[i]='B';
  for(const i of [46,56,67])board[i]='W';
  const plain=board.join(''),result=estimate(9,plain,0);
  assert.equal(result.ownership[8],'B'); assert.equal(result.ownership[72],'W');
  assert.equal(result.ownership[40],'.');
  assert.ok(Math.abs(estimate(9,plain,6.5).lead-result.lead-6.5)<.002);
  const reversed=estimate(9,plain.replace(/[BW]/g,c=>c==='B'?'W':'B'),0,2);
  assert.ok(Math.abs(result.lead+reversed.lead)<.01);
});
test('worker is lazy, reused after success and terminated on cancelled analysis', async()=>{
  const workers=[];
  const client=createGnuGoEstimator('/engine/worker.js',()=>{
    const worker={postMessage(data){this.request=data;},terminate(){this.stopped=true;}};
    workers.push(worker);return worker;
  });
  assert.equal(workers.length,0);
  const position={size:5,board:'.'.repeat(25),komi:6.5,turn:'b'};
  const first=client.estimate(position);
  workers[0].onmessage({data:{id:workers[0].request.id,result:{lead:6.5,ownership:'.'.repeat(25)}}});
  assert.equal((await first).lead,6.5);
  const abort=new AbortController(),second=client.estimate(position,abort.signal);
  const rejected=assert.rejects(second,{name:'AbortError'});
  abort.abort();await rejected;
  assert.equal(workers.length,1);assert.equal(workers[0].stopped,true);
  const third=client.estimate(position);
  assert.equal(workers.length,2);
  workers[1].onmessage({data:{id:workers[1].request.id,error:'Engine unavailable'}});
  await assert.rejects(third,/Engine unavailable/);
  assert.equal(workers[1].stopped,true);client.dispose();
});
