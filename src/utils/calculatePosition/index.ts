export interface PositionOptions {
  preferredPosition?: 'top' | 'bottom' | 'left' | 'right';
  offset?: number;
}

export interface PositionStyle {
  top: string;
  left: string;
  width: string;
}

export function calculateDropdownPosition(containerRect: DOMRect, triggerRect: DOMRect, dropdownRect: DOMRect, options: PositionOptions = {}): PositionStyle {
  const { preferredPosition = 'bottom', offset = 4 } = options;

  if (typeof window === 'undefined') return { top: '0px', left: '0px', width: '0px' };

  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Use container width for dropdown, but trigger for position
  const dropdownWidth = containerRect.width;
  const dropdownHeight = dropdownRect.height;

  // Trigger coordinates (viewport-relative)
  const triggerTop = triggerRect.top;
  const triggerLeft = triggerRect.left;
  const triggerBottom = triggerRect.bottom;
  const triggerRight = triggerRect.right;

  // Absolute coordinates with scroll for space checks
  const absoluteTop = triggerRect.top + window.scrollY;
  const absoluteBottom = triggerRect.bottom + window.scrollY;

  let top: number, left: number;

  // Helper to check available space (absolute)
  const hasSpaceBelow = absoluteBottom + dropdownHeight + offset <= viewportHeight + window.scrollY;
  const hasSpaceAbove = absoluteTop - dropdownHeight - offset >= window.scrollY;
  const hasSpaceRight = triggerRight + dropdownWidth + offset <= viewportWidth + window.scrollX;
  const hasSpaceLeft = triggerLeft - dropdownWidth - offset >= window.scrollX;

  console.log('Viewport:', { width: viewportWidth, height: viewportHeight });
  console.log('Trigger (viewport):', { top: triggerTop, bottom: triggerBottom, left: triggerLeft, right: triggerRight });
  console.log('Trigger (absolute):', { top: absoluteTop, bottom: absoluteBottom });
  console.log('Dropdown:', { width: dropdownWidth, height: dropdownHeight });
  console.log('Space:', { below: hasSpaceBelow, above: hasSpaceAbove, right: hasSpaceRight, left: hasSpaceLeft });

  // Determine position with flip logic (viewport-relative, based on trigger)
  switch (preferredPosition) {
    case 'bottom':
      if (hasSpaceBelow) {
        top = triggerBottom + offset; // Position below trigger
        left = triggerLeft;
      } else if (hasSpaceAbove) {
        top = triggerTop - dropdownHeight - offset;
        left = triggerLeft;
      } else {
        top = viewportHeight - dropdownHeight; // Fallback
        left = triggerLeft;
      }
      break;

    case 'top':
      if (hasSpaceAbove) {
        top = triggerTop - dropdownHeight - offset;
        left = triggerLeft;
      } else if (hasSpaceBelow) {
        top = triggerBottom + offset;
        left = triggerLeft;
      } else {
        top = 0; // Fallback to top of viewport
        left = triggerLeft;
      }
      break;

    case 'right':
      if (hasSpaceRight) {
        top = triggerTop;
        left = triggerRight + offset;
      } else if (hasSpaceLeft) {
        top = triggerTop;
        left = triggerLeft - dropdownWidth - offset;
      } else {
        top = triggerTop;
        left = viewportWidth - dropdownWidth;
      }
      break;

    case 'left':
      if (hasSpaceLeft) {
        top = triggerTop;
        left = triggerLeft - dropdownWidth - offset;
      } else if (hasSpaceRight) {
        top = triggerTop;
        left = triggerRight + offset;
      } else {
        top = triggerTop;
        left = 0;
      }
      break;

    default:
      if (hasSpaceBelow) {
        top = triggerBottom + offset;
        left = triggerLeft;
      } else if (hasSpaceAbove) {
        top = triggerTop - dropdownHeight - offset;
        left = triggerLeft;
      } else {
        top = viewportHeight - dropdownHeight;
        left = triggerLeft;
      }
  }

  // Adjust to be relative to the container (not trigger, since container is position: relative)
  const relativeTop = top - containerRect.top;
  const relativeLeft = left - containerRect.left;

  console.log('Final (absolute):', { top: `${top}px`, left: `${left}px`, width: `${dropdownWidth}px` });
  console.log('Final (relative):', { top: `${relativeTop}px`, left: `${relativeLeft}px`, width: `${dropdownWidth}px` });

  return {
    top: `${relativeTop}px`,
    left: `${relativeLeft}px`,
    width: `${dropdownWidth}px`,
  };
}
