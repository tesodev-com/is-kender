import type { SwipeOptions, SwipeState } from './types';

function getHandlers(options: SwipeOptions, state: SwipeState) {
  function onStart(event: MouseEvent | TouchEvent) {
    if (options.preventDefaultOnStart) event.preventDefault();
    resetState();
    const e = event instanceof TouchEvent ? event.touches[0] : event;

    setState({ swipeState: 'start', startX: e.clientX, startY: e.clientY, startTime: Date.now(), isSwiping: true });

    options.onSwipeStart?.({ ...state });
    options.onSwipe?.({ ...state });
  }

  function onMove(event: MouseEvent | TouchEvent) {
    if (!state.isSwiping) return;
    if (options.preventDefaultOnMove) event.preventDefault();
    const e = event instanceof TouchEvent ? event.touches[0] : event;

    const { deltaX, deltaY, elapsedTime, direction, swipeSpeed } = calculateSwipe({ endX: e.clientX, endY: e.clientY });
    setState({ deltaX, deltaY, elapsedTime, direction, swipeSpeed, swipeState: 'move' });

    options.onSwipeMove?.({ ...state });
    options.onSwipe?.({ ...state });
  }

  function onEnd(event: MouseEvent | TouchEvent) {
    if (options.preventDefaultOnEnd) event.preventDefault();
    if (!state.isSwiping) return;
    const e = event instanceof TouchEvent ? event.touches[0] : event;

    const { deltaX, deltaY, elapsedTime, direction, swipeSpeed } = calculateSwipe({ endX: e.clientX, endY: e.clientY });
    setState({ deltaX, deltaY, elapsedTime, direction, swipeSpeed, swipeState: 'end', isSwiping: false });

    options.onSwipeEnd?.({ ...state });
    options.onSwipe?.({ ...state });
  }

  function calculateSwipe({ startX, startY, endX, endY, startTime }: Partial<SwipeState> = {}) {
    const deltaX = (endX || state.endX) - (startX || state.startX);
    const deltaY = (endY || state.endY) - (startY || state.startY);
    const elapsedTime = Date.now() - (startTime || state.startTime);
    const swipeSpeed = Math.sqrt(deltaX ** 2 + deltaY ** 2) / elapsedTime;
    const direction = detectDirection();
    return { deltaX, deltaY, elapsedTime, direction, swipeSpeed };
  }

  function detectDirection(): SwipeState['direction'] {
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
    setState({
      isSwiping: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      deltaX: 0,
      deltaY: 0,
      elapsedTime: 0,
      startTime: 0,
      swipeSpeed: 0,
    });
  }

  return { onStart, onMove, onEnd };
}

const SwipeDirective = {
  mounted(el: HTMLElement, binding: any) {
    const options: SwipeOptions = {
      preventDefaultOnStart: false,
      preventDefaultOnMove: false,
      preventDefaultOnEnd: false,
      ...binding.value,
    };

    const state: SwipeState = {
      isSwiping: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      deltaX: 0,
      deltaY: 0,
      elapsedTime: 0,
      startTime: 0,
      swipeSpeed: 0,
      direction: 'none',
    };

    const { onStart, onMove, onEnd } = getHandlers(options, state);
    el.addEventListener('touchstart', onStart, { passive: false });
    el.addEventListener('mousedown', onStart);
    el.addEventListener('touchmove', onMove, { passive: false });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('touchend', onEnd, { passive: false });
    el.addEventListener('mouseup', onEnd);
    el.addEventListener('touchcancel', onEnd, { passive: false });
    el.addEventListener('mouseleave', onEnd);

    el._swipeHandlers = { onStart, onMove, onEnd };
  },
  unmounted(el: HTMLElement) {
    if (!el._swipeHandlers) return;
    const { onStart, onMove, onEnd } = el._swipeHandlers;

    el.removeEventListener('touchstart', onStart);
    el.removeEventListener('mousedown', onStart);
    el.removeEventListener('touchmove', onMove);
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('touchend', onEnd);
    el.removeEventListener('mouseup', onEnd);
    el.removeEventListener('touchcancel', onEnd);
    el.removeEventListener('mouseleave', onEnd);

    delete el._swipeHandlers;
  },
};

export default SwipeDirective;

declare global {
  interface HTMLElement {
    _swipeHandlers?: {
      onStart: (event: MouseEvent | TouchEvent) => void;
      onMove: (event: MouseEvent | TouchEvent) => void;
      onEnd: (event: MouseEvent | TouchEvent) => void;
    };
  }
}
