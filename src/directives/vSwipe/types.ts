export interface SwipeState {
  isSwiping?: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  deltaX: number;
  deltaY: number;
  elapsedTime: number;
  startTime: number;
  direction?: 'top' | 'left' | 'bottom' | 'right';
  swipeState?: 'start' | 'move' | 'end';
  swipeSpeed: number;
}

export interface SwipeOptions {
  threshold?: number;
  delay?: number;
  onSwipeStart?: (event: SwipeState) => any;
  onSwipeMove?: (event: SwipeState) => any;
  onSwipeEnd?: (event: SwipeState) => any;
  onSwipe?: (event: SwipeState) => any;
}
