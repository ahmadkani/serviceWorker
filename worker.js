  (async function() {
    postMessage(['starting', performance.now()]);
    await wait(2000);
    postMessage(['ended', performance.now()]);
  })();
  function wait(time) {
    return new Promise((res)=>setTimeout(res, time));
  }