/** Download the pinned trial's PyScript modules, reusing the local cache.
 * Used by developers; leaves production assets and dependencies unchanged.
 * Dependencies: Node fs/crypto and the official PyScript release host.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const base = 'https://pyscript.net/releases/2026.7.3/';
const root = new URL('../prototypes/pyscript/vendor/', import.meta.url);
await mkdir(root, { recursive: true });
const seen = new Set(),
  queue = ['core.js', 'core.css'];
const manifest = {};
while (queue.length) {
  const batch = queue.splice(0, 6).filter((name) => !seen.has(name));
  batch.forEach((name) => seen.add(name));
  for (const { name, text } of await Promise.all(
    batch.map(async (name) => {
      let text;
      try {
        text = await readFile(new URL(name, root), 'utf8');
      } catch {
        const response = await fetch(base + name);
        if (!response.ok) throw Error(`${name}: HTTP ${response.status}`);
        text = await response.text();
        await writeFile(new URL(name, root), text);
      }
      return { name, text };
    }),
  )) {
    manifest[name] = { url: base + name, sha256: createHash('sha256').update(text).digest('hex') };
    for (const match of text.matchAll(/["']\.\/([A-Za-z0-9_-]+\.(?:js|css))["']/g))
      if (!seen.has(match[1]) && !queue.includes(match[1])) queue.push(match[1]);
  }
}
await writeFile(
  new URL('manifest.json', root),
  JSON.stringify({ release: '2026.7.3', files: manifest }, null, 2) + '\n',
);
console.log(
  `Cached ${seen.size} PyScript files. Python runtime/packages load separately on first use.`,
);
