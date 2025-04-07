declare global {
  interface Window {
    EyeDropper: {
      new (): {
        open(): Promise<{ sRGBHex: string }>;
      };
    };
  }
}

/**
 * Props for the ColorPicker component
 */

export interface ColorPickerProps {
  /**
   * Position of the color picker popup relative to the trigger element
   * @default 'bottom'
   */
  pickerPosition?: 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right' | 'right' | 'right-top' | 'right-bottom' | 'left' | 'left-top' | 'left-bottom';

  /**
   * Whether the color picker popup can be dragged around
   * @default false
   */
  isDraggable?: boolean;
  /**
   * Initial position coordinates for the color picker popup
   * @default undefined
   */
  initialPosition?: { x: number; y: number };

  /**
   * Array of predefined colors to show in the color picker
   * @default []
   */
  suggestedColors?: string[];

  /**
   * Available color formats for the color picker
   * @default ['hex']
   */
  colorFormats?: ('hex' | 'rgb' | 'hsb')[];

  /**
   * Custom text labels for the color picker
   * @default { selectColor: 'Select Color', colorPicker: 'Color Picker', suggestedColors: 'Suggested Colors' }
   */
  texts?: {
    selectColor: string;
    colorPicker: string;
    suggestedColors: string;
  };
}
