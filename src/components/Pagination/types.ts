import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Pagination component.
 */
export interface PaginationProps {
  /**
   * The style variant of the pagination.
   */
  variant?: 'default' | 'minimal' | 'button-group';

  /**
   * Alignment of the pagination controls.
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Total number of items to paginate.
   */
  totalItems: number;

  /**
   * Number of items per page.
   */
  itemsPerPage?: number;

  /**
   * Whether to show a top border above the pagination.
   */
  showTopBorder?: boolean;

  /**
   * Whether to use outlined style for pagination buttons.
   */
  outlineButtons?: boolean;

  /**
   * Whether to round the page number buttons.
   */
  roundedNumbers?: boolean;

  /**
   * Whether to use a mobile-optimized layout.
   */
  isMobile?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibPagination: DefineComponent<PaginationProps>;
  }
}
