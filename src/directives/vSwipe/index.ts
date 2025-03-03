import type { SwipeOptions, SwipeState } from './types';

const options: SwipeOptions = {
  delay: 0,
};

const state: SwipeState = {
  isSwiping: false,
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
  deltaX: 0,
  deltaY: 0,
  elapsedTime: 1000,
  startTime: 0,
  swipeSpeed: 0,
};

function onStart(event: MouseEvent | TouchEvent) {
  resetState();
  const e = event instanceof TouchEvent ? event.touches[0] : event;
  setState({
    isSwiping: true,
    startX: e.clientX,
    startY: e.clientY,
    startTime: new Date().getTime(),
    swipeState: 'start',
  });
  triggerSwipe();
  if (options.onSwipeStart) options.onSwipeStart(state);
}

function onMove(event: MouseEvent | TouchEvent) {
  if (!state.isSwiping) return;
  const e = event instanceof TouchEvent ? event.touches[0] : event;
  setState({
    endX: e.clientX,
    endY: e.clientY,
    elapsedTime: new Date().getTime() - state.startTime,
    swipeState: 'move',
  });
  triggerSwipe();
  if (options.onSwipeMove) options.onSwipeMove(state);
}

function onEnd(event: MouseEvent | TouchEvent) {
  if (!state.isSwiping) return;
  const e = event instanceof TouchEvent ? event.touches[0] : event;
  setState({
    isSwiping: false,
    endX: e.clientX,
    endY: e.clientY,
    elapsedTime: new Date().getTime() - state.startTime,
    swipeState: 'end',
  });
  triggerSwipe();
  if (options.onSwipeEnd) options.onSwipeEnd(state);
}

function triggerSwipe() {
  const deltaX = state.endX - state.startX;
  const deltaY = state.endY - state.startY;
  setState({ deltaX, deltaY });
  if (options.delay && state.elapsedTime < options.delay) return;
  setState({ direction: detectDirection(), swipeSpeed: Math.abs(deltaX) / state.elapsedTime });
  if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) >= (options.threshold || 0)) {
    if (options.onSwipe) options.onSwipe(state);
  }
}

function detectDirection() {
  const absX = Math.abs(state.deltaX);
  const absY = Math.abs(state.deltaY);
  if (absX > absY) {
    return state.deltaX > 0 ? 'right' : 'left';
  }
  return state.deltaY > 0 ? 'bottom' : 'top';
}

function setState(values: Partial<SwipeState>) {
  Object.assign(state, values);
}

function resetState() {
  state.startX = 0;
  state.startY = 0;
  state.endX = 0;
  state.endY = 0;
  state.deltaX = 0;
  state.deltaY = 0;
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
  unmounted(el: HTMLElement) {
    el.removeEventListener('touchstart', onStart);
    el.removeEventListener('mousedown', onStart);
    el.removeEventListener('touchmove', onMove);
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('touchend', onEnd);
    el.removeEventListener('mouseup', onEnd);
    el.removeEventListener('touchcancel', onEnd);
    el.removeEventListener('mouseleave', onEnd);
  },
};

export default onSwipe;
