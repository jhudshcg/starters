// Read-only audit of the archived classroom-era bank and the current authoring bank.
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import * as currentBank from '../js/bank.js';
import * as currentCodes from '../js/codes.js';

function audit(bank,codes,label){
 let individual=0,sets=0;
 for(const [type,questions] of bank.banks.entries()){
  for(const q of questions)for(let variation=0;variation<q.variations.length;variation++){
   const fields={version:codes.BANK_VERSION,type,entries:[{slot:q.slot,variation}],minutes:null};
   const code=codes.encode(fields),opened=bank.resolve(code);
   assert.deepEqual(codes.decode(code),fields);assert.equal(opened.questions[0].slot,q.slot);assert.equal(opened.questions[0].variation,variation);
   assert.deepEqual(bank.resolve(codes.questionCode(type,q.slot,variation)).questions,opened.questions);individual++;
  }
  for(const focus of bank.focuses(type))for(let trial=0;trial<20;trial++){
   const generated=bank.choose(type,focus),opened=bank.resolve(generated.code);
   assert.deepEqual(opened.questions,generated.questions);
   for(const minutes of [null,5,10,15]){
    const shared=codes.encode({...generated,minutes});
    assert.equal(bank.resolve(shared).minutes,minutes);assert.deepEqual(bank.resolve(shared).questions,generated.questions);sets++;
   }
  }
 }
 console.log(`${label}: ${individual} individual variations and ${sets} generated/timed sets reopen identically.`);
}
const directory=await mkdtemp(join(tmpdir(),'starters-code-audit-'));
try{
 const archive=execFileSync('git',['archive','45cc13e','js','data','package.json'],{maxBuffer:16*1024*1024});
 execFileSync('tar',['-xf','-','-C',directory],{input:archive});
 const bank=await import(pathToFileURL(join(directory,'js/bank.js'))),codes=await import(pathToFileURL(join(directory,'js/codes.js')));
 audit(bank,codes,'14 September commit 45cc13e');
 audit(currentBank,currentCodes,'Current bank');
 console.log('No generation/resolution mismatch reproduced. The exact classroom failing code and loaded release remain unknown.');
}finally{await rm(directory,{recursive:true,force:true});}
