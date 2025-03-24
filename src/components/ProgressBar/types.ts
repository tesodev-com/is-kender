export interface ProgressBarProps {
  showPercentage?: boolean;
  percentageLocation?: 'right' | 'bottom';
  showTooltip?: boolean;
  hoverTooltip?: boolean;
  tooltipLocation?: 'top' | 'bottom';
  maxValue?: number;
  value: number;
}
