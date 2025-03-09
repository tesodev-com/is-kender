export interface PositionOptions {
  preferredPosition?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
}

export interface PositionStyle {
  top: string;
  left: string;
  width: string;
}

function getViewportDimensions(): { width: number; height: number } {
  return {
    width: window?.innerWidth || 0,
    height: window?.innerHeight || 0,
  };
}

function getScrollOffsets(): { scrollX: number; scrollY: number } {
  return {
    scrollX: window?.scrollX || 0,
    scrollY: document.documentElement?.scrollTop || window?.scrollY || 0,
  };
}

function checkAvailableSpace(triggerRect: DOMRect, elementRect: DOMRect, viewport: { width: number; height: number }, offset: number): Record<string, boolean> {
  const absoluteTop = triggerRect.top + window.scrollY;
  const absoluteBottom = triggerRect.bottom + window.scrollY;
  const absoluteRight = triggerRect.right + window.scrollX;
  const absoluteLeft = triggerRect.left + window.scrollX;

  return {
    hasSpaceBelow: absoluteBottom + elementRect.height + offset <= viewport.height + window.scrollY,
    hasSpaceAbove: absoluteTop - elementRect.height - offset >= window.scrollY,
    hasSpaceRight: absoluteRight + elementRect.width + offset <= viewport.width + window.scrollX,
    hasSpaceLeft: absoluteLeft - elementRect.width - offset >= window.scrollX,
  };
}

function calculateBottomPosition(triggerRect: DOMRect, elementRect: DOMRect, scrollTop: number, offset: number, hasSpaceBelow: boolean): { top: number; left: number } {
  return {
    top: hasSpaceBelow ? scrollTop + triggerRect.top + triggerRect.height + offset : scrollTop + triggerRect.top - offset - elementRect.height,
    left: triggerRect.left,
  };
}

function calculateTopPosition(triggerRect: DOMRect, elementRect: DOMRect, scrollTop: number, offset: number, hasSpaceAbove: boolean): { top: number; left: number } {
  return {
    top: hasSpaceAbove ? scrollTop + triggerRect.top - offset - elementRect.height : scrollTop + triggerRect.top + triggerRect.height + offset,
    left: triggerRect.left,
  };
}

function calculateRightPosition(triggerRect: DOMRect, elementRect: DOMRect, scrollTop: number, scrollX: number, offset: number, hasSpaceRight: boolean): { top: number; left: number } {
  return {
    top: scrollTop + triggerRect.top,
    left: hasSpaceRight ? triggerRect.right + offset + scrollX : triggerRect.left - offset - elementRect.width + scrollX,
  };
}

function calculateLeftPosition(triggerRect: DOMRect, elementRect: DOMRect, scrollTop: number, scrollX: number, offset: number, hasSpaceLeft: boolean): { top: number; left: number } {
  return {
    top: scrollTop + triggerRect.top,
    left: hasSpaceLeft ? triggerRect.left - offset - elementRect.width + scrollX : triggerRect.right + offset + scrollX,
  };
}

export function calculateElementPosition(containerElement: HTMLElement, triggerElement: HTMLElement, element: HTMLElement, options: PositionOptions = {}): PositionStyle {
  const { preferredPosition = 'bottom', offset = 4 } = options;

  if (typeof window === 'undefined') {
    return { top: '0px', left: '0px', width: '0px' };
  }

  const containerRect = containerElement.getBoundingClientRect();
  const triggerRect = triggerElement.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const viewport = getViewportDimensions();
  const { scrollX, scrollY: scrollTop } = getScrollOffsets();
  const spaceChecks = checkAvailableSpace(triggerRect, elementRect, viewport, offset);
  const elementWidth = containerRect.width;

  let position: { top: number; left: number };

  switch (preferredPosition) {
    case 'bottom':
      position = calculateBottomPosition(triggerRect, elementRect, scrollTop, offset, spaceChecks.hasSpaceBelow);
      break;
    case 'top':
      position = calculateTopPosition(triggerRect, elementRect, scrollTop, offset, spaceChecks.hasSpaceAbove);
      break;
    case 'right':
      position = calculateRightPosition(triggerRect, elementRect, scrollTop, scrollX, offset, spaceChecks.hasSpaceRight);
      break;
    case 'left':
      position = calculateLeftPosition(triggerRect, elementRect, scrollTop, scrollX, offset, spaceChecks.hasSpaceLeft);
      break;
    default:
      position = calculateBottomPosition(triggerRect, elementRect, scrollTop, offset, spaceChecks.hasSpaceBelow);
  }

  return {
    top: `${position.top}px`,
    left: `${position.left}px`,
    width: `${elementWidth}px`,
  };
}
