import { type DefineComponent } from 'vue';

export interface ProgressBarProps {
  showPercentage?: boolean;
  percentageLocation?: 'right' | 'bottom';
  showTooltip?: boolean;
  hoverTooltip?: boolean;
  tooltipLocation?: 'top' | 'bottom';
  maxValue?: number;
  value: number;
}

declare const ProgressBar: DefineComponent<ProgressBarProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibProgressBar: typeof ProgressBar;
  }
}

export default ProgressBar;
