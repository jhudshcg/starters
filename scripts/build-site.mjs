// Package only browser assets. Paths stay relative for repository Pages URLs.
import {cp, mkdir, readdir, rm, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, '_site');
await rm(output, {recursive: true, force: true});
await mkdir(output);
await cp(join(root, 'index.html'), join(output, 'index.html'));

async function copyAssets(directory, extension) {
  for (const entry of await readdir(join(root, directory), {withFileTypes: true})) {
    const relative = join(directory, entry.name);
    if (entry.isDirectory() && !['drafts', 'coverage'].includes(entry.name)) {
      await copyAssets(relative, extension);
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      await mkdir(join(output, directory), {recursive: true});
      await cp(join(root, relative), join(output, relative));
    }
  }
}

await copyAssets('css', '.css');
await copyAssets('js', '.js');
await copyAssets('data', '.js');
await writeFile(join(output, '.nojekyll'), '');
// Imports resolve within the artifact, catching omitted bank dependencies.
const {validateBank, banks} = await import(new URL('../_site/js/bank.js', import.meta.url));
const errors = validateBank();
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Built _site with ${banks.flat().length} question templates.`);
