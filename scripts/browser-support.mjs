/**
 * Purpose: Drive the dedicated Chrome test profile, never a personal browser session.
 * Main contents: CDP requests, evaluation, conditions and input helpers.
 * Used by: migration browser checks. Uses: isolated debugging port 9227. Libs: Node APIs.
 */
export async function browser() {
  const pages = await (await fetch('http://127.0.0.1:9227/json/list')).json();
  const ws = new WebSocket(pages.find((page) => page.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve) => {
    ws.onopen = resolve;
  });
  let id = 0;
  const pending = new Map(),
    errors = [];
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails);
    if (message.id) {
      const task = pending.get(message.id);
      pending.delete(message.id);
      message.error ? task.reject(Error(message.error.message)) : task.resolve(message.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      pending.set(++id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  async function evaluate(expression) {
    const value = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
      userGesture: true,
    });
    if (value.exceptionDetails) throw Error(JSON.stringify(value.exceptionDetails));
    return value.result.value;
  }
  async function until(expression) {
    for (let i = 0; i < 160; i++) {
      if (await evaluate(expression)) return;
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    throw Error(
      `Timed out: ${expression}\n${JSON.stringify(await evaluate('({url:location.href,text:document.body.innerText.slice(0,1500)})'))}`,
    );
  }
  const click = (selector) =>
    evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);
  const change = (selector, value, event = 'change') =>
    evaluate(
      `(()=>{const input=document.querySelector(${JSON.stringify(selector)});input.value=${JSON.stringify(value)};input.dispatchEvent(new Event(${JSON.stringify(event)},{bubbles:true}));})()`,
    );
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setFocusEmulationEnabled', { enabled: true });
  async function reload() {
    const before = await evaluate('performance.timeOrigin');
    await send('Page.reload');
    await until(`performance.timeOrigin !== ${before}`);
  }
  return {
    reload,
    send,
    evaluate,
    until,
    click,
    change,
    errors,
    close: () => ws.close(),
  };
}
