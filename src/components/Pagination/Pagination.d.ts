import { type DefineComponent } from 'vue';

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

declare const Pagination: DefineComponent<PaginationProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibPagination: typeof Pagination;
  }
}

export default Pagination;
