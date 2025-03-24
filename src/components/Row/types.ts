export interface RowProps {
  /**
   * Vertical alignment of flex items
   * @default 'top'
   */
  align?: 'top' | 'center' | 'bottom';
  /**
   * Horizontal alignment of flex items
   * @default 'start'
   */
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  /**
   * Flex direction
   * @default 'row'
   */
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  /**
   * Spacing between columns
   * @default 0
   */
  gutter?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}
