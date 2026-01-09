// waitFor: waits until a conditionFn() returns true
export function waitFor(conditionFn, interval = 16, timeout = 2000) {
  return new Promise((resolve, reject) => {
    const start = performance.now();

    function check() {
      if (conditionFn()) return resolve();  // condition met → resolve
      if (performance.now() - start > timeout) return reject("waitFor() timed out");
      setTimeout(check, interval);          // try again later
    }

    check(); // first check immediately
  });
}
