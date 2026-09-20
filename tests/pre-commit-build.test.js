import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync,existsSync} from 'node:fs';
import {execFileSync,spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
const runner=resolve('scripts/pre-commit-build.mjs');
test('commit builder uses staged source, stages generated files and preserves unstaged edits; failure leaves live intact',()=>{
 const root=mkdtempSync(join(tmpdir(),'starters-hook-test-'));
 const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8'});
 try{
  git('init','-q');mkdirSync(join(root,'scripts'));mkdirSync(join(root,'node_modules/esbuild'),{recursive:true});
  writeFileSync(join(root,'package-lock.json'),'{}');writeFileSync(join(root,'source.txt'),'staged');
  writeFileSync(join(root,'scripts/build-site.mjs'),`import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';mkdirSync('live',{recursive:true});writeFileSync('live/index.html',readFileSync('source.txt'));`);
  git('add','scripts','source.txt','package-lock.json');writeFileSync(join(root,'source.txt'),'unfinished');
  execFileSync(process.execPath,[runner],{cwd:root});
  assert.equal(git('show',':live/index.html'),'staged');assert.equal(readFileSync(join(root,'source.txt'),'utf8'),'unfinished');
  assert.equal(git('show',':source.txt'),'staged');
  writeFileSync(join(root,'scripts/build-site.mjs'),'throw Error("broken build");');git('add','scripts');
  const failed=spawnSync(process.execPath,[runner],{cwd:root,encoding:'utf8'});
  assert.equal(failed.status,1);assert.match(failed.stderr,/Commit stopped/);
  assert.equal(git('show',':live/index.html'),'staged');assert.equal(readFileSync(join(root,'live/index.html'),'utf8'),'staged');
  assert.ok(!existsSync(join(root,'node_modules/node_modules')));
 }finally{rmSync(root,{recursive:true,force:true});}
});
