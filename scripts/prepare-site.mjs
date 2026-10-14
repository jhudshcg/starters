// Ship only a bundled production application. Authoring banks stay in the repo.
import { mkdir, readFile, rm, writeFile, cp, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import './question-codes.mjs';
import { banks, validateBank } from '../js/bank.js';
import { auditHints } from './audit-hints.mjs';
import { createHash } from 'node:crypto';
import { pack, packBank } from './pack-bank.mjs';

// Check the compact curriculum search metadata without publishing the full inventory.
const { execFileSync } = await import('node:child_process');
execFileSync(process.execPath, [
  fileURLToPath(new URL('search-index.mjs', import.meta.url)),
  '--check',
]);

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, '.generated/static');
const errors = [...validateBank(), ...auditHints(banks).errors];
if (errors.length) throw Error(errors.join('\n'));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await mkdir(join(output, 'banks'));
const bankPaths = [];
for (const [i, name] of ['puzzles', 'exam', 'python', 'esp'].entries()) {
  const payload = pack(packBank(banks[i]));
  const hash = createHash('sha256').update(payload).digest('hex').slice(0, 16);
  const path = `banks/${name}-${hash}.txt`;
  await writeFile(join(output, path), payload);
  bankPaths.push(path);
}
await writeFile(join(root, '.generated/banks.json'), JSON.stringify(bankPaths));
await writeFile(join(output, '.nojekyll'), '');
await cp(join(root, 'engines'), join(output, 'engines'), { recursive: true });
await cp(join(root, 'THIRD_PARTY_NOTICES.md'), join(output, 'THIRD_PARTY_NOTICES.md'));
await cp(join(root, 'node_modules/fflate/LICENSE'), join(output, 'fflate-LICENSE.txt'));
console.log(`Prepared ${banks.flat().length} templates in four packed banks.`);

// Kit's default wall-clock version would change unchanged builds and shared diagnostics.
const version = createHash('sha256');
async function hashDirectory(directory) {
  for (const entry of (await readdir(join(root, directory), { withFileTypes: true })).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await hashDirectory(path);
    else if (/\.(js|mjs|svelte|css|json|html)$/.test(entry.name))
      version.update(path).update(await readFile(join(root, path)));
  }
}
for (const directory of ['src', 'js', 'css', 'packages/puzzles']) await hashDirectory(directory);
for (const path of ['package-lock.json', 'vite.config.js'])
  version.update(path).update(await readFile(join(root, path)));
version.update(JSON.stringify(bankPaths)).update(process.env.BASE_PATH || '');
await writeFile(
  join(root, '.generated/version.json'),
  JSON.stringify(version.digest('hex').slice(0, 16)),
);

// CSS foundations are compiled away and therefore absent from Vite's JS licence inventory.
await mkdir(join(output, 'licenses'));
for (const dependency of ['tailwindcss', 'daisyui'])
  await cp(
    join(root, 'node_modules', dependency, 'LICENSE'),
    join(output, 'licenses', `${dependency}.txt`),
  );
