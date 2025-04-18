import type { CSSProperties } from 'vue';

export interface PositionOptions {
  pickerPosition: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'right-top' | 'right-bottom' | 'left' | 'left-top' | 'left-bottom';
  triggerElement: HTMLElement;
  popupElement: HTMLElement;
  isMobile?: boolean;
}

export interface PositionResult {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  transform?: string;
}

/**
 * Bir popup/açılır menünün konumunu hesaplar
 * @param options Pozisyon hesaplama seçenekleri
 * @returns Hesaplanan CSS stil özellikleri
 */
export function calculatePosition(options: PositionOptions): CSSProperties {
  const { triggerElement, popupElement, pickerPosition, isMobile } = options;

  if (isMobile) return {};

  const triggerRect = triggerElement.getBoundingClientRect();
  const popupRect = popupElement.getBoundingClientRect();
  const bodyRect = document.documentElement.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  const positionStyles: CSSProperties = {};

  if (pickerPosition.startsWith('bottom', 0)) {
    if (triggerRect.bottom + popupRect.height > viewportHeight) {
      positionStyles.top = `${triggerRect.top - popupRect.height - 5}px`;
    } else {
      positionStyles.top = `${triggerRect.bottom + 5}px`;
    }
    if (pickerPosition.includes('left')) {
      positionStyles.left = `${triggerRect.left}px`;
    } else if (pickerPosition.includes('right')) {
      positionStyles.right = `${window.innerWidth - triggerRect.right}px`;
    } else {
      positionStyles.left = `${triggerRect.left - bodyRect.left + triggerRect.width / 2 - popupRect.width / 2}px`;
    }
  } else if (pickerPosition.startsWith('top', 0)) {
    if (triggerRect.top - popupRect.height < 0) {
      positionStyles.top = `${triggerRect.bottom + 5}px`;
    } else {
      positionStyles.top = `${triggerRect.top - popupRect.height - 5}px`;
    }
    if (pickerPosition.includes('left')) {
      positionStyles.left = `${triggerRect.left}px`;
    } else if (pickerPosition.includes('right')) {
      positionStyles.right = `${window.innerWidth - triggerRect.right}px`;
    } else {
      positionStyles.left = `${triggerRect.left - bodyRect.left + triggerRect.width / 2 - popupRect.width / 2}px`;
    }
  } else if (pickerPosition.startsWith('left', 0)) {
    if (triggerRect.left - popupRect.width < 0) {
      positionStyles.left = `${triggerRect.right + 5}px`;
    } else {
      positionStyles.left = `${triggerRect.left - popupRect.width - 5}px`;
    }
    if (pickerPosition.includes('top')) {
      positionStyles.top = `${triggerRect.top}px`;
    } else if (pickerPosition.includes('bottom')) {
      positionStyles.bottom = `${window.innerHeight - triggerRect.bottom}px`;
    } else {
      positionStyles.top = `${triggerRect.top + triggerRect.height / 2 - popupRect.height / 2}px`;
    }
  } else if (pickerPosition.startsWith('right', 0)) {
    if (triggerRect.right + popupRect.width > viewportWidth && triggerRect.left - popupRect.width - 5 > 0) {
      positionStyles.left = `${triggerRect.left - popupRect.width - 5}px`;
    } else {
      positionStyles.left = `${triggerRect.right + 5}px`;
    }
    if (pickerPosition.includes('top')) {
      positionStyles.top = `${triggerRect.top}px`;
    } else if (pickerPosition.includes('bottom')) {
      positionStyles.bottom = `${window.innerHeight - triggerRect.bottom}px`;
    } else {
      positionStyles.top = `${triggerRect.top + triggerRect.height / 2 - popupRect.height / 2}px`;
    }
  }

  return positionStyles;
}
