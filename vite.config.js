/**
 * Purpose: Compile the static SvelteKit app and semantic Tailwind styles.
 * Main contents: framework, packed-bank replacement and deployment paths.
 * Used by: development and production builds. Uses: generated bank manifest.
 * Libs: Vite, SvelteKit, static adapter and Tailwind.
 */
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

let development = false;

export default defineConfig({
  plugins: [
    {
      name: 'question-bank-loading',
      enforce: 'pre',
      configResolved(config) {
        development = config.command === 'serve';
      },
      load(id) {
        if (!id.endsWith('/js/bank-data.js')) return;
        if (development) return "export { banks, ensureBank } from './bank-data.dev.js';";
        const paths = JSON.parse(readFileSync('.generated/banks.json', 'utf8'));
        return `import { asset } from '$app/paths';
          import { createBankLoader } from '${process.cwd().replaceAll('\\', '/')}/js/bank-loader.js';
          const loader = createBankLoader(${JSON.stringify(paths)}.map(path => asset(path)));
          export const banks = loader.banks;
          export const ensureBank = loader.ensureBank;`;
      },
      generateBundle(options, bundle) {
        if (options.dir?.includes('/server')) return;
        const inputs = {};
        for (const chunk of Object.values(bundle)) {
          if (chunk.type === 'chunk')
            for (const id of Object.keys(chunk.modules))
              inputs[id.replace(process.cwd() + '/', '')] = {};
        }
        if (Object.keys(inputs).length)
          writeFileSync('.build-meta.json', JSON.stringify({ inputs }, null, 2));
      },
    },
    tailwindcss(),
    sveltekit({
      adapter: adapter({ pages: 'live', assets: 'live' }),
      files: { assets: '.generated/static' },
      version: {
        name: existsSync('.generated/version.json')
          ? JSON.parse(readFileSync('.generated/version.json', 'utf8'))
          : 'development',
      },
      paths: { base: process.env.BASE_PATH || '', relative: true },
    }),
  ],
  build: { license: { fileName: 'THIRD_PARTY_LICENSES.md' } },
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // Readable banks live outside Kit's src allowlist and are now imported on demand.
    fs: { allow: ['data', 'packages/puzzles'] },
  },
  preview: { host: '127.0.0.1', port: 8765, strictPort: true },
});
