import type { SwipeOptions, SwipeState } from './types';

const options: SwipeOptions = {
  threshold: 50,
  delay: 0,
};

const state: SwipeState = {
  startX: 0,
  endX: 0,
  deltaX: 0,
  elapsedTime: 1000,
  startTime: 0,
  isSwiping: false,
};

function onStart(event: MouseEvent | TouchEvent) {
  resetState();
  state.isSwiping = true;
  const e = event instanceof TouchEvent ? event.touches[0] : event;
  state.startX = e.clientX;
  state.startTime = new Date().getTime();
  state.swipeState = 'start';
}

function onMove(event: MouseEvent | TouchEvent) {
  if (!state.isSwiping) return;
  const e = event instanceof TouchEvent ? event.touches[0] : event;
  state.endX = e.clientX;
  state.elapsedTime = new Date().getTime() - state.startTime;
  state.swipeState = 'move';
  triggerSwipe();
}

function onEnd(event: MouseEvent | TouchEvent) {
  state.isSwiping = false;
  const e = event instanceof TouchEvent ? event.touches[0] : event;
  state.endX = e.clientX;
  state.elapsedTime = new Date().getTime() - state.startTime;
  state.swipeState = 'end';
  triggerSwipe();
}

function triggerSwipe() {
  const deltaX = state.endX - state.startX;
  setState({ deltaX });
  if (options.delay && state.elapsedTime < options.delay) return;
  if (Math.abs(deltaX) >= options.threshold) {
    if (deltaX > 0 && options.onSwipeRight) {
      setState({ direction: 'right' });
      options.onSwipeRight(state);
    } else if (deltaX < 0 && options.onSwipeLeft) {
      setState({ direction: 'left' });
      options.onSwipeLeft(state);
    } else if (options.onSwipe) {
      setState({ direction: deltaX > 0 ? 'right' : 'left' });
      options.onSwipe(state);
    }
  }
}

function setState(values: Partial<SwipeState>) {
  Object.assign(state, values);
}

function resetState() {
  state.startX = 0;
  state.endX = 0;
  state.elapsedTime = 0;
  state.startTime = 0;
}

const onSwipe = {
  mounted(el: HTMLElement, binding: any) {
    Object.assign(options, binding.value);
    el.addEventListener('touchstart', onStart);
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchmove', onMove);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchend', onEnd);
    el.addEventListener('mouseup', onEnd);
    el.addEventListener('touchcancel', onEnd);
    el.addEventListener('mouseleave', onEnd);
  },
};

export default onSwipe;
