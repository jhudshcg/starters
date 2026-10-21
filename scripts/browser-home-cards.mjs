/** Real pointer and keyboard hits must activate the whole home card, not just its link. */
import assert from 'node:assert/strict';
import { browser } from './browser-support.mjs';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765';
const b = await browser();
async function pointer(selector, edge = false) {
  await b.evaluate(
    `document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'});new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))`,
  );
  const point = await b.evaluate(
    `(()=>{const e=document.querySelector(${JSON.stringify(selector)});const r=e.getBoundingClientRect();const x=r.left+${edge ? '8' : 'r.width/2'},y=r.top+${edge ? '8' : 'r.height/2'};const hit=document.elementFromPoint(x,y);return {x,y,link:hit?.closest('a')?.getAttribute('data-start')??null,hit:hit?.tagName,bodyPointer:getComputedStyle(document.body).pointerEvents,bodyStyle:document.body.getAttribute('style'),dialogs:document.querySelectorAll('[role=dialog]').length,htmlPointer:getComputedStyle(document.documentElement).pointerEvents,position:getComputedStyle(e).position,linkPosition:getComputedStyle(e.closest('.type-card').querySelector('[data-start]')).position};})()`,
  );
  assert.notEqual(
    point.link,
    null,
    `${selector}: the real hit target must be the activity link (${JSON.stringify(point)})`,
  );
  await b.send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    x: point.x,
    y: point.y,
    button: 'left',
    clickCount: 1,
  });
  const pressed = await b.evaluate(
    `(()=>{const hit=document.elementFromPoint(${point.x},${point.y});const link=document.querySelector('[data-start="${point.link}"]');return {link:hit?.closest('a')?.dataset.start??null,translate:getComputedStyle(link).translate}})()`,
  );
  assert.equal(
    pressed.link,
    point.link,
    `Pressing must preserve the card hit area: ${JSON.stringify(pressed)}`,
  );
  await b.send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: point.x,
    y: point.y,
    button: 'left',
    clickCount: 1,
  });
}
async function destination(type) {
  await b.until(
    type === 1
      ? 'Boolean(document.querySelector("[data-exam-start]"))'
      : type === 0
        ? 'Boolean(document.querySelector(".puzzle-cards"))'
        : 'Boolean(document.querySelector("#display-code"))',
  );
  assert.equal(
    await b.evaluate('location.pathname'),
    new URL(base + (type === 1 ? '/exam/' : '/practice/')).pathname,
  );
  if (type !== 1)
    assert.equal(await b.evaluate('new URL(location.href).searchParams.get("type")'), String(type));
  await b.evaluate('history.back()');
  await b.until('Boolean(document.querySelector(".activity-grid"))');
}
try {
  await b.send('Page.navigate', { url: base + '/' });
  await b.until('Boolean(document.querySelector("#main"))');
  await b.evaluate('localStorage.clear()');
  await b.reload();
  await b.until('Boolean(document.querySelector("#profile-name"))');
  await b.change('#profile-name', 'Home Card Test', 'input');
  await b.evaluate('document.querySelector("[role=dialog] form").requestSubmit()');
  await b.until('Boolean(document.querySelector(".activity-grid"))');
  await b.until('getComputedStyle(document.body).pointerEvents !== "none"');
  for (const width of [360, 440, 1280]) {
    await b.send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 1000,
      deviceScaleFactor: 1,
      mobile: false,
    });
    for (const type of [1, 2, 0]) {
      for (const target of ['h3', '.card-art', '.card-bottom small', '[data-start]', '']) {
        await pointer(`.type-${type}${target ? ' ' + target : ''}`, !target);
        await destination(type);
      }
      await b.evaluate(`document.querySelector('.type-${type} [data-start]').focus()`);
      await b.send('Input.dispatchKeyEvent', {
        type: 'keyDown',
        key: 'Enter',
        code: 'Enter',
        windowsVirtualKeyCode: 13,
      });
      await b.send('Input.dispatchKeyEvent', {
        type: 'keyUp',
        key: 'Enter',
        code: 'Enter',
        windowsVirtualKeyCode: 13,
      });
      await destination(type);
    }
  }
  assert.deepEqual(b.errors, []);
  console.log(
    'All three home cards navigate from title, artwork, metadata, button and padding; keyboard activation and Back pass at 360/440/1280px.',
  );
} finally {
  await b.send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    x: 0,
    y: 0,
    button: 'left',
    clickCount: 1,
  });
  b.close();
}
