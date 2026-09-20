// Build the staged source, not the working tree. Never stage source on the user's behalf.
import {execFileSync} from 'node:child_process';
import {mkdtempSync,rmSync,symlinkSync,existsSync,cpSync,readFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'});
const root=git('rev-parse','--show-toplevel').trim();
const temporary=mkdtempSync(join(tmpdir(),'starters-commit-'));
try {
  if(!existsSync(join(root,'node_modules/esbuild')))throw Error('Run npm ci before committing.');
  git('checkout-index','--all',`--prefix=${temporary}/`);
  // Installed dependencies must correspond to the staged lockfile.
  if(readFileSync(join(root,'package-lock.json'),'utf8')!==readFileSync(join(temporary,'package-lock.json'),'utf8'))throw Error('Stage the intended package-lock.json and run npm ci before committing.');
  symlinkSync(join(root,'node_modules'),join(temporary,'node_modules'),'dir');
  console.log('Building staged source into live/…');
  execFileSync(process.execPath,['scripts/build-site.mjs'],{cwd:temporary,stdio:'inherit'});
  const built=join(temporary,'live');
  if(!existsSync(join(built,'index.html')))throw Error('Build did not produce live/index.html.');
  rmSync(join(root,'live'),{recursive:true,force:true});
  cpSync(built,join(root,'live'),{recursive:true});
  git('add','-A','--','live');
  console.log('Built live/ and added it to this commit.');
} catch(error) {
  console.error('Commit stopped: '+error.message);
  process.exitCode=1;
} finally {
  rmSync(temporary,{recursive:true,force:true});
}
