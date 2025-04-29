import type { DefineComponent } from '@/@types/core';

/**
 * Props for the ProgressBar component.
 */
export interface ProgressBarProps {
  /**
   * Whether to display the percentage value.
   */
  showPercentage?: boolean;

  /**
   * Location where the percentage value is displayed.
   */
  percentageLocation?: 'right' | 'bottom';

  /**
   * Whether to show a tooltip with progress information.
   */
  showTooltip?: boolean;

  /**
   * Whether the tooltip appears on hover.
   */
  hoverTooltip?: boolean;

  /**
   * Location where the tooltip is displayed.
   */
  tooltipLocation?: 'top' | 'bottom';

  /**
   * Maximum value for the progress bar.
   */
  maxValue?: number;

  /**
   * Current value of the progress bar.
   */
  value: number;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibProgressBar: DefineComponent<ProgressBarProps>;
  }
}
