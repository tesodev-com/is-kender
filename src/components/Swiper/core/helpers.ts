export default {
  getModulo(index: number, length: number) {
    return ((index % length) + length) % length;
  },
  delayedExec(callback: () => void, delay = 0) {
    callback();
    return new Promise<void>(resolve =>
      setTimeout(() => {
        resolve();
      }, delay)
    );
  },
};
