export interface SwipeState {
  isSwiping?: boolean;
  startX: number;
  endX: number;
  deltaX: number;
  elapsedTime: number;
  startTime: number;
  direction?: 'left' | 'right';
  swipeState?: 'start' | 'move' | 'end';
}

export interface SwipeOptions {
  threshold: number;
  delay?: number;
  onSwipeLeft?: (event: SwipeState) => any;
  onSwipeRight?: (event: SwipeState) => any;
  onSwipe?: (event: SwipeState) => any;
}
