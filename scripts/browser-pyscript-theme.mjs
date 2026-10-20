/** Purpose: Reproduce saved-draft region loss and verify the preview against shared themes.
 * Main contents: recovery/reset guards, hover controls and eight-palette editor contrast.
 * Used by: local verification. Uses: browser-support.mjs, isolated trial storage.
 * Libs: Node assert/fs and CDP.
 */
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { browser } from './browser-support.mjs';
const b = await browser();
const base = process.env.PYSCRIPT_TRIAL_URL ?? 'http://127.0.0.1:8767/prototypes/pyscript/';
const api = 'window.pythonTrial.editor';
const root = "document.querySelector('.py-editor-input > div').shadowRoot";
async function ready() {
  await b.until('Boolean(window.pythonTrial?.editor)');
}
async function seed(kind) {
  await b.evaluate(`(async () => {
    const {questions}=await import('./questions.js'); const question=questions[0];
    const source=${kind === 'legacy' ? "question.source.replace('1 <= value < 8', '1 <= value <= 8')" : "question.source + '\\n# manual draft'"};
    const draft={source,inputs:'8',expression:'read_workshop()'};
    ${kind === 'empty' ? "draft.editor={original:question.source,mode:'regions',manual:true,fill:true,regions:[]};" : ''}
    localStorage.setItem('starters-pyscript-trial:v1',JSON.stringify({workshop:draft}));
  })()`);
  await b.reload();
  await ready();
}
try {
  await b.send('Network.enable');
  await b.send('Network.setCacheDisabled', { cacheDisabled: true });
  await b.send('Page.navigate', { url: base });
  await ready();
  await seed('legacy');
  assert.equal(await b.evaluate(`${api}.snapshot().regions.length`), 2);
  assert.equal(await b.evaluate(`${api}.snapshot().mode`), 'choices');
  assert.equal(await b.evaluate(`${root}.querySelectorAll('.region-choice').length`), 2);
  assert.ok(await b.evaluate(`${api}.source.includes('1 <= value <= 8')`));
  await b.change('#mode', 'regions');
  await b.click('#region-fill');
  assert.ok(await b.evaluate(`${root}.querySelectorAll('.region-fill').length >= 2`));
  await seed('empty');
  assert.equal(await b.evaluate(`${api}.snapshot().mode`), 'free');
  assert.match(
    await b.evaluate('document.querySelector("#mode-help").textContent'),
    /No marked regions/,
  );
  await b.change('#mode', 'regions');
  assert.equal(await b.evaluate(`${api}.snapshot().mode`), 'free');
  assert.ok(await b.evaluate(`${api}.source.endsWith('# manual draft')`));
  await b.click('#reset');
  await ready();
  await b.change('#mode', 'regions');
  assert.equal(await b.evaluate(`${api}.snapshot().regions.length`), 2);
  assert.ok(await b.evaluate(`${root}.querySelectorAll('.question-region').length >= 2`));
  console.log('Legacy replacement recovery, empty-region guard and explicit reset pass.');
  await b.change('#mode', 'choices');
  for (const mode of ['light', 'dark'])
    for (const palette of ['sage', 'blue', 'rose', 'apricot']) {
      await b.change('#theme', `${mode}:${palette}`);
      await b.evaluate(`${api}.select(0,0); ${api}.setFill(true)`);
      const measured = await b.evaluate(`(() => {
      const root=${root};const style=e=>getComputedStyle(e);
      const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
      const ctx=canvas.getContext('2d',{willReadFrequently:true});
      const rgb=color=>{const probe=document.createElement('span');probe.style.color=color;document.body.append(probe);const resolved=style(probe).color;probe.remove();ctx.clearRect(0,0,1,1);ctx.fillStyle=resolved;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3);};
      const lum=color=>rgb(color).map(c=>{c/=255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4}).reduce((n,c,i)=>n+c*[.2126,.7152,.0722][i],0);
      const contrast=(a,b)=>{a=lum(a);b=lum(b);return(Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
      const editor=root.querySelector('.cm-editor');const background=style(editor).backgroundColor;
      const region=root.querySelector('.region-fill');const regionBackground=style(region).backgroundColor;
      const code=[...root.querySelectorAll('.cm-content .cm-line span')].filter(e=>e.textContent.trim() && !e.closest('.cm-widgetBuffer'));
      return {background, text:contrast(style(editor).color,background),
        syntax:Math.min(...code.map(e=>contrast(style(e).color,e.closest('.region-fill')?regionBackground:background))),
        outline:contrast(style(region.closest('.region-choice-group')).borderColor,background),
        hoverButton:!!document.querySelector('.py-editor-run-button'),
        tones:['--code-keyword','--code-string','--code-number','--code-function'].map(name=>rgb(style(document.documentElement).getPropertyValue(name))),
        keywords:root.querySelector('.cm-line span')?.textContent,
        mode:document.documentElement.dataset.theme,palette:document.documentElement.dataset.palette};
    })()`);
      assert.equal(measured.mode, mode);
      assert.equal(measured.palette, palette);
      assert.equal(measured.hoverButton, false);
      for (const [i, a] of measured.tones.entries())
        for (const other of measured.tones.slice(i + 1))
          assert.ok(
            Math.hypot(...a.map((c, j) => c - other[j])) >= 40,
            'syntax categories must remain visibly different: ' + JSON.stringify(measured),
          );
      assert.ok(measured.text >= 4.5, JSON.stringify(measured));
      assert.ok(measured.syntax >= 4.5, JSON.stringify(measured));
      assert.ok(measured.outline >= 3, JSON.stringify(measured));
      await b.evaluate(`${api}.selectRegion('condition')`);
      const active = await b.evaluate(`(() => {
      const r=${root}.querySelector('.region-active');return {colour:getComputedStyle(r).color,children:[...r.querySelectorAll('span')].map(e=>getComputedStyle(e).color)};
    })()`);
      assert.ok(
        active.children.every((c) => c === active.colour),
        'syntax must follow selected text colour',
      );
      console.log(
        `${mode}:${palette}`,
        measured.text.toFixed(2),
        measured.syntax.toFixed(2),
        measured.outline.toFixed(2),
      );
    }
  await b.change('#theme', 'dark:rose');
  await b.reload();
  await ready();
  assert.equal(await b.evaluate('document.querySelector("#theme").value'), 'dark:rose');
  for (const width of [320, 1280]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await b.evaluate('new Promise(r=>setTimeout(r,500))');
    for (const id of ['exception', 'condition']) {
      await b.evaluate(`${api}.selectRegion('${id}')`);
      await b.evaluate('new Promise(r=>setTimeout(r,200))');
      const alignment = await b.evaluate(`(() => {
        const root=${root}; const control=root.querySelector('select[data-region="${id}"]');
        const nodes=[];
        for (const element of root.querySelectorAll('span.question-region[data-region="${id}"]')) {
          const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);
          while(walker.nextNode()) if(!walker.currentNode.parentElement.closest('select') && walker.currentNode.textContent.trim()) nodes.push(walker.currentNode);
        }
        const last=nodes.at(-1), range=document.createRange();
        range.setStart(last,last.length-1);range.setEnd(last,last.length);
        const code=range.getBoundingClientRect(), widget=control.getBoundingClientRect();
        const outlined=control.previousElementSibling.getBoundingClientRect();
        return {offset: Math.abs((code.top+code.bottom-widget.top-widget.bottom)/2),width:widget.width,
          joinGap:Math.abs(outlined.right-widget.left),heightDifference:Math.abs(outlined.height-widget.height),
          insideCodeOutline:!!control.closest('.question-region')};
      })()`);
      assert.ok(
        alignment.offset <= 3,
        `Inline control must align with its code: ${JSON.stringify(alignment)}`,
      );
      assert.equal(alignment.insideCodeOutline, false, 'code outline must exclude the control');
      assert.ok(
        alignment.joinGap < 1 && alignment.heightDifference < 1,
        'code and control must join flush at equal height',
      );
    }

    assert.equal(await b.evaluate('document.documentElement.scrollWidth > innerWidth'), false);
    const point = await b.evaluate(
      `(()=>{const r=document.querySelector('#editor').getBoundingClientRect();return {x:r.x+20,y:Math.max(0,r.y+20)};})()`,
    );
    await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    assert.equal(
      await b.evaluate('Boolean(document.querySelector(".py-editor-run-button"))'),
      false,
    );
    const shot = await b.send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    await writeFile(`/private/tmp/pyscript-themed-${width}.png`, Buffer.from(shot.data, 'base64'));
  }
  assert.deepEqual(b.errors, []);
  console.log('Shared theme, hover and narrow layout checks pass.');
} finally {
  await b.send('Network.setCacheDisabled', { cacheDisabled: false });
  b.close();
}
