/** Static Kit output must retain packed content, deterministic assets and distribution files. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { unpack } from '../js/packed-data.js';
const root = fileURLToPath(new URL('../', import.meta.url));
const build = () => execFileSync(process.execPath, ['scripts/build-site.mjs'], { cwd: root });
const digest = () =>
  Object.fromEntries(
    readdirSync(join(root, 'live'), { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => {
        const path = join(entry.parentPath, entry.name),
          relative = path.slice(join(root, 'live').length + 1);
        return [relative, createHash('sha256').update(readFileSync(path)).digest('hex')];
      })
      .sort(([a], [b]) => a.localeCompare(b)),
  );

test('static routes ship deterministic hashed bundles, packed banks and engine provenance', () => {
  build();
  const html = readFileSync(join(root, 'live/index.html'), 'utf8'),
    files = readdirSync(join(root, 'live'), { recursive: true });
  assert.ok(
    !files.some(
      (file) => file.startsWith('data/') || file.startsWith('js/') || file.endsWith('.map'),
    ),
  );
  assert.match(html, /_app\/immutable\/entry\/app\.[\w-]+\.js/);
  assert.match(html, /_app\/immutable\/assets\/[^" ]+\.css/);
  const scripts = files.filter((file) => file.startsWith('_app/') && file.endsWith('.js'));
  const bundle = scripts.map((file) => readFileSync(join(root, 'live', file), 'utf8')).join('\n');
  for (const phrase of [
    'A print cost calculator uses',
    'hiding implementation details',
    'The caller uses the interface',
  ])
    assert.ok(!bundle.includes(phrase), phrase + ' leaked into client source');
  assert.ok(!bundle.includes('sourceMappingURL'));
  const meta = JSON.parse(readFileSync(join(root, '.build-meta.json'), 'utf8'));
  const allowedMetadata = new Set(['data/search-keywords.js', 'data/search-topics.js']);
  assert.ok(
    !Object.keys(meta.inputs).some(
      (file) =>
        (/^data\//.test(file) && !allowedMetadata.has(file)) ||
        /^packages\/puzzles\/(data\/|catalogue\.js)/.test(file),
    ),
    'No authoring bank is bundled',
  );
  const bankFiles = files.filter((file) =>
    /^banks\/(puzzles|exam|python|esp)-[a-f0-9]+\.txt$/.test(file),
  );
  assert.equal(bankFiles.length, 4);
  for (const file of bankFiles) {
    const payload = readFileSync(join(root, 'live', file), 'utf8');
    assert.ok(!bundle.includes(payload));
    assert.ok(bundle.includes(file), 'Client references the lazy bank');
    assert.ok(unpack(payload).length > 0);
  }
  for (const route of [
    'exam',
    'practice',
    'set',
    'search',
    'progress',
    'projects',
    'faq',
    'about',
    'go',
  ])
    assert.ok(
      existsSync(join(root, 'live', route, 'index.html')),
      route + ' has a direct static entry',
    );
  for (const file of [
    '.nojekyll',
    'THIRD_PARTY_NOTICES.md',
    'THIRD_PARTY_LICENSES.md',
    'licenses/tailwindcss.txt',
    'licenses/daisyui.txt',
    'fflate-LICENSE.txt',
    'engines/gnugo/worker.js',
    'engines/gnugo/gnugo.wasm',
  ])
    assert.ok(existsSync(join(root, 'live', file)), file + ' is distributed');
  assert.ok(
    files.some((file) => file.startsWith('engines/') && /\.(tar\.gz|tar\.xz|zip)$/.test(file)),
    'Corresponding engine source is distributed',
  );
  const first = digest();
  build();
  assert.deepEqual(digest(), first, 'Identical inputs produce identical output');
});
