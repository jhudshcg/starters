import test from 'node:test';
import assert from 'node:assert/strict';
import {BANK_VERSION,encode} from '../js/codes.js';
import {banks, resolve} from '../js/bank.js';
import {markQuestion} from '../js/marking.js';
import {pack, packBank} from '../scripts/pack-bank.mjs';
import {unpack, markingPart, revealPart, playTree} from '../js/packed-data.js';
import {playGo} from '../js/go-rules.js';
import {rotatePayload,PAYLOAD_ROTATION} from '../js/payload-alphabet.js';
import {unzlibSync} from 'fflate';

test('all production parts keep answers sealed and match source scoring and reveals',()=>{
 for(const bank of banks){
  const encoded=pack(packBank(bank)),packed=unpack(encoded);
  assert.ok(!encoded.includes(bank[0].title));
  for(const [qi,q] of bank.entries())for(const [vi,v] of q.variations.entries()){
   const production=packed[qi].variations[vi],before=JSON.stringify(production);
   const answers=Object.fromEntries(v.parts.map(p=>[p.id,p.answer]));
   assert.deepEqual(markQuestion(production,answers),markQuestion(v,answers));
   assert.deepEqual(markQuestion(production),markQuestion(v));
   assert.deepEqual(markQuestion(production,Object.fromEntries(v.parts.map(p=>[p.id,'wrong']))),markQuestion(v,Object.fromEntries(v.parts.map(p=>[p.id,'wrong']))));
   for(const [i,p] of production.parts.entries()){
    for(const field of ['answer','accepted','typos','termRules','explanation','solutionText','tree'])assert.ok(!(field in p));
    assert.equal(markingPart(p).answer,v.parts[i].answer);
    assert.equal(markingPart(p).explanation,undefined);
    assert.equal(revealPart(p).answer,v.parts[i].answer);
    assert.equal(revealPart(p).explanation,v.parts[i].explanation);
    assert.equal(revealPart(p).solutionText,v.parts[i].solutionText);
    if(v.parts[i].tree)assert.deepEqual(playTree(p),v.parts[i].tree);
   }
   assert.equal(JSON.stringify(production),before,'Decoding must not mutate the bank');
  }
 }
});
test('checking does not touch reveal payloads; reveal does not touch marking payloads',()=>{
 const v=packBank(banks[1])[1].variations[1];
 const p=v.parts[1];
 assert.equal(markQuestion({parts:[{...p,revealData:'invalid'}]},{[p.id]:'printing_cost'})[0].earned,1);
 assert.equal(revealPart({...p,checkData:'invalid'}).answer,'printing_cost');
 assert.throws(()=>markingPart({...p,checkData:'invalid'}),/could not be decoded/);
 assert.throws(()=>unpack(pack({format:999}).slice(3)),/could not be decoded/);
});
test('Go can decode its playing tree without revealing a model answer',()=>{
 const source=banks[0].find(q=>q.focus==='go').variations[0].parts[0];
 const packed=packBank([{variations:[{parts:[source]}]}])[0].variations[0].parts[0];
 const first=JSON.parse(source.answer).moves[0];
 assert.deepEqual(playGo({...packed,revealData:'invalid'},{moves:[]},first),playGo(source,{moves:[]},first));
 assert.equal(packed.tree,undefined);
});
test('Unicode and original question identities survive packaging',()=>{
 const sample={text:'£2 · ≥ 16 · 5–15 minutes · café · × ◇'};
 assert.deepEqual(unpack(pack(sample)),sample);
 assert.deepEqual(resolve(encode({version:BANK_VERSION,type:1,entries:[{slot:1,variation:1},{slot:2,variation:1},{slot:4,variation:0}]})).entries,[{slot:1,variation:1},{slot:2,variation:1},{slot:4,variation:0}]);
});
test('payload rotation preserves padding and defeats plain Base64-plus-zlib decoding',()=>{
 const text='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/==';
 assert.equal(rotatePayload(rotatePayload(text,PAYLOAD_ROTATION),-PAYLOAD_ROTATION),text);
 const data={answer:'printing_cost',explanation:'£2 per hour'},payload=pack(data);
 assert.throws(()=>unzlibSync(Uint8Array.from(atob(payload),c=>c.charCodeAt(0))));
 assert.deepEqual(unpack(payload),data);
 assert.throws(()=>rotatePayload('bad!',PAYLOAD_ROTATION));
});
