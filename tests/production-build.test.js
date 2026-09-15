import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));

test('the deployable site contains hashed bundles, no authoring banks or source maps',()=>{
 execFileSync(process.execPath,['scripts/build-site.mjs'],{cwd:root});
 const html=readFileSync(join(root,'_site/index.html'),'utf8');
 const files=readdirSync(join(root,'_site'),{recursive:true});
 assert.ok(!files.some(f=>f.startsWith('data')||f.startsWith('js/')||f.endsWith('.map')));
 const script=html.match(/src="(assets\/app-[A-Z0-9]+\.js)"/)[1];
 const bundle=readFileSync(join(root,'_site',script),'utf8');
 for(const phrase of ['A print cost calculator uses','hiding implementation details','The caller uses the interface'])assert.ok(!bundle.includes(phrase),phrase+' leaked into source');
 assert.ok(!html.includes('js/app.js'));
 assert.equal((html.match(/href="assets\//g)??[]).length,3);
 const meta=JSON.parse(readFileSync(join(root,'.build-meta.json'),'utf8'));
 assert.ok(!Object.keys(meta.inputs).some(f=>/exam-ca[12]|exam-helpers|data\/drafts/.test(f)));
 assert.ok(!bundle.includes('sourceMappingURL'));
 // Rebuilding unchanged inputs is deterministic; no commit/deployment counter enters IDs.
 execFileSync(process.execPath,['scripts/build-site.mjs'],{cwd:root});
 assert.equal(readFileSync(join(root,'_site/index.html'),'utf8'),html);
 assert.equal(readFileSync(join(root,'_site',script),'utf8'),bundle);
});
