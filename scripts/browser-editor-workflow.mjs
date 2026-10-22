/**
 * Purpose: Verify production editor/prediction/Task 2/history interactions in isolated Chrome.
 * Main contents: real typing, run evidence, tabs, height controls and read-only review.
 * Used by: local verification on port 9227. Uses: browser-support and authored test identities.
 * Libs: Node assert/fs and Chrome CDP. Clears only the dedicated test profile.
 */
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { browser } from './browser-support.mjs';
import { encode, BANK_VERSION } from '../js/codes.js';
import esp from '../data/esp-task2.js';
import { studentCases } from '../js/task2-tests.js';
import { independentInputs } from './browser-task2-independent.mjs';
import {
  enterTestInputs,
  enterExpectations,
  enterOutcome,
  testOutcomes,
} from './browser-task2-inputs.mjs';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const b = await browser({ acceptBeforeUnload: true });
if (process.argv.includes('--inspect')) {
  console.log(
    await b.evaluate(
      `({innerWidth, outerWidth, dpr:devicePixelRatio, screen:screen.width, zoom:visualViewport.scale, body:document.body.scrollWidth, main:document.querySelector('main').getBoundingClientRect().width, meta:document.querySelector('meta[name=viewport]')?.content})`,
    ),
  );
  console.log(await b.evaluate('document.body.innerText.slice(0,800)'));
  console.log(JSON.stringify(b.errors));
  b.close();
  process.exit(0);
}
const root = (slot, doc = 'edited') =>
  `document.querySelector('#editor-${slot}-${doc} .py-editor-input > div')?.shadowRoot`;
const text = (slot, doc = 'edited') =>
  `[...${root(slot, doc)}.querySelectorAll('.cm-line')].map(line => line.textContent).join('\\n')`;
const button = (slot, label) =>
  `[...document.querySelectorAll('[data-question="${slot}"] button')].find(b=>b.textContent.trim()===${JSON.stringify(label)})`;
async function wait(expression, timeout = 120000) {
  const end = Date.now() + timeout;
  while (Date.now() < end) {
    if (await b.evaluate(`Boolean(${expression})`)) return;
    await new Promise((r) => setTimeout(r, 200));
  }
  throw Error(
    `Timed out ${expression}: ${await b.evaluate('document.body.innerText.slice(-2500)')}`,
  );
}
async function open(type, slot, variation, version = BANK_VERSION) {
  const code = encode({
    version,
    type,
    entries: [{ slot, variation }],
    minutes: null,
  });
  await b.send('Page.navigate', { url: base + '/set/?code=' + code });
  await wait(
    `${root(slot)}?.querySelector('.cm-content') && !${button(slot, 'Reset')}?.disabled`,
    30000,
  );
}
async function replace(slot, source) {
  await b.evaluate(`${root(slot)}.querySelector('.cm-content').focus()`);
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'a',
    code: 'KeyA',
    windowsVirtualKeyCode: 65,
    modifiers: 4,
  });
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'a',
    code: 'KeyA',
    windowsVirtualKeyCode: 65,
    modifiers: 4,
  });
  await b.send('Input.insertText', { text: source });
}
async function run(slot) {
  await b.evaluate(`${button(slot, 'Run code')}.click()`);
  await wait(
    `![...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Stop Python') && document.body.innerText.includes('Run finished on')`,
  );
}
try {
  await b.send('Page.navigate', { url: base });
  await b.until('Boolean(document.querySelector("#main"))');
  await b.evaluate('localStorage.clear()');
  await b.reload();
  await b.until('Boolean(document.querySelector("#profile-name"))');
  await b.change('#profile-name', 'Editor Workflow Test', 'input');
  await b.evaluate('document.querySelector("[role=dialog] form").requestSubmit()');
  await b.until('Boolean(document.querySelector("#code-form"))');
  await b.send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  if (process.argv.includes('--independent-inputs-only')) {
    await independentInputs({ b, open, replace, wait, base });
    process.exitCode = 0;
    b.close();
    process.exit();
  }
  if (process.argv.includes('--width-overlay-only')) {
    await open(3, 36, 5);
    const draft = 'message = "' + 'abcdefghij'.repeat(24) + '"';
    await replace(36, draft);
    const geometry = () =>
      b.evaluate(`(() => {
      const rect=s=>{const r=document.querySelector(s)?.getBoundingClientRect();if(!r)return null;return {left:r.left,top:r.top,width:r.width,height:r.height,right:r.right,bottom:r.bottom};};
      return {code:rect('.editor-document:not([hidden]) .live-python-editor'),dock:rect('.editor-dock'),
        header:rect('.editor-header'),parts:rect('.parts'),controls:rect('.coding-controls'),
        question:rect('.question'),layout:rect('.question-layout'),
        tabs:[...document.querySelectorAll('.editor-tab')].map(e=>e.getBoundingClientRect().width),
        pageHeight:document.documentElement.scrollHeight,scrollY};
    })()`);
    for (const width of [744, 834, 1280]) {
      await b.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 1000,
        deviceScaleFactor: 1,
        mobile: false,
      });
      for (const doc of ['original', 'edited']) {
        await b.click(`#tab-36-${doc}`);
        await b.evaluate(`document.querySelector('.coding-intro').scrollIntoView({block:'start'})`);
        await wait(`!document.querySelector('.editor-dock').classList.contains('docked')`);
        await b.evaluate(
          `window.retainedEditor=${root(36, doc)}.querySelector('.cm-editor'); (${root(36, doc)}).querySelector('.cm-scroller').scrollLeft=100`,
        );
        const oldScroll = await b.evaluate(
          `${root(36, doc)}.querySelector('.cm-scroller').scrollLeft`,
        );
        const before = await geometry();
        await b.evaluate(`document.querySelector('.width-toggle').focus({preventScroll:true})`);
        await b.send('Input.dispatchKeyEvent', {
          type: 'keyDown',
          key: 'Enter',
          code: 'Enter',
          windowsVirtualKeyCode: 13,
          text: '\r',
        });
        await b.send('Input.dispatchKeyEvent', {
          type: 'keyUp',
          key: 'Enter',
          code: 'Enter',
          windowsVirtualKeyCode: 13,
        });
        await wait(
          `document.querySelector('.width-toggle').getAttribute('aria-expanded')==='true'`,
          5000,
        );
        const after = await geometry();
        for (const key of [
          'dock',
          'header',
          'parts',
          'controls',
          'question',
          'tabs',
          'pageHeight',
          'scrollY',
        ])
          assert.deepEqual(after[key], before[key], `${width}/${doc}: ${key} does not reflow`);
        assert.equal(after.code.height, before.code.height, 'code height stays fixed');
        assert.equal(after.code.top, before.code.top);
        assert.equal(after.code.left, before.code.left);
        assert.ok(after.code.width > before.code.width);
        assert.ok(
          Math.abs(after.code.right - after.layout.right) < 1,
          'overlay stops at question content edge',
        );
        assert.ok(
          await b.evaluate(`(() => {
          const code=document.querySelector('.editor-document:not([hidden])'),r=code.getBoundingClientRect(),
            x=document.querySelector('.parts').getBoundingClientRect().left+10;
          return code.contains(document.elementFromPoint(x,Math.max(r.top+20,20)));
        })()`),
          'code paints and receives input above the answer column',
        );
        assert.ok(
          await b.evaluate(`${root(36, doc)}.querySelector('.cm-editor')===window.retainedEditor`),
          'same editor instance',
        );
        assert.equal(await b.evaluate(text(36)), draft, 'student draft survives');
        assert.ok(
          await b.evaluate('document.documentElement.scrollWidth<=innerWidth'),
          'no page overflow',
        );
        await b.click('.width-toggle');
        await wait(
          `document.querySelector('.width-toggle').getAttribute('aria-expanded')==='false'`,
        );
        assert.deepEqual((await geometry()).code, before.code, 'collapse restores frame');
        assert.equal(
          await b.evaluate(`${root(36, doc)}.querySelector('.cm-scroller').scrollLeft`),
          oldScroll,
          'horizontal position restored',
        );
      }
      await b.evaluate(
        `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().bottom+20)`,
      );
      await wait(`document.querySelector('.editor-dock').classList.contains('docked')`);
      const pinned = await geometry();
      await b.click('.width-toggle');
      assert.equal(
        (await geometry()).code.height,
        pinned.code.height,
        'pinned expansion preserves height',
      );
      assert.equal((await geometry()).dock.top, 16, 'expanded code remains pinned');
      if (width === 744 || width === 1280)
        await writeFile(
          `/private/tmp/editor-overlay-${width}.png`,
          Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
        );
      await b.click('.width-toggle');
    }
    await b.click('.width-toggle');
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 820,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await wait(
      `Math.abs(document.querySelector('.editor-document:not([hidden])').getBoundingClientRect().right-document.querySelector('.question-layout').getBoundingClientRect().right)<1`,
    );
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 743,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await wait(`!document.querySelector('.editor-dock').classList.contains('expanded')`);
    assert.equal(
      await b.evaluate(`getComputedStyle(document.querySelector('.width-toggle')).display`),
      'none',
    );
    assert.ok(await b.evaluate('document.documentElement.scrollWidth<=innerWidth'));
    // The same control also works for coding questions without document tabs.
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 834,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await open(2, 2, 3);
    await b.evaluate(`document.querySelector('.coding-intro').scrollIntoView({block:'start'})`);
    const before = await geometry();
    await b.click('.width-toggle');
    const after = await geometry();
    assert.deepEqual(after.parts, before.parts);
    assert.equal(after.code.height, before.code.height);
    assert.ok(after.code.width > before.code.width);
    assert.deepEqual(b.errors, []);
    console.log(
      'Overlay expansion passes at 744/834/1280px: unchanged layout/height, overlay hit-testing, keyboard toggle, retained editors/drafts/scroll, pinned operation, resize to 820px and collapse/hide at 743px; tabless coding questions also pass.',
    );
    b.close();
    process.exit(0);
  }
  if (process.argv.includes('--editor-theme-only')) {
    await open(3, 36, 5);
    const original = await b.evaluate(text(36));
    await replace(
      36,
      'def example(value):\n    # retained draft\n    return value + 2\nprint(example("hello"))',
    );
    const draft = await b.evaluate(text(36));
    await b.evaluate(
      `window.themeEditorNodes=[${root(36, 'original')}.querySelector('.cm-editor'),${root(36)}.querySelector('.cm-editor')]`,
    );
    for (const palette of ['sage', 'blue', 'rose', 'apricot']) {
      await b.click('#theme-picker');
      await wait(`document.querySelector('[data-theme-choice="light:${palette}"]')`);
      await b.click(`[data-theme-choice="light:${palette}"]`);
      await b.click('#theme-picker');
      for (const mode of ['light', 'dark']) {
        if (mode === 'dark') await b.click('#theme-toggle');
        await wait(`document.documentElement.dataset.theme==='${mode}'`);
        for (const [index, doc] of ['original', 'edited'].entries()) {
          await b.click(`#tab-36-${doc}`);
          await b.evaluate(
            `document.querySelector('.coding-intro').scrollIntoView({block:'start'})`,
          );
          const measured = await b.evaluate(`(() => {
            const root=${root(36, doc)},editor=root.querySelector('.cm-editor'),style=e=>getComputedStyle(e),
              canvas=document.createElement('canvas');canvas.width=canvas.height=1;
            const ctx=canvas.getContext('2d',{willReadFrequently:true});
            const rgb=c=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=c;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3)};
            const lum=c=>rgb(c).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4}).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
            const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
            const background=style(editor).backgroundColor, spans=[...root.querySelectorAll('.cm-content .cm-line span')].filter(e=>e.textContent.trim()),
              activeLine=root.querySelector('.cm-activeLine'), activeBackground=activeLine?style(activeLine).backgroundColor:background;
            return {scheme:style(editor).colorScheme,light:lum(background),
              sameNode:editor===window.themeEditorNodes[${index}],text:ratio(style(editor).color,background),
              syntax:Math.min(...spans.map(e=>ratio(style(e).color,background))),
              activeSyntax:Math.min(...spans.map(e=>ratio(style(e).color,activeBackground))),
              gutter:ratio(style(root.querySelector('.cm-gutters')).color,background),
              size:style(root.querySelector('.cm-content')).fontSize,
              space:style(root.querySelector('.cm-content')).whiteSpace};
          })()`);
          assert.equal(measured.scheme, mode);
          assert.equal(measured.sameNode, true, 'theme changes preserve mounted documents');
          assert.ok(
            mode === 'light' ? measured.light > 0.6 : measured.light < 0.2,
            JSON.stringify({ mode, palette, doc, ...measured }),
          );
          assert.ok(
            measured.text >= 4.5 &&
              measured.syntax >= 4.5 &&
              measured.activeSyntax >= 4.5 &&
              measured.gutter >= 4.5,
            JSON.stringify({ mode, palette, doc, ...measured }),
          );
          assert.equal(measured.size, '14px');
          assert.equal(measured.space, 'pre');
          if (palette === 'rose' && doc === 'edited') {
            await b.evaluate(
              `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().bottom+30)`,
            );
            await writeFile(
              `/private/tmp/editor-theme-${mode}.png`,
              Buffer.from(
                (await b.send('Page.captureScreenshot', { format: 'png' })).data,
                'base64',
              ),
            );
          }
        }
        assert.equal(await b.evaluate(text(36)), draft, 'draft survives theme changes');
      }
    }
    await b.evaluate(`${root(36)}.querySelector('.cm-content').focus()`);
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'z',
      code: 'KeyZ',
      windowsVirtualKeyCode: 90,
      modifiers: 4,
    });
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyUp',
      key: 'z',
      code: 'KeyZ',
      windowsVirtualKeyCode: 90,
      modifiers: 4,
    });
    assert.equal(
      await b.evaluate(text(36)),
      original,
      'undo history survives mode and palette switches',
    );
    await open(2, 2, 3);
    for (const mode of ['light', 'dark']) {
      if ((await b.evaluate('document.documentElement.dataset.theme')) !== mode)
        await b.click('#theme-toggle');
      const colours = await b.evaluate(`(() => {
        const r=${root(2)},e=r.querySelector('.cm-editor'),gap=r.querySelector('.region-empty');
        return {scheme:getComputedStyle(e).colorScheme,gap:getComputedStyle(gap).backgroundColor,outline:getComputedStyle(gap).outlineWidth};
      })()`);
      assert.equal(colours.scheme, mode);
      assert.notEqual(colours.gap, 'rgba(0, 0, 0, 0)', 'gap fill follows the editor palette');
      assert.equal(colours.outline, '1px');
    }
    assert.deepEqual(b.errors, []);
    console.log(
      'Both editor tabs follow all eight app themes; text, syntax (including active lines) and gutters meet 4.5:1 at defaults. Live switches preserve nodes, drafts, undo, font size and unwrapped lines; completion gap styling follows both modes.',
    );
    b.close();
    process.exit(0);
  }
  if (process.argv.includes('--code-layout-only')) {
    await open(3, 36, 5, BANK_VERSION - 1);
    assert.equal(
      await b.evaluate(`document.querySelector('.set-update-notice')`),
      null,
      'older code opens without a revision notice',
    );
    // A long student-authored line must scroll locally even when the surrounding column is wide.
    const source = 'message = "' + 'abcdefghij'.repeat(24) + '"';
    await replace(36, source);
    for (const width of [360, 439, 440, 441, 743, 744, 820, 821, 834, 1280]) {
      await b.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      for (const doc of ['original', 'edited']) {
        await b.click(`#tab-36-${doc}`);
        await b.evaluate(`document.querySelector('.coding-intro').scrollIntoView({block:'start'})`);
        await wait(
          `getComputedStyle(${root(36, doc)}.querySelector('.cm-content')).fontSize === '${width <= 440 ? 12.5 : 14}px'`,
          5000,
        );
        const layout = await b.evaluate(`(() => {
          const root=${root(36, doc)}, content=root.querySelector('.cm-content'), scroller=root.querySelector('.cm-scroller');
          return {size:getComputedStyle(content).fontSize,space:getComputedStyle(content).whiteSpace,
            overflow:getComputedStyle(scroller).overflowX,scrolls:scroller.scrollWidth>scroller.clientWidth,
            gutter:getComputedStyle(root.querySelector('.cm-gutters')).fontSize};
        })()`);
        assert.equal(layout.size, width <= 440 ? '12.5px' : '14px');
        assert.equal(layout.gutter, layout.size);
        assert.equal(layout.space, 'pre', 'authored lines do not wrap');
        assert.equal(layout.overflow, 'auto');
        const frame = await b.evaluate(`(() => {
          const dock=document.querySelector('.editor-dock'), question=dock.closest('.question'),
            code=dock.querySelector('.editor-document:not([hidden]) .live-python-editor').getBoundingClientRect(),
            card=question.getBoundingClientRect(), style=getComputedStyle(question),
            intro=document.querySelector('.coding-intro').getBoundingClientRect(),
            tab=dock.querySelector('.editor-tab').getBoundingClientRect(),
            grip=dock.querySelector('.height-handle').getBoundingClientRect();
          return {left:code.left,right:code.right,
            expectedLeft:innerWidth<744?card.left+parseFloat(style.borderLeftWidth):intro.left,
            expectedRight:innerWidth<744?card.right-parseFloat(style.borderRightWidth):intro.right,
            columns:getComputedStyle(dock.closest('.question-layout')).gridTemplateColumns.split(' ').map(parseFloat),
            tabInset:tab.left-intro.left,gripOffset:(grip.left+grip.right-code.left-code.right)/2};
        })()`);
        assert.ok(
          Math.abs(frame.left - frame.expectedLeft) <= 1,
          `${width}: code left edge ${JSON.stringify(frame)}`,
        );
        assert.ok(Math.abs(frame.right - frame.expectedRight) <= 1, `${width}: code right edge`);
        assert.ok(Math.abs(frame.tabInset - 16) <= 1, `${width}: tabs retain their inset`);
        assert.ok(Math.abs(frame.gripOffset) <= 1, `${width}: grip remains centred`);
        assert.equal(frame.columns.length, width < 744 ? 1 : 2, `${width}: coding column count`);
        if (width >= 744) assert.ok(Math.abs(frame.columns[0] / frame.columns[1] - 1.5) < 0.01);
        await b.evaluate(
          'new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))',
        );
        const header = await b.evaluate(`(() => {
          const dock=document.querySelector('.editor-dock'),tabs=[...dock.querySelectorAll('.editor-tab')],
            selected=tabs.find(t=>t.getAttribute('aria-selected')==='true'),
            rects=tabs.map(t=>t.getBoundingClientRect()),actions=dock.querySelector('.editor-actions').getBoundingClientRect(),
            selectedRect=selected.getBoundingClientRect(),left=Math.max(rects[0].left,rects[1].left),right=Math.min(rects[0].right,rects[1].right),
            overlap=right>left;
          return {tabs:rects.map(r=>r.toJSON()),actions:actions.toJSON(),sameRow:rects.every(r=>r.top<actions.bottom && r.bottom>actions.top),
            actionsClear:rects.every(r=>r.right<=actions.left),
            selectedOnTop:!overlap || selected.contains(document.elementFromPoint((left+right)/2,selectedRect.top+selectedRect.height/2)),
            shadow:getComputedStyle(selected).boxShadow,overlap,
            icons:[...dock.querySelectorAll('.compact-action')].map(button=>({name:button.getAttribute('aria-label'),icon:getComputedStyle(button.querySelector('.action-icon')).display,label:getComputedStyle(button.querySelector('.action-label')).display,width:button.getBoundingClientRect().width,height:button.getBoundingClientRect().height})),
            gripGap:document.querySelector('.parts').getBoundingClientRect().top-dock.querySelector('.height-handle').getBoundingClientRect().bottom,
            feedback:!!document.querySelector('.coding-controls'),
            footer:!!document.querySelector('.editor-footer')};
        })()`);
        assert.ok(
          header.sameRow && header.actionsClear,
          `${width}/${doc}: tabs and actions share one row without overlap: ${JSON.stringify(header)}`,
        );
        assert.ok(header.selectedOnTop, `${width}/${doc}: selected tab is above the overlap`);
        assert.equal(header.feedback, false, 'no empty feedback surface');
        assert.equal(header.footer, false, 'no extra width-control row');
        assert.equal(header.icons.length, 2);
        for (const control of header.icons) {
          assert.ok(['Run & test', 'Reset'].includes(control.name));
          assert.equal(control.icon === 'none', width >= 440, 'icons only below 440px');
          assert.equal(control.label === 'none', width < 440, 'text remains at exactly 440px');
          assert.ok(
            control.width >= 44 && control.height >= 44,
            'actions retain accessible target sizes',
          );
        }
        assert.equal(
          header.shadow.includes('rgba(0, 0, 0, 0.24)'),
          header.overlap,
          'side shadow appears only during overlap',
        );
        if (header.overlap)
          assert.ok(
            header.shadow.includes(doc === 'original' ? '4px 0px 5px' : '-4px 0px 5px'),
            'shadow faces the inactive tab',
          );
        if (width < 744)
          assert.ok(header.gripGap >= 4, `minimum grip clearance: ${header.gripGap}`);

        const other = doc === 'original' ? 'edited' : 'original';
        const pointer = await b.evaluate(`(() => {
          const target=document.querySelector('#tab-36-${other}').getBoundingClientRect(),
            selected=document.querySelector('#tab-36-${doc}').getBoundingClientRect();
          return {x:${other === 'original' ? '(target.left+Math.min(target.right,selected.left))/2' : '(Math.max(target.left,selected.right)+target.right)/2'},y:target.top+target.height/2};
        })()`);
        await b.send('Input.dispatchMouseEvent', {
          type: 'mousePressed',
          ...pointer,
          button: 'left',
          buttons: 1,
          clickCount: 1,
        });
        await b.send('Input.dispatchMouseEvent', {
          type: 'mouseReleased',
          ...pointer,
          button: 'left',
          clickCount: 1,
        });
        await wait(
          `document.querySelector('#tab-36-${other}').getAttribute('aria-selected')==='true'`,
        );
        await b.send('Input.dispatchKeyEvent', {
          type: 'keyDown',
          key: doc === 'original' ? 'Home' : 'End',
          code: doc === 'original' ? 'Home' : 'End',
          windowsVirtualKeyCode: doc === 'original' ? 36 : 35,
        });
        await wait(
          `document.querySelector('#tab-36-${doc}').getAttribute('aria-selected')==='true'`,
        );
        if (doc === 'edited' || width === 360) {
          assert.ok(layout.scrolls, `${width} ${doc}: long line scrolls locally`);
          await b.evaluate(`(${root(36, doc)}).querySelector('.cm-scroller').scrollLeft=100`);
          assert.ok(
            await b.evaluate(`${root(36, doc)}.querySelector('.cm-scroller').scrollLeft>0`),
          );
          await b.evaluate(`(${root(36, doc)}).querySelector('.cm-scroller').scrollLeft=0`);
        }
        assert.ok(
          await b.evaluate('document.documentElement.scrollWidth<=innerWidth'),
          'page does not scroll horizontally',
        );
      }
    }
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await b.click('#tab-36-original');
    await b.evaluate(
      `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().bottom+20)`,
    );
    await wait(`document.querySelector('.editor-dock').classList.contains('docked')`);
    await writeFile(
      '/private/tmp/editor-code-360.png',
      Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
    );
    assert.deepEqual(b.errors, []);
    console.log(
      'Both tabs: 12.5px at <=440px and 14px above; unwrapped authored lines, horizontal editor scrolling, matching gutter size and no page overflow pass at 360/439/440/441/743/744/820/821/834/1280px. Single-column code reaches the card edges; tabs stay inset and the grip centred.',
    );
    b.close();
    process.exit(0);
  }
  if (process.argv.includes('--dock-layout-only')) {
    await open(3, 36, 5);
    const q = esp[0].variations[5];
    await enterTestInputs(b, 36, q);
    await enterExpectations(b, 36, q, testOutcomes(q).expected);
    await b.evaluate(`${button(36, 'Run & test')}.click()`);
    await wait(
      `document.body.innerText.includes('tests finished on Your code.') && !${button(36, 'Run & test')}.disabled`,
    );
    await b.click('#theme-picker');
    await wait(`Boolean(document.querySelector('[data-theme-choice="dark:rose"]'))`);
    await b.click('[data-theme-choice="dark:rose"]');
    await b.click('#theme-picker');
    for (const width of [1280, 1024, 360]) {
      await b.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 800,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await b.evaluate('scrollTo(0,0)');
      await wait(`!document.querySelector('.editor-dock').classList.contains('docked')`);
      const columns = await b.evaluate(
        `getComputedStyle(document.querySelector('.with-editor')).gridTemplateColumns.split(' ').map(parseFloat)`,
      );
      assert.equal(columns.length, width >= 744 ? 2 : 1);
      if (width >= 744) assert.ok(Math.abs(columns[0] / columns[1] - 1.5) < 0.01);
      await b.evaluate(
        `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().bottom+50)`,
      );
      await wait(`document.querySelector('.editor-dock').classList.contains('docked')`);
      for (const dy of [0, 350, 600]) {
        await b.evaluate(`scrollBy(0,${dy})`);
        await b.evaluate(
          'new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))',
        );
        const pinned = await b.evaluate(`(() => {
          const d=document.querySelector('.editor-dock'),r=d.getBoundingClientRect(),
            code=document.querySelector('#editor-36-edited .live-python-editor').getBoundingClientRect(),
            grip=document.querySelector('.height-handle'),g=grip.getBoundingClientRect(),
            beside=document.elementFromPoint(r.left+4,r.bottom+g.height/2),
            onGrip=document.elementFromPoint(g.left+g.width/2,g.top+g.height/2);
          return {top:r.top,bottom:r.bottom,codeBottom:code.bottom,frameBottom:d.querySelector('.editor-document:not([hidden])').getBoundingClientRect().bottom,gripTop:g.top,
            stripIntercepted:d.contains(beside),gripReachable:grip.contains(onGrip)};
        })()`);
        assert.ok(
          Math.abs(pinned.top - (width >= 744 ? 16 : 0)) < 1,
          `${width}: code stays visible with test outcomes: ${JSON.stringify(pinned)}`,
        );
        assert.ok(pinned.bottom < 760, `${width}: code fits the viewport`);
        assert.equal(
          pinned.bottom,
          pinned.frameBottom,
          'floating surface stops at the rounded frame',
        );
        assert.equal(pinned.gripTop, pinned.frameBottom, 'grip attaches to the outline');
        assert.equal(
          pinned.stripIntercepted,
          false,
          'space beside the grip belongs to scrolling content',
        );
        assert.equal(pinned.gripReachable, true, 'grip remains interactive');
        assert.ok(
          await b.evaluate(`(() => {
          const actions=[...document.querySelectorAll('.editor-actions button')];
          return actions.length===2 && actions.every(button=>{
            const r=button.getBoundingClientRect();
            return r.top>=0 && r.bottom<=innerHeight && r.left>=0 && r.right<=innerWidth &&
              button.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)) &&
              (innerWidth>=440 || (button.title && document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)===button));
          });
        })()`),
          'Run & test and Reset remain visible and reachable while scrolling',
        );
      }
      await writeFile(
        `/private/tmp/editor-dock-${width}.png`,
        Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
      );
    }
    assert.deepEqual(b.errors, []);
    console.log(
      'Test outcomes preserve pinned code/actions at 1280/1024px; 360px retains mobile docking. Code-frame/grip alignment, transparent grip surround, pointer access and 60/40 columns pass.',
    );
    b.close();
    process.exit(0);
  }
  if (process.argv.includes('--mobile-scroll-only')) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await open(3, 36, 5);
    const originalHeight = await b.evaluate(`${root(36)}.querySelector('.cm-editor').offsetHeight`);
    await b.evaluate(
      `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().bottom+20)`,
    );
    await wait(`document.querySelector('.editor-dock').classList.contains('docked')`);
    await b.evaluate(`document.querySelector('.parts input').focus()`);
    await wait(`document.activeElement === document.querySelector('.parts input')`);
    const focused = await b.evaluate(
      `({top:document.activeElement.getBoundingClientRect().top,bottom:document.querySelector('.editor-dock').getBoundingClientRect().bottom})`,
    );
    assert.ok(
      focused.top >= focused.bottom,
      `focused input clears code: ${JSON.stringify(focused)}`,
    );
    const before = await b.evaluate(`${root(36)}.querySelector('.cm-editor').offsetHeight`);
    await b.evaluate(`document.querySelector('.height-handle').focus({preventScroll:true})`);
    await b.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'ArrowUp',
      code: 'ArrowUp',
      windowsVirtualKeyCode: 38,
    });
    await wait(`${root(36)}.querySelector('.cm-editor').offsetHeight===${before - 20}`);
    assert.ok(
      await b.evaluate(
        `getComputedStyle(${root(36)}.querySelector('.cm-scroller')).overflowY==='auto'`,
      ),
    );
    await b.evaluate(`scrollBy(0,300)`);
    await wait(`Math.abs(document.querySelector('.editor-dock').getBoundingClientRect().top)<1`);
    await b.evaluate('scrollTo(0,0)');
    await wait(`!document.querySelector('.editor-dock').classList.contains('docked')`);
    assert.equal(
      await b.evaluate(`${root(36)}.querySelector('.cm-editor').offsetHeight`),
      before - 20,
      'manual height survives unpinning',
    );
    assert.ok(originalHeight > before, 'pinning initially leaves room for questions');
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 743,
      height: 450,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await open(3, 37, 0);
    await b.evaluate(
      `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().bottom+20)`,
    );
    await wait(`document.querySelector('.editor-dock').classList.contains('docked')`);
    assert.ok(
      await b.evaluate(`document.querySelector('.editor-dock').offsetHeight < innerHeight*.7`),
      'short landscape keeps questions visible',
    );
    await b.evaluate(`document.querySelector('.test-plan').scrollIntoView({block:'start'})`);
    assert.ok(
      await b.evaluate(
        `document.querySelector('.editor-dock').getBoundingClientRect().bottom<=document.querySelector('.test-plan').getBoundingClientRect().top`,
      ),
      'editor releases before the draft below its questions',
    );
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 743,
      height: 1100,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await open(3, 36, 5);
    await b.evaluate(
      `scrollTo(0,scrollY+document.querySelector('.coding-intro').getBoundingClientRect().top-12)`,
    );
    await wait(`!document.querySelector('.editor-dock').classList.contains('docked')`);
    const seams = await b.evaluate(`(() => {
      const intro=document.querySelector('.coding-intro').getBoundingClientRect(),
        dock=document.querySelector('.editor-dock'), rect=dock.getBoundingClientRect(),
        controls=document.querySelector('.editor-space').getBoundingClientRect(),
        side=getComputedStyle(dock,'::before');
      return {topGap:rect.top-intro.bottom,bottomGap:controls.top-rect.bottom,
        lefts:[intro.left,rect.left],rights:[intro.right,rect.right],
        sideDisplay:side.display,tabSides:getComputedStyle(dock.querySelector('.editor-header')).boxShadow};
    })()`);
    assert.equal(seams.topGap, 0);
    assert.equal(seams.bottomGap, 0);
    assert.equal(new Set(seams.lefts).size, 1);
    assert.equal(new Set(seams.rights).size, 1);
    assert.equal(seams.sideDisplay, 'none');
    assert.ok(seams.tabSides.includes('inset'), 'inset tabs retain their side rules');
    await writeFile(
      '/private/tmp/task2-continuous-outline.png',
      Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
    );
    assert.deepEqual(b.errors, []);
    console.log(
      '360px focused fields, manual pinned resizing, editor-only scrolling, restored height, short landscape, release at question end and workspace/header alignment passed.',
    );
    b.close();
    process.exit(0);
  }
  if (process.argv.includes('--presentation-only')) {
    const slot = 36,
      q = esp[0].variations[5],
      outcomes = testOutcomes(q);
    await open(3, slot, 5);
    await enterTestInputs(b, slot, q);
    await enterExpectations(b, slot, q, outcomes.expected);
    const c = studentCases(q)[0];
    await b.evaluate(
      `[...document.querySelectorAll('[data-test-response="${c.actualPart}"] button')].find(b=>b.textContent.trim()==='Run Original code').click()`,
    );
    await wait(
      `document.querySelector('[data-test-response="${c.actualPart}"] .run-result') && !${button(slot, 'Run & test')}.disabled`,
    );
    await b.click('#submit');
    await wait(
      `document.querySelector('.check-results li') && document.querySelector('#submit-result')`,
    );
    const expandedHeight = await b.evaluate(
      `document.querySelector('.check-results').offsetHeight`,
    );
    await b.click('.results-toggle');
    assert.equal(
      await b.evaluate(`document.querySelector('.results-toggle').getAttribute('aria-expanded')`),
      'false',
    );
    assert.ok(
      await b.evaluate(
        `document.querySelector('.check-results').offsetHeight < ${expandedHeight / 2}`,
      ),
    );
    assert.equal(await b.evaluate(`document.querySelector('#check-results-36').hidden`), true);
    await b.click('.results-toggle');
    assert.equal(await b.evaluate(`document.querySelector('#check-results-36').hidden`), false);
    await b.click('.results-toggle');
    await b.click('.test-plan > summary');
    assert.deepEqual(
      await b.evaluate(
        `[...document.querySelectorAll('.test-log thead th')].map(e=>e.textContent.trim())`,
      ),
      [
        'Description of test',
        'Test data',
        'Expected outcome',
        'Actual outcome',
        'Comments and intended actions',
      ],
    );
    assert.equal(await b.evaluate(`document.querySelectorAll('.test-log tbody tr').length`), 2);
    assert.ok(
      await b.evaluate(`document.querySelector('.test-log').innerText.includes('In-store')`),
    );
    assert.ok(await b.evaluate(`document.querySelector('.test-log .run-evidence') !== null`));
    await b.click('#theme-picker');
    await wait('Boolean(document.querySelector(\'[data-theme-choice="dark:rose"]\'))');
    await b.click('[data-theme-choice="dark:rose"]');
    await b.click('#theme-picker');
    for (const width of [360, 743, 744, 820, 821, 834, 1280]) {
      await b.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      await b.evaluate(
        'new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))',
      );
      assert.ok(
        await b.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'),
        `${width}: no page overflow`,
      );
      await b.evaluate('scrollTo(0,0)');
      const edges = await b.evaluate(`(() => {
        const q = document.querySelector('.question'), rect = q.getBoundingClientRect(), css = getComputedStyle(q);
        return {left:rect.left,right:rect.right,viewport:document.documentElement.clientWidth,border:css.borderLeftWidth,radius:css.borderRadius,image:css.backgroundImage};
      })()`);
      if (width <= 820) {
        assert.ok(
          Math.abs(edges.left) < 1 && Math.abs(edges.right - edges.viewport) < 1,
          `${width}: full-width question`,
        );
        assert.equal(edges.border, '0px');
        assert.equal(edges.radius, '0px');
        assert.ok(edges.image.includes('90deg'), `${width}: horizontal border gradient`);
      } else assert.ok(edges.left > 0 && edges.border !== '0px');
      assert.ok(
        await b.evaluate(
          `getComputedStyle(document.querySelector('.coding-workspace')).maxHeight === 'none'`,
        ),
      );
      assert.equal(
        await b.evaluate(`document.querySelector('.guidance-toggle').textContent.trim()`),
        '−',
      );
      await b.click('.guidance-toggle');
      assert.equal(await b.evaluate(`document.querySelector('#code-guidance-36').hidden`), true);
      assert.equal(
        await b.evaluate(`document.querySelector('.guidance-toggle').getAttribute('aria-label')`),
        'Expand code guidance',
      );
      await b.click('.guidance-toggle');
      if (width < 744) {
        await b.evaluate(
          `scrollTo(0, scrollY + document.querySelector('.coding-intro').getBoundingClientRect().bottom + 20)`,
        );
        await wait(`document.querySelector('.editor-dock').classList.contains('docked')`);
        const pinned = await b.evaluate(`(() => {
          const d = document.querySelector('.editor-dock').getBoundingClientRect();
          return {top:d.top,height:d.height,viewport:innerHeight,editor:${root(slot)}.querySelector('.cm-editor').offsetHeight};
        })()`);
        assert.ok(Math.abs(pinned.top) < 1, `${width}: editor pins at viewport top`);
        assert.ok(
          pinned.height < pinned.viewport * 0.6,
          `${width}: questions have visible space below code`,
        );
        await b.evaluate(`scrollBy(0,300)`);
        await wait(
          `Math.abs(document.querySelector('.editor-dock').getBoundingClientRect().top) < 1`,
        );
        await b.evaluate(
          `document.querySelector('.parts').scrollIntoView({block:'start'}); scrollBy(0,-document.querySelector('.editor-dock').offsetHeight-12)`,
        );
        await writeFile(
          `/private/tmp/task2-pinned-${width}.png`,
          Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
        );
        await b.evaluate('scrollTo(0,0)');
        await wait(`!document.querySelector('.editor-dock').classList.contains('docked')`);
      }
      const layout = await b.evaluate(`(() => {
        const wrap = document.querySelector('.test-log-scroll'), table = document.querySelector('.test-log');
        const tabs = [...document.querySelectorAll('.editor-tab')];
        return {scrolls: wrap.scrollWidth > wrap.clientWidth, font:parseFloat(getComputedStyle(table).fontSize),
          backgrounds:tabs.map(t=>getComputedStyle(t).backgroundColor), borders:[...table.querySelectorAll('th,td')].every(e=>getComputedStyle(e).borderRightWidth==='1px')};
      })()`);
      if (width < 1280) assert.equal(layout.scrolls, true);
      assert.ok(layout.font < 16);
      assert.ok(layout.borders);
      assert.notEqual(...layout.backgrounds);
      await b.click('#tab-36-original');
      assert.equal(
        await b.evaluate(
          `document.querySelector('#tab-36-original').getAttribute('aria-selected')`,
        ),
        'true',
      );
      await b.evaluate(`document.querySelector('#tab-36-original').focus()`);
      await b.send('Input.dispatchKeyEvent', {
        type: 'keyDown',
        key: 'End',
        code: 'End',
        windowsVirtualKeyCode: 35,
      });
      assert.equal(
        await b.evaluate(`document.querySelector('#tab-36-edited').getAttribute('aria-selected')`),
        'true',
      );
      await b.evaluate(
        `document.querySelector('.test-log-scroll').scrollIntoView({block:'center'})`,
      );
      if (width === 360) {
        await b.evaluate(`document.querySelector('.test-log-scroll').focus()`);
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
        await wait(`document.querySelector('.test-log-scroll').scrollLeft > 0`, 3000);
        assert.ok(await b.evaluate(`document.querySelector('.test-log-scroll').scrollLeft > 0`));
        await b.evaluate(`document.querySelector('.test-log-scroll').scrollLeft = 0`);
      }
      if ([360, 744, 834].includes(width))
        await writeFile(
          `/private/tmp/task2-log-${width}.png`,
          Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
        );
    }
    await b.evaluate(`document.querySelector('.editor-tabs').scrollIntoView({block:'start'})`);
    await writeFile(
      '/private/tmp/task2-tabs.png',
      Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
    );
    await b.send('Emulation.setDeviceMetricsOverride', {
      width: 360,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });
    for (const [route, selector] of [
      ['/progress/', '.progress-panel'],
      ['/exam/', '.exam-options > .note-panel'],
      ['/search/?q=python', '.search-result'],
    ]) {
      await b.send('Page.navigate', { url: base + route });
      await wait(`document.querySelector(${JSON.stringify(selector)})`, 15000);
      for (const width of [360, 744, 820, 821]) {
        await b.send('Emulation.setDeviceMetricsOverride', {
          width,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false,
        });
        const cards = await b.evaluate(
          `[...document.querySelectorAll(${JSON.stringify(selector)})].map(e=>({left:e.getBoundingClientRect().left,right:e.getBoundingClientRect().right,viewport:document.documentElement.clientWidth,border:getComputedStyle(e).borderLeftWidth,radius:getComputedStyle(e).borderRadius}))`,
        );
        assert.ok(
          cards.every((c) =>
            width <= 820
              ? Math.abs(c.left) < 1 &&
                Math.abs(c.right - c.viewport) < 1 &&
                c.border === '0px' &&
                c.radius === '0px'
              : c.left > 0 && c.border !== '0px',
          ),
          `${route} ${width}: card edges`,
        );
        assert.ok(
          await b.evaluate('document.documentElement.scrollWidth <= innerWidth+1'),
          `${route} ${width}: no overflow`,
        );
      }
    }
    await b.send('Page.navigate', { url: base });
    await wait(`document.querySelector('.activity-grid')`);
    for (const width of [360, 743, 744, 820, 821, 834]) {
      await b.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      const home = await b.evaluate(`(() => {
        const cols=s=>getComputedStyle(document.querySelector(s)).gridTemplateColumns.split(' ').length;
        const rect=s=>document.querySelector(s).getBoundingClientRect();
        return {cards:cols('.activity-grid'),hero:cols('.hero'),overflow:document.documentElement.scrollWidth>innerWidth+1,
          brandRight:Math.max(rect('.brand-icon').right,rect('.brand-copy').right),controlsLeft:rect('#theme-picker').left};
      })()`);
      assert.equal(home.cards, width < 744 ? 2 : 3, `${width}: home columns conserve height`);
      assert.equal(home.hero, width < 744 ? 1 : 2, `${width}: hero columns conserve height`);
      assert.equal(home.overflow, false, `${width}: home fits`);
      assert.ok(home.brandRight <= home.controlsLeft, `${width}: header controls fit`);
    }
    assert.deepEqual(b.errors, []);
    console.log(
      'Compact test log, local scrolling, icon-only disclosures, tabs, mobile card edges and pinned editors passed at 360/743/744/820/821/834/1280px.',
    );
    b.close();
    process.exit(0);
  }
  await open(2, 2, 3);
  assert.equal(await b.evaluate(`${root(2)}.querySelectorAll('.region-empty').length`), 3);
  assert.ok(
    await b.evaluate(
      `[...${root(2)}.querySelectorAll('.region-empty')].every(b=>!b.textContent.trim())`,
    ),
  );
  assert.equal(await b.evaluate(`${button(2, 'Run and compare')}.disabled`), true);
  const untouched = await b.evaluate(text(2));
  await b.evaluate(`${root(2)}.querySelector('.cm-content').focus()`);
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Home',
    code: 'Home',
    windowsVirtualKeyCode: 36,
    modifiers: 2,
  });
  await b.send('Input.insertText', { text: 'x' });
  assert.equal(await b.evaluate(text(2)), untouched, 'fixed code rejects typing');
  await wait(
    'document.querySelector(".editor-guidance").textContent.includes("Edit inside an outlined region")',
  );
  assert.equal(
    await b.evaluate(
      'document.querySelector(".coding-workspace").innerText.includes("Edit inside the outlined regions")',
    ),
    false,
    'feedback replaces the normal instruction',
  );
  for (const [label, value] of [
    ['START value', '20'],
    ['STOP value', '24'],
    ['Function name', 'range'],
  ]) {
    await b.evaluate(`${root(2)}.querySelector('[aria-label="Edit ${label}"]').click()`);
    await b.evaluate(
      'new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))',
    );
    const before = await b.evaluate(`(() => {
      const root = ${root(2)}, gap = root.querySelector('[aria-label="Edit ${label}"]').getBoundingClientRect();
      const caret = root.querySelector('.cm-cursor')?.getBoundingClientRect();
      return { left: gap.left, right: gap.right, caret: caret?.left };
    })()`);
    if (before.caret !== undefined)
      assert.ok(
        Math.abs(before.caret - before.left) <= 2,
        `${label}: caret starts inside left edge ${JSON.stringify(before)}`,
      );
    await b.send('Input.insertText', { text: value });
    const id = { 'START value': '1', 'STOP value': '2', 'Function name': '0' }[label];
    const after = await b.evaluate(
      `${root(2)}.querySelector('[data-region="${id}"]').getBoundingClientRect().left`,
    );
    assert.ok(
      Math.abs(after - before.left) <= 1,
      `${label}: outline moved ${after - before.left}px`,
    );
  }
  assert.match(await b.evaluate(text(2)), /START = 20\nSTOP = 24\nfor ticket in range/);
  assert.match(
    await b.evaluate('document.querySelector(".editor-guidance").textContent'),
    /Edit inside the outlined regions/,
  );
  assert.equal(
    await b.evaluate(
      'getComputedStyle(document.querySelector(".live-python-editor")).borderBottomWidth',
    ),
    '1px',
  );
  assert.ok(
    await b.evaluate('document.querySelector(".height-handle").getBoundingClientRect().width < 42'),
  );
  assert.equal(
    await b.evaluate(
      'getComputedStyle(document.querySelector(".live-python-editor")).borderLeftWidth',
    ),
    '1px',
  );
  assert.equal(
    await b.evaluate(
      'getComputedStyle(document.querySelector(".live-python-editor")).borderRadius',
    ),
    '0px 0px 12px 12px',
  );
  assert.equal(
    await b.evaluate(`getComputedStyle(${root(2)}.querySelector('.cm-editor')).borderRadius`),
    '0px',
  );
  assert.ok(
    await b.evaluate(`(() => {
    const colour = getComputedStyle(document.querySelector('.coding-intro')).borderLeftColor;
    return ['.live-python-editor', '.height-handle'].every(selector => getComputedStyle(document.querySelector(selector)).borderBottomColor === colour);
  })()`),
    'editor and grip borders match the workspace outline',
  );
  assert.equal(await b.evaluate('Boolean(document.querySelector(".coding-intro .muted"))'), true);
  assert.equal(
    await b.evaluate('getComputedStyle(document.querySelector(".coding-intro")).padding'),
    '16px',
  );
  assert.equal(
    await b.evaluate(
      'getComputedStyle(document.querySelector(".coding-intro")).borderTopLeftRadius',
    ),
    '12px',
  );
  assert.equal(
    await b.evaluate('getComputedStyle(document.querySelector(".coding-intro")).borderLeftWidth'),
    '1px',
  );
  assert.equal(
    await b.evaluate(
      'getComputedStyle(document.querySelector(".py-editor-box"), "::before").display',
    ),
    'none',
  );
  await b.evaluate(
    'document.querySelector(".live-python-editor").scrollIntoView({ block: "center" })',
  );
  await writeFile(
    '/private/tmp/starters-editor-grip.png',
    Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
  );
  if (process.argv.includes('--refinements-only')) {
    for (const width of [360, 743, 744, 820, 821, 1280]) {
      await b.send('Emulation.setDeviceMetricsOverride', {
        width,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
      });
      assert.ok(
        await b.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'),
        `${width}: horizontal overflow`,
      );
      assert.equal(
        await b.evaluate('getComputedStyle(document.querySelector(".coding-workspace")).display'),
        'contents',
      );
      const geometry = await b.evaluate(`(() => {
        const workspace = document.querySelector('.coding-workspace'),
          editor = workspace.querySelector('.live-python-editor'),
          columns = getComputedStyle(workspace.parentElement).gridTemplateColumns.split(' ').map(parseFloat);
        const frame = workspace.querySelector('.editor-dock'),
          padding = innerWidth < 744 ? parseFloat(getComputedStyle(workspace.closest('.question')).paddingLeft) : 0;
        return { columns, width: frame.clientWidth + 2 * padding, padding, editor: editor.getBoundingClientRect().width,
          inset: editor.getBoundingClientRect().left - frame.getBoundingClientRect().left,
          textInset: workspace.querySelector('.muted').getBoundingClientRect().left - frame.getBoundingClientRect().left };
      })()`);
      assert.ok(
        Math.abs(geometry.width - geometry.editor) <= 1,
        `${width}: editor spans workspace ${JSON.stringify(geometry)}`,
      );
      assert.ok(
        Math.abs(geometry.inset + geometry.padding) <= 1,
        `${width}: editor crosses question padding only in one column`,
      );
      assert.ok(Math.abs(geometry.textInset - 16) <= 1, `${width}: instructions keep padding`);
      assert.equal(geometry.columns.length, width >= 744 ? 2 : 1);
      if (width >= 744)
        assert.ok(
          Math.abs(geometry.columns[0] / geometry.columns[1] - 1.5) < 0.01,
          `${width}: 60/40 split`,
        );
    }
    console.log(
      '60/40 layout, full-width editor, padded text, workspace outline, temporary edit feedback and responsive sticky layout passed.',
    );
    await b.click('#theme-picker');
    await wait('Boolean(document.querySelector(\'[data-theme-choice="dark:rose"]\'))');
    await b.click('[data-theme-choice="dark:rose"]');
    await b.click('#theme-picker');
    await b.evaluate("document.querySelector('.coding-intro').scrollIntoView({ block: 'center' })");
    await b.evaluate(
      'new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))',
    );
    await writeFile(
      '/private/tmp/starters-workspace-width.png',
      Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
    );
    b.close();
    process.exit(0);
  }
  await b.change('[data-part="3"]', '22', 'input');
  await b.change('[data-part="4"]', '4', 'input');
  assert.equal(await b.evaluate(`${button(2, 'Run and compare')}.disabled`), false);
  assert.equal(await b.evaluate(`Boolean(${button(2, 'Save predictions')})`), false);
  await b.evaluate(`${button(2, 'Run and compare')}.click()`);
  assert.equal(await b.evaluate(`${button(2, 'Run and compare')}.disabled`), false);
  assert.match(await b.evaluate('document.body.innerText'), /Trace the corrected code/);
  assert.equal(
    await b.evaluate('Boolean(document.querySelector(".run-output pre"))'),
    false,
    'rethink precedes output',
  );
  await b.evaluate(`${root(2)}.querySelector('.cm-content').focus()`);
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    modifiers: 2,
  });
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Enter',
    code: 'Enter',
    windowsVirtualKeyCode: 13,
    modifiers: 2,
  });
  await wait(`document.body.innerText.includes('Run finished on')`);
  assert.match(
    await b.evaluate('document.querySelector(".run-output pre").textContent'),
    /20\n21\n22\n23/,
  );
  await b.change('[data-part="3"]', '23', 'input');
  await b.evaluate(`${button(2, 'Run and compare')}.click()`);
  await wait(
    `document.body.innerText.includes('Run finished on') && ![...document.querySelectorAll('button')].some(b=>b.textContent.trim()==='Stop Python')`,
  );
  assert.match(await b.evaluate('document.body.innerText'), /revised after running/);
  // Submit a complete mixed answer and verify the snapshot survives a real page reload.
  await b.evaluate(`document.querySelector('[data-part="5"]').click()`);
  await b.click('#submit');
  await b.until('Boolean(document.querySelector("#submit-result"))');
  await b.reload();
  await wait(`${root(2)}?.querySelector('.cm-content')`);
  assert.match(await b.evaluate(text(2)), /range\(START, STOP\)/);
  console.log('Prediction workflow, empty regions, real execution, submission and reload passed.');

  for (const template of esp.filter(
    (q) =>
      q.slot >= Number(process.argv.find((arg) => arg.startsWith('--from='))?.split('=')[1] ?? 36),
  ))
    for (
      let variation = Number(
        process.argv.find((arg) => arg.startsWith('--variation='))?.split('=')[1] ?? 0,
      );
      variation < template.variations.length;
      variation++
    ) {
      const slot = template.slot,
        q = template.variations[variation];
      await open(3, slot, variation);
      assert.equal(await b.evaluate('document.querySelectorAll("[role=tab]").length'), 2);
      const original = await b.evaluate(text(slot, 'original'));
      const model = q.parts.find((p) => p.kind === 'python').answer;
      await replace(slot, model);
      await b.click(`#tab-${slot}-original`);
      assert.equal(
        await b.evaluate(
          `${root(slot, 'original')}.querySelector('.cm-content').getAttribute('contenteditable')`,
        ),
        'false',
      );
      const outcomes = testOutcomes(q);
      await enterTestInputs(b, slot, q);
      await enterExpectations(b, slot, q, outcomes.expected);
      for (const c of studentCases(q)) {
        await b.evaluate(
          `[...document.querySelectorAll('[data-test-response="${c.actualPart}"] button')].find(b=>b.textContent.trim()==='Run Original code').click()`,
        );
        await wait(
          `document.querySelector('[data-test-response="${c.actualPart}"] .run-result') && !document.querySelector('#stop-python') && !${button(slot, 'Run & test')}.disabled`,
        );
        await enterOutcome(
          b,
          slot,
          c.actualPart,
          outcomes.actual.find((r) => r.label === c.id),
          !q.livePython.testInputs.parameters.length,
        );
      }
      await b.click(`#tab-${slot}-edited`);
      assert.equal(await b.evaluate(text(slot)), model);
      assert.equal(await b.evaluate(text(slot, 'original')), original);
      await b.evaluate(`${button(slot, 'Run & test')}.click()`);
      await wait(
        `document.body.innerText.includes('tests finished on Your code.') && !${button(slot, 'Run & test')}.disabled`,
      );
      assert.ok(
        await b.evaluate(
          `document.querySelectorAll('[data-question="${slot}"] .run-result').length > 0`,
        ),
        `${slot}/${variation} repair tests: ${await b.evaluate('document.querySelector(".live-python").innerText')}`,
      );
      console.log(
        `Task 2 ${slot}/${variation}: original runs, editable copy and configured retests passed.`,
      );
    }
  const slot = 38;
  const initial = await b.evaluate(
    `${root(slot)}.querySelector('.cm-editor').getBoundingClientRect().height`,
  );
  assert.ok(initial <= Math.max(1280 * 1.4, 900 * 0.75));
  await b.evaluate(`document.querySelector('.height-handle').focus()`);
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'ArrowDown',
    code: 'ArrowDown',
    windowsVirtualKeyCode: 40,
  });
  await wait(
    `${root(slot)}.querySelector('.cm-editor').getBoundingClientRect().height > ${initial}`,
    5000,
  );
  await b.evaluate('document.querySelector(".height-handle").scrollIntoView({ block: "center" })');
  await b.evaluate(
    'new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))',
  );
  const grip = await b.evaluate(`(() => {
    const r = document.querySelector('.height-handle').getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  })()`);
  const beforeDrag = await b.evaluate(
    `${root(slot)}.querySelector('.cm-editor').getBoundingClientRect().height`,
  );
  assert.ok(
    await b.evaluate(
      `Boolean(document.elementFromPoint(${grip.x}, ${grip.y})?.closest('.height-handle'))`,
    ),
    `Grip is not visible at ${JSON.stringify(grip)}`,
  );
  await b.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...grip });
  await b.send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    ...grip,
    button: 'left',
    buttons: 1,
    clickCount: 1,
  });
  await b.send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: grip.x,
    y: grip.y + 60,
    button: 'left',
    buttons: 1,
  });
  await b.send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: grip.x,
    y: grip.y + 60,
    button: 'left',
    clickCount: 1,
  });
  await wait(
    `${root(slot)}.querySelector('.cm-editor').getBoundingClientRect().height >= ${beforeDrag + 59}`,
    5000,
  );
  await b.evaluate(`document.querySelector('#tab-${slot}-edited').focus()`);
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Home',
    code: 'Home',
    windowsVirtualKeyCode: 36,
  });
  assert.equal(
    await b.evaluate(
      `document.querySelector('#tab-${slot}-original').getAttribute('aria-selected')`,
    ),
    'true',
  );
  await b.send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'End',
    code: 'End',
    windowsVirtualKeyCode: 35,
  });
  assert.equal(
    await b.evaluate(`document.querySelector('#tab-${slot}-edited').getAttribute('aria-selected')`),
    'true',
  );
  const finalQuestion = esp.at(-1).variations[5];
  await b.evaluate(
    `[...document.querySelectorAll('[data-test-response="c0-own-actual"] button')].find(b=>b.textContent.trim()==='Run Your code').click()`,
  );
  await wait(
    `document.querySelector('[data-test-response="c0-own-actual"]').innerText.includes('Booking confirmed') && !${button(slot, 'Run & test')}.disabled`,
  );
  for (const part of finalQuestion.parts.filter((p) => p.control === 'select'))
    await b.change(`[data-part="${part.id}"]`, part.answer);
  assert.ok(await b.evaluate(`!document.querySelector('.check-results')`));
  assert.equal(
    await b.evaluate(`getComputedStyle(document.querySelector('.coding-workspace')).overflowY`),
    'visible',
  );
  assert.equal(
    await b.evaluate(`getComputedStyle(document.querySelector('.coding-workspace')).maxHeight`),
    'none',
  );
  await b.evaluate(
    `{ const grip = document.querySelector('.height-handle'); for (let i=0;i<60;i++) grip.dispatchEvent(new KeyboardEvent('keydown', { key:'ArrowUp', bubbles:true })); }`,
  );
  await wait(`${root(slot)}.querySelector('.cm-editor').getBoundingClientRect().height <= 101`);
  assert.ok(
    await b.evaluate(
      `${root(slot)}.querySelector('.cm-scroller').scrollHeight > ${root(slot)}.querySelector('.cm-scroller').clientHeight`,
    ),
    'only the shortened code editor scrolls internally',
  );
  await b.reload();
  await wait(`${root(slot)}?.querySelector('.cm-content')`);
  assert.equal(
    await b.evaluate(`document.querySelector('#test-38-invalid-own-inputs-c0-0').value`),
    'no',
  );
  assert.equal(
    await b.evaluate(`document.querySelector('#test-38-c0-own-actual-value').value`),
    '',
  );
  await b.evaluate(`document.querySelector('.coding-intro').scrollIntoView({block:'start'})`);
  await writeFile(
    '/private/tmp/task2-own-workspace.png',
    Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
  );
  await b.click('#submit');
  await wait('Boolean(document.querySelector("#submit-result"))');
  assert.match(
    await b.evaluate('document.querySelector("#submit-result").textContent'),
    /9\s*\/\s*9/,
  );
  for (const width of [360, 768, 1280]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    assert.ok(
      await b.evaluate('document.documentElement.scrollWidth <= innerWidth + 1'),
      `${width}: horizontal overflow`,
    );
  }
  await b.send('Page.navigate', { url: base + '/progress/' });
  await b.until('document.body.innerText.includes("Code attempts and skill progression")');
  await b.click('.attempt-review > summary');
  assert.match(await b.evaluate('document.body.innerText'), /Submitted code · read only/);
  assert.match(await b.evaluate('document.body.innerText'), /Prediction 1/);
  const archiveSelect = '.progress-panel select';
  await b.evaluate(`(() => {
    const select = [...document.querySelectorAll(${JSON.stringify(archiveSelect)})].find(s => [...s.options].some(o => o.value.endsWith(':3:38:5')));
    select.value = [...select.options].find(o => o.value.endsWith(':3:38:5')).value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  })()`);
  await b.click('.attempt-review > summary');
  assert.match(await b.evaluate('document.body.innerText'), /Original code run/);
  assert.match(await b.evaluate('document.body.innerText'), /Your code run/);
  assert.equal(b.errors.length, 0, JSON.stringify(b.errors));
  await writeFile(
    '/private/tmp/starters-editor-review.png',
    Buffer.from((await b.send('Page.captureScreenshot', { format: 'png' })).data, 'base64'),
  );
  console.log('Responsive editor height and read-only attempt review passed.');
} finally {
  b.close();
}
