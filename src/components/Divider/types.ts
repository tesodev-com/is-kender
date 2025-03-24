export type DividerSize = number | string;

export interface DividerProps {
  is?: string;
  layout?: 'horizontal' | 'vertical';
  roundedFull?: boolean;
  customClass?: string;
}
