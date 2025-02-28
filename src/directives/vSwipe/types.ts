export interface SwipeState {
  isSwiping?: boolean;
  startX: number;
  endX: number;
  elapsedTime: number;
  startTime: number;
  distance?: number;
  direction?: 'left' | 'right';
}

export interface SwipeOptions {
  threshold: number;
  delay?: number;
  onSwipeLeft?: (event: SwipeState) => any;
  onSwipeRight?: (event: SwipeState) => any;
  onSwipe?: (event: SwipeState) => any;
}
