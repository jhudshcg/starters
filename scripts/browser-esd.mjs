/** Check ESD activities in a dedicated Chrome profile; never use a personal/student browser. */
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { resolve } from '../js/bank.js';
import { BANK_VERSION } from '../js/codes.js';
const base = process.env.STARTERS_PREVIEW_URL ?? 'http://127.0.0.1:8765/starters';
const endpoint = process.env.STARTERS_DEBUG_URL ?? 'http://127.0.0.1:9227';
const target = await (
  await fetch(endpoint + '/json/new?' + encodeURIComponent(base + '/'), { method: 'PUT' })
).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let next = 0;
const pending = new Map(),
  errors = [];
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const p = pending.get(message.id);
    if (!p) return;
    pending.delete(message.id);
    clearTimeout(p.timeout);
    message.error ? p.reject(Error(message.error.message)) : p.resolve(message.result);
  } else if (message.method === 'Page.javascriptDialogOpening') {
    void send('Page.handleJavaScriptDialog', { accept: true });
  } else if (message.method === 'Runtime.exceptionThrown')
    errors.push(message.params.exceptionDetails.text);
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++next;
    const timeout = setTimeout(() => {
      pending.delete(id);
      reject(Error(`Browser command timed out: ${method}`));
    }, 10000);
    pending.set(id, { resolve, reject, timeout });
    ws.send(JSON.stringify({ id, method, params }));
  });
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function until(expression) {
  for (let i = 0; i < 150; i++) {
    if (await evaluate(expression)) return;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw Error('Timed out: ' + expression);
}
const click = (selector) => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
const state = () =>
  evaluate(
    `JSON.parse(localStorage.getItem('dsd-starters-v1:profile:ESD%20review%20test')).active`,
  );
async function setAnswer(part, raw = part.answer) {
  if (part.kind === 'logic-grid') {
    for (const [c, row] of JSON.parse(raw).entries())
      for (const [r, v] of row.entries()) {
        const selector = `[data-challenge-action="candidate"][data-value="${c},${r},${v}"]`;
        await click(selector);
        await click(selector);
      }
  } else if (part.kind === 'choice-set') {
    for (const value of JSON.parse(raw))
      await evaluate(
        `Array.from(document.querySelectorAll('[data-part="${part.id}"]')).find(input=>input.value===${JSON.stringify(value)}).click()`,
      );
  } else if (part.kind === 'choice') {
    await evaluate(
      `Array.from(document.querySelectorAll('[data-part="${part.id}"]')).find(input=>input.value===${JSON.stringify(raw)}).click()`,
    );
  } else {
    const values = part.kind === 'number-tuple' ? JSON.parse(raw) : [raw];
    for (const [i, value] of values.entries()) {
      const selector = `[data-part="${part.id}"]${part.kind === 'number-tuple' ? `[data-field="${i}"]` : ''}`;
      await evaluate(
        `(()=>{const input=document.querySelector(${JSON.stringify(selector)});input.focus();input.value=${JSON.stringify(String(value))};input.dispatchEvent(new Event('input',{bubbles:true}));})()`,
      );
      assert.equal(await evaluate(`document.activeElement.dataset.part`), part.id);
    }
  }
}

try {
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Page.navigate', { url: base + '/' });
  await until(
    `document.querySelector('#profile-name') || document.querySelector('#esd-drafts-heading')`,
  );
  // Reset only this dedicated testing origin, then use a named disposable profile.
  const initialDocument = await evaluate('performance.timeOrigin');
  await evaluate('localStorage.clear()');
  await send('Page.reload');
  await until(
    `performance.timeOrigin !== ${initialDocument} && Boolean(document.querySelector('#profile-name'))`,
  );
  await evaluate(
    `document.querySelector('#profile-name').value='ESD review test';document.querySelector('[role=dialog] form').requestSubmit()`,
  );
  await until(
    `Boolean(document.querySelector('#esd-drafts-heading')) && !document.querySelector('#profile-name')`,
  );
  assert.equal(await evaluate('document.querySelectorAll(".esd-links a").length'), 2);
  for (const slot of process.argv.includes('--search-only') ? [] : [1230, 1231]) {
    const set = resolve({
        version: BANK_VERSION,
        type: 0,
        entries: [{ slot, variation: 0 }],
        minutes: null,
      }),
      q = set.questions[0];
    await send('Page.navigate', { url: base + '/set/?code=' + set.code });
    await until(`document.querySelector('.question')?.dataset.question==='${slot}'`);
    assert.equal(await evaluate('document.querySelector("#submit").disabled'), false);
    assert.equal(
      await evaluate('document.querySelectorAll(".staged-puzzle section").length'),
      q.stages.length,
    );
    assert.equal(await evaluate('document.querySelector(".question-sources").open'), false);
    assert.equal(await evaluate('Boolean(document.querySelector("[data-part=budget]"))'), true);
    await click('.question-sources summary');
    assert.ok(await evaluate('document.querySelector(".question-sources").open'));
    assert.equal(
      await evaluate('document.querySelectorAll(".question-sources a").length'),
      q.sources.length,
    );
    assert.deepEqual((await state()).hints, {});
    await click('.question-sources summary');
    if (slot === 1231) {
      assert.equal(await evaluate('document.querySelectorAll(".candidate-table").length'), 2);
      assert.ok(
        await evaluate(
          'Array.from(document.querySelectorAll(".candidate-axis-vertical")).every(el=>el.textContent==="Plan")',
        ),
      );
      await evaluate('document.querySelector(".candidate-grids").scrollIntoView({block:"center"})');
      const screenshot = await send('Page.captureScreenshot');
      writeFileSync('/private/tmp/esd-longer-grids.png', Buffer.from(screenshot.data, 'base64'));
    }
    if (slot === 1230 && process.argv.includes('--grid-layout')) {
      for (const width of [1100, 375]) {
        await send('Emulation.setDeviceMetricsOverride', {
          width,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false,
        });
        const geometry = await evaluate(`(()=>{
          const table=document.querySelector('.candidate-table');
          const cells=[...table.querySelectorAll('tbody td')].map(el=>({w:el.getBoundingClientRect().width,h:el.getBoundingClientRect().height}));
          const labels=[...table.querySelectorAll('th[scope="row"],th[scope="col"]')];
          const axis=table.querySelector('.candidate-axis-vertical'),axisText=axis.querySelector('span').getBoundingClientRect();
          const axisBounds=axis.getBoundingClientRect();
          const separated=[...table.querySelectorAll('th[scope="row"]')].every(el=>{const range=document.createRange();range.selectNodeContents(el);return axisText.right < range.getBoundingClientRect().left;});
          return {axisContained:axisText.left>=axisBounds.left&&axisText.right<=axisBounds.right,separated,cells,unwrapped:labels.every(el=>getComputedStyle(el).whiteSpace==='nowrap' && el.scrollWidth<=el.clientWidth),axis:table.querySelector('.candidate-axis-vertical').textContent,rotation:getComputedStyle(table.querySelector('.candidate-axis-vertical span')).transform,overflow:document.documentElement.scrollWidth>innerWidth};
        })()`);
        assert.equal(geometry.cells.length, 16);
        assert.ok(
          geometry.cells.every(
            (cell) =>
              Math.abs(cell.w - geometry.cells[0].w) < 1 &&
              Math.abs(cell.h - geometry.cells[0].h) < 1,
          ),
        );
        assert.ok(geometry.unwrapped);
        assert.ok(geometry.axisContained);
        assert.ok(geometry.separated);
        assert.equal(geometry.axis, 'Facility');
        assert.equal(geometry.rotation, 'matrix(-1, 0, 0, -1, 0, 0)');
        assert.equal(geometry.overflow, false);
        await evaluate(
          "document.querySelector('.candidate-table').scrollIntoView({block:'center'})",
        );
        const screenshot = await send('Page.captureScreenshot');
        writeFileSync(`/private/tmp/esd-grid-${width}.png`, Buffer.from(screenshot.data, 'base64'));
        console.log(`Shared grid geometry passed at ${width}px.`);
      }
      await send('Emulation.clearDeviceMetricsOverride');
    }
    for (const [stageIndex, stage] of q.stages.entries()) {
      console.log(`${slot}: stage ${stageIndex + 1} · ${stage.title}`);
      for (const id of stage.parts) {
        const part = q.parts.find((p) => p.id === id);
        await setAnswer(
          part,
          slot === 1231 && id === 'supply'
            ? '26000'
            : slot === 1230 && id === 'budget'
              ? JSON.stringify(
                  JSON.parse(part.answer).filter((option) => option !== 'Glass + Garden'),
                )
              : part.answer,
        );
      }
    }
    // An earlier response stays editable after completing later stages.
    if (slot === 1231) await setAnswer(q.parts.find((p) => p.id === 'supply'));
    assert.equal(await evaluate('document.querySelector("#submit").disabled'), false);
    await click('#submit');
    await until('Boolean(document.querySelector("#submit-result"))');
    assert.equal((await state()).result.earned, slot === 1230 ? 5 : 11);
    assert.equal((await state()).result.assisted, false);
    if (slot === 1230) {
      const feedback = await evaluate(`(()=>{
        const part=document.querySelector('[data-part="budget"]').closest('.part');
        return [...part.querySelectorAll('.option')].map(el=>{
          const status=el.dataset.choiceResult,probe=document.createElement('span');
          probe.style.backgroundColor=status==='correct'?'var(--puzzle-correct-bg)':'var(--puzzle-warning-bg)';el.append(probe);
          const expected=getComputedStyle(probe).backgroundColor;probe.remove();
          return {text:el.textContent,status,checked:el.querySelector('input').checked,background:getComputedStyle(el).backgroundColor,expected};
        });
      })()`);
      assert.equal(feedback.filter((option) => option.status === 'correct').length, 3);
      const missed = feedback.find((option) => option.status === 'missed');
      assert.match(missed.text, /Glass \+ Garden.*Missed answer/);
      assert.equal(missed.checked, false);
      assert.notEqual(
        missed.background,
        feedback.find((option) => option.status === 'correct').background,
      );
      assert.ok(!feedback.some((option) => option.status === 'incorrect'));
      for (const option of feedback.filter((option) => option.status))
        assert.equal(option.background, option.expected, option.text);
      await evaluate(
        `document.querySelector('[data-part="budget"]').closest('.part').scrollIntoView({block:'center'})`,
      );
      const screenshot = await send('Page.captureScreenshot');
      writeFileSync('/private/tmp/esd-missed-option.png', Buffer.from(screenshot.data, 'base64'));
      console.log('Missed answer highlighted; three correct selections remain correct.');
    }
    await click('[data-reveal]');
    assert.ok(await evaluate('Boolean(document.querySelector(".solution"))'));
    console.log(
      `${slot}: Sources, all-stage completion, earlier edits and scoring passed (${set.code}).`,
    );
  }
  for (const query of ['ESD', 'sustainable', 'sustainable decisions']) {
    await send('Page.navigate', { url: base + '/search/?q=' + encodeURIComponent(query) });
    await until("document.querySelectorAll('.search-result').length===2");
    assert.ok(
      await evaluate(
        `Array.from(document.querySelectorAll('.search-result')).every(card=>card.innerText.includes('Student testing') && card.innerText.includes('Open activity') && !card.querySelector('button').disabled)`,
      ),
    );
    assert.ok(
      await evaluate(
        `document.querySelector('#search-results').innerText.includes('Which two facilities?') && document.querySelector('#search-results').innerText.includes('Which recycling plan?')`,
      ),
    );
    console.log(`${query}: both ESD worksheets found and openable.`);
  }
  await click('[data-search-result="0"]');
  await until(
    "document.querySelectorAll('.question').length===1 && document.querySelectorAll('.staged-puzzle section').length===4",
  );
  assert.equal((await state()).search.group, 'logic grids:1231');
  console.log('Search opens one complete worksheet, with no unrelated filler questions.');
  assert.deepEqual(errors, []);
} finally {
  ws.close();
  await fetch(endpoint + '/json/close/' + target.id);
}
