export interface SwipeState {
  // Operation status
  isSwiping: boolean;
  swipeState?: 'start' | 'move' | 'end';

  // Coordinates
  startX: number;
  startY: number;
  endX: number;
  endY: number;

  // Calculated values
  deltaX: number;
  deltaY: number;
  direction: 'left' | 'right' | 'top' | 'bottom' | 'none';

  // Time and velocity
  startTime: number;
  elapsedTime: number;
  swipeSpeed: number;
}

export interface SwipeOptions {
  // General settings
  preventDefaultOnStart?: boolean;
  preventDefaultOnMove?: boolean;
  preventDefaultOnEnd?: boolean;

  // Callbacks
  onSwipe?: (state: SwipeState) => void;
  onSwipeStart?: (state: SwipeState) => void;
  onSwipeMove?: (state: SwipeState) => void;
  onSwipeEnd?: (state: SwipeState) => void;
}
