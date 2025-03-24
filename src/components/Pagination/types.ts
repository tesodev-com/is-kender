export interface PaginationProps {
  variant?: 'default' | 'minimal' | 'button-group';
  align?: 'left' | 'center' | 'right';
  totalItems: number;
  itemsPerPage?: number;
  showTopBorder?: boolean;
  outlineButtons?: boolean;
  roundedNumbers?: boolean;
  isMobile?: boolean;
}
