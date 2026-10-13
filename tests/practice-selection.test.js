/** Focus recall is per profile/type and expires at the two-hour boundary. */
import test from 'node:test';
import assert from 'node:assert/strict';
import {rememberSelection,recalledSelection,FOCUS_RECALL_MS} from '../js/practice-selection.js';
test('focus and subsection survive for two hours without leaking across banks or profiles',()=>{
  const data={active:{examSubtopic:'CA1.2',inSequence:true}};
  rememberSelection(data,{type:1,focus:'CA1',code:'example',questions:[{}]},1000);
  assert.equal(recalledSelection(data,1,1000).subtopic,'CA1.2');
  assert.equal(recalledSelection(data,1,1000).inSequence,true);
  assert.equal(recalledSelection(data,1,1000+FOCUS_RECALL_MS-1).focus,'CA1');
  assert.equal(recalledSelection(data,1,1000+FOCUS_RECALL_MS),null);
  assert.equal(recalledSelection(data,1,999),null);
  assert.equal(recalledSelection(data,2,1000),null);
  assert.equal(recalledSelection({},1,1000),null);
  rememberSelection(data,{type:3,focus:'task2',code:'esp',questions:[{recipe:'T2.1'}]},2000);
  assert.equal(recalledSelection(data,3,2000).recipe,'T2.1');
  assert.equal(recalledSelection(data,1,2000).subtopic,'CA1.2');
});
