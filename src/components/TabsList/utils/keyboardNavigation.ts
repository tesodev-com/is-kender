import type { TabsOrientation } from 'library-components/Tabs';

interface KeyboardNavigationParams {
  event: KeyboardEvent;
  tabs: Element[];
  currentValue: string | undefined;
  orientation: TabsOrientation;
  onSelect?: (value: string) => void;
}

const isBrowser = typeof window !== 'undefined';

export const handleTabListKeyDown = ({ event, tabs, currentValue, orientation, onSelect }: KeyboardNavigationParams): void => {
  if (!isBrowser || !currentValue) return;

  const currentIndex = tabs.findIndex(tab => tab.getAttribute('data-value') === currentValue);
  let nextIndex: number | undefined;
  const isHorizontal = orientation === 'horizontal';

  const findNextEnabledTab = (startIndex: number, direction: 1 | -1): number => {
    let index = startIndex;
    const totalTabs = tabs.length;

    for (let i = 0; i < totalTabs; i++) {
      index = (index + direction + totalTabs) % totalTabs;
      if (!(tabs[index] as HTMLButtonElement).disabled) {
        return index;
      }
    }

    return currentIndex;
  };

  switch (event.key) {
    case 'ArrowRight':
      if (isHorizontal) {
        event.preventDefault();
        nextIndex = findNextEnabledTab(currentIndex, 1);
      }
      break;
    case 'ArrowLeft':
      if (isHorizontal) {
        event.preventDefault();
        nextIndex = findNextEnabledTab(currentIndex, -1);
      }
      break;
    case 'ArrowDown':
      if (!isHorizontal) {
        event.preventDefault();
        nextIndex = findNextEnabledTab(currentIndex, 1);
      }
      break;
    case 'ArrowUp':
      if (!isHorizontal) {
        event.preventDefault();
        nextIndex = findNextEnabledTab(currentIndex, -1);
      }
      break;
    case 'Home':
      event.preventDefault();
      // Find first enabled tab from the beginning
      for (let i = 0; i < tabs.length; i++) {
        if (!(tabs[i] as HTMLButtonElement).disabled) {
          nextIndex = i;
          break;
        }
      }
      break;
    case 'End':
      event.preventDefault();
      // Find first enabled tab from the end
      for (let i = tabs.length - 1; i >= 0; i--) {
        if (!(tabs[i] as HTMLButtonElement).disabled) {
          nextIndex = i;
          break;
        }
      }
      break;
  }

  if (nextIndex !== undefined) {
    const nextTab = tabs[nextIndex] as HTMLButtonElement;
    if (!nextTab.disabled) {
      const nextValue = nextTab.getAttribute('data-value');
      if (nextValue) {
        onSelect?.(nextValue);
        if (typeof requestAnimationFrame !== 'undefined') {
          requestAnimationFrame(() => {
            nextTab.focus();
          });
        }
      }
    }
  }
};
