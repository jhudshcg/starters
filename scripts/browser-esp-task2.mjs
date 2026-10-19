/**
 * Purpose: Verify the Task 2 draft in the dedicated test browser on port 9227.
 * Main contents: selects, summary, marks/reload/reveal, reflow and retirement navigation.
 * Used by: focused local verification. Uses: browser-support, bank and authored draft IDs.
 * Libs: Node assert/fs. Clears only the dedicated browser's test storage.
 */
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { browser } from './browser-support.mjs';
import { resolve } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';
import draft from '../data/esp-task2.js';
import { themePalettes } from '../js/theme.js';

const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const b = await browser();

/** Open a known set and wait for its code, rather than a stale question from navigation. */
async function open(entries) {
  const set = resolve({ version: BANK_VERSION, type: 3, entries, minutes: null });
  await b.send('Page.navigate', { url: base + '/set/?code=' + set.code });
  await b.until(
    `document.querySelector('#display-code')?.textContent === ${JSON.stringify(set.code)}`,
  );
  return set;
}

try {
  await b.send('Page.navigate', { url: base });
  await b.until('Boolean(document.querySelector("#main"))');
  await b.evaluate('localStorage.clear()');
  await b.reload();
  await b.until('Boolean(document.querySelector("#profile-name"))');
  await b.change('#profile-name', 'ESP Draft Test', 'input');
  await b.evaluate('document.querySelector("[role=dialog] form").requestSubmit()');
  await b.until('Boolean(document.querySelector("#code-form"))');

  for (const template of draft)
    for (let variation = 0; variation < template.variations.length; variation++) {
      const set = await open([{ slot: template.slot, variation }]),
        q = set.questions[0];
      assert.equal(
        await b.evaluate('document.querySelectorAll("select[data-part]").length'),
        q.parts.length,
      );
      assert.equal(
        await b.evaluate('document.querySelector(".code-panel code").textContent'),
        q.code,
      );
      const columns = await b.evaluate(
        'Object.fromEntries([...document.querySelectorAll("select[data-part]")].map(e=>[e.dataset.part,e.closest(".investigation-group")?.dataset.column]))',
      );
      for (const row of q.testPlan) {
        assert.equal(columns[row.dataPart], 'data');
        for (const supplied of row.cases) {
          assert.equal(columns[supplied.expectedPart], 'expected');
          assert.equal(columns[supplied.predictedPart], 'predicted');
        }
        for (const id of row.actionParts) assert.equal(columns[id], 'actions');
      }
      assert.ok(
        await b.evaluate(
          '[...document.querySelectorAll(".investigation-group")].every(e=>Boolean(document.getElementById(e.getAttribute("aria-labelledby"))?.textContent))',
        ),
      );
      if (q.slot === 36 && variation === 0) {
        const savedTheme = await b.evaluate(
          '({theme:document.documentElement.dataset.theme,palette:document.documentElement.dataset.palette,style:document.documentElement.getAttribute("style")})',
        );
        for (const { id: palette } of themePalettes) {
          for (const mode of ['light', 'dark']) {
            await b.evaluate(`{
              const root=document.documentElement;
              root.dataset.theme=${JSON.stringify(mode)};
              root.dataset.palette=${JSON.stringify(palette)};
              root.style.removeProperty('--theme-saturation');
              root.style.removeProperty('--theme-bg-lightness');
            }`);
            const panels = await b.evaluate(`(() => {
              const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
              const context=canvas.getContext('2d');
              const luminance = (colour) => {
                context.fillStyle=colour;context.fillRect(0,0,1,1);
                return [...context.getImageData(0,0,1,1).data].slice(0,3)
                  .map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;})
                  .reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
              };
              return [...document.querySelectorAll('.investigation-group > header')].map(e=>{
                const style=getComputedStyle(e), a=luminance(style.color), b=luminance(style.backgroundColor);
                return {column:e.parentElement.dataset.column,background:style.backgroundColor,contrast:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};
              });
            })()`);
            assert.ok(
              panels.every((panel) => panel.contrast >= 4.5),
              `${palette}/${mode} stage labels`,
            );
            assert.notEqual(
              panels.find((panel) => panel.column === 'expected').background,
              panels.find((panel) => panel.column === 'predicted').background,
            );
          }
        }
        await b.evaluate(`{
          const saved=${JSON.stringify(savedTheme)}, root=document.documentElement;
          root.dataset.theme=saved.theme;root.dataset.palette=saved.palette;
          if(saved.style===null)root.removeAttribute('style');else root.setAttribute('style',saved.style);
        }`);
      }
      assert.deepEqual(
        await b.evaluate(
          '[...document.querySelectorAll("#esp-recipe option:not([disabled])")].map(o=>o.value)',
        ),
        ['T2.6'],
      );
      assert.match(
        await b.evaluate('document.querySelector(".esp-notice").textContent'),
        /All answers.*automatically marked/s,
      );
      assert.ok(
        await b.evaluate(
          '[...document.querySelectorAll("select[data-part]")].every(e=>e.labels.length===1)',
        ),
      );
      await b.click('.test-plan summary');
      assert.match(
        await b.evaluate('document.querySelector(".test-plan").textContent'),
        /Not run. Your predictions:/,
      );
      assert.equal(
        await b.evaluate('document.querySelectorAll(".test-plan-row").length'),
        q.testPlan.length,
      );
      for (const [index, row] of q.testPlan.entries()) {
        const values = await b.evaluate(`(() => {
          const fields=document.querySelectorAll('.test-plan-row')[${index}].querySelectorAll('dd');
          return {description:fields[0].textContent.trim(), data:fields[1].textContent};
        })()`);
        assert.equal(values.description, row.description);
        assert.ok(!values.data.includes(row.description.split(':')[0]));
      }
      // Dispatch the native change event through the real component; popup key selection
      // is deliberately separate from this harness after a macOS headless popup stall.
      for (const p of q.parts)
        await b.change(`[data-slot="${q.slot}"][data-part="${p.id}"]`, p.answer);
      assert.doesNotMatch(
        await b.evaluate('document.querySelector(".test-plan").textContent'),
        /Not selected/,
      );
      for (const row of q.testPlan) {
        const dataPart = q.parts.find((part) => part.id === row.dataPart);
        const wrong = dataPart.options.find((option) => option !== dataPart.answer);
        await b.change(`[data-slot="${q.slot}"][data-part="${dataPart.id}"]`, wrong);
        assert.ok(
          (await b.evaluate('document.querySelector(".test-plan").textContent')).includes(
            wrong.split('; ')[0],
          ),
        );
        await b.change(`[data-slot="${q.slot}"][data-part="${dataPart.id}"]`, dataPart.answer);
      }
      for (const width of [320, 768, 1280]) {
        await b.send('Emulation.setDeviceMetricsOverride', {
          width,
          height: 1000,
          deviceScaleFactor: 1,
          mobile: false,
        });
        assert.equal(
          await b.evaluate('document.documentElement.scrollWidth > innerWidth'),
          false,
          `${q.slot}/${variation} fits ${width}`,
        );
        assert.ok(
          await b.evaluate(
            '[...document.querySelectorAll("select[data-part]")].every(e=>e.getBoundingClientRect().height>=44)',
          ),
        );
        assert.equal(
          await b.evaluate('getComputedStyle(document.querySelector(".code-panel")).whiteSpace'),
          'pre',
          'Python lines and indentation stay intact',
        );
        if (q.slot === 36 && variation === 0 && width === 320) {
          await b.evaluate('document.querySelector(".code-panel").focus()');
          await b.send('Input.dispatchKeyEvent', {
            type: 'keyDown',
            key: 'ArrowRight',
            code: 'ArrowRight',
            windowsVirtualKeyCode: 39,
          });
          await b.send('Input.dispatchKeyEvent', {
            type: 'keyUp',
            key: 'ArrowRight',
            code: 'ArrowRight',
            windowsVirtualKeyCode: 39,
          });
          await b.until('document.querySelector(".code-panel").scrollLeft > 0');
          await b.evaluate('document.querySelector(".code-panel").scrollLeft = 0');
        }
      }
      if (process.argv.includes('--screenshots') && q.slot === 36 && variation === 0) {
        for (const width of [320, 1280]) {
          await b.send('Emulation.setDeviceMetricsOverride', {
            width,
            height: 1000,
            deviceScaleFactor: 1,
            mobile: false,
          });
          const shot = await b.send('Page.captureScreenshot', {
            format: 'png',
            captureBeyondViewport: true,
          });
          await writeFile(`/private/tmp/esp-task2-${width}.png`, Buffer.from(shot.data, 'base64'));
        }
      }
      await b.click('#submit');
      await b.until('Boolean(document.querySelector("#submit-result"))');
      assert.equal(await b.evaluate('document.querySelector(".result-score").textContent'), '100%');
      assert.ok(
        await b.evaluate(
          '[...document.querySelectorAll("select[data-part]")].every(e=>e.disabled)',
        ),
      );
      if (q.slot === 36 && variation === 0) {
        await b.reload();
        await b.until('Boolean(document.querySelector("#submit-result"))');
        for (const p of q.parts)
          assert.equal(
            await b.evaluate(`document.querySelector('[data-part="${p.id}"]').value`),
            p.answer,
          );
        assert.equal(
          await b.evaluate('document.querySelector(".result-score").textContent'),
          '100%',
        );
      }
      await b.click('[data-reveal]');
      await b.until('Boolean(document.querySelector(".solution"))');
      assert.equal(
        await b.evaluate('document.querySelectorAll(".solution-part").length'),
        q.parts.length,
      );
    }

  const set = await open([36, 37, 38].map((slot) => ({ slot, variation: 0 })));
  assert.equal(await b.evaluate('document.querySelectorAll(".question").length'), 3);
  await b.click('#new-focus');
  await b.until(
    `document.querySelector('#display-code')?.textContent !== ${JSON.stringify(set.code)}`,
  );
  const fresh = resolve(await b.evaluate('document.querySelector("#display-code").textContent'));
  assert.notEqual(fresh.entries[0].variation, 0);
  await open([{ slot: 15, variation: 0 }]);
  assert.ok(
    await b.evaluate('document.querySelectorAll("input[type=radio][data-part]").length > 0'),
  );
  assert.equal(
    await b.evaluate('document.querySelector("#esp-recipe option:checked").disabled'),
    true,
  );
  await b.change('#esp-recipe', 'T2.6');
  await b.until(
    'document.querySelectorAll(".question").length === 3 && document.querySelector(".question").dataset.question === "36"',
  );
  assert.deepEqual(b.errors, []);
  console.log(
    '18 Task 2 variations pass: selection, summaries, marking, submitted reload, reveal, preserved Python lines, keyboard code scrolling, 320/768/1280px reflow and retired-code navigation.',
  );
  console.log('Preview: ' + base + '/set/?code=' + set.code);
} finally {
  b.close();
}
