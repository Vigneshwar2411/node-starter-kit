export const shouldReject = (promise, expectations) => promise.then(
  () => {
    throw new Error('Expected promise to be rejected, but it was resolved');
  }, expectations,
);

export const waitForActionsToFinish = wrapper => new Promise((resolve) => {
  setImmediate(() => {
    if (wrapper) {
      wrapper.update();
    }
    resolve();
  });
});
