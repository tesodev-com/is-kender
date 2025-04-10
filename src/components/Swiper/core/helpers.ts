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
  generateUUID() {
    return Math.random().toString(36).substring(2, 9);
  },
  getSlideIndex(slide: HTMLElement | null) {
    return parseInt(slide?.getAttribute('data-index') || '0') || 0;
  },
};
