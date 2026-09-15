// Ship only a bundled production application. Authoring banks stay in the repo.
import {mkdir, readFile, rm, writeFile, cp} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join, relative} from 'node:path';
import {build} from 'esbuild';
import './question-codes.mjs';
import {banks, validateBank} from '../js/bank.js';
import {pack, packBank} from './pack-bank.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const output=join(root,'_site');
const errors=validateBank();
if(errors.length)throw Error(errors.join('\n'));
await rm(output,{recursive:true,force:true});
await mkdir(output);
const packed=new Map(['puzzles','exam','python'].map((name,i)=>[join(root,'data',name+'.js'),pack(packBank(banks[i]))]));
const result=await build({
  absWorkingDir:root,entryPoints:['js/app.js','css/styles.css','css/puzzles.css','css/challenges.css'],
  outdir:output,entryNames:'assets/[name]-[hash]',bundle:true,format:'esm',platform:'browser',
  target:['es2022'],minify:true,sourcemap:false,metafile:true,legalComments:'eof',
  plugins:[{name:'encoded-question-banks',setup(builder){
    builder.onLoad({filter:/[/\\]data[/\\](puzzles|exam|python)\.js$/},args=>({
      contents:`import {unpack} from './js/packed-data.js';export default unpack(${JSON.stringify(packed.get(args.path))});`,
      resolveDir:root,loader:'js'
    }));
  }}]
});
let html=await readFile(join(root,'index.html'),'utf8');
for(const [file,meta] of Object.entries(result.metafile.outputs)){
  if(meta.entryPoint)html=html.replaceAll(meta.entryPoint,relative(output,join(root,file)));
}
if(html.includes('src="js/')||html.includes('href="css/'))throw Error('Unbundled entry in production HTML');
html=html.replace('<main id="main" tabindex="-1"></main>', '<main id="main" tabindex="-1"><p>Loading activities…</p><p>If activities do not appear, <a href="">reload this page</a> to get the current build.</p></main>');
await writeFile(join(output,'index.html'),html);
await writeFile(join(output,'.nojekyll'),'');
await cp(join(root,'node_modules/fflate/LICENSE'),join(output,'fflate-LICENSE.txt'));
// The metafile remains local and is deliberately not deployed.
await writeFile(join(root,'.build-meta.json'),JSON.stringify(result.metafile,null,2));
console.log(`Built _site with ${banks.flat().length} templates. Plaintext banks and source maps are excluded.`);
