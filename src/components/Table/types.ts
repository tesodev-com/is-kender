import type { DefineComponent } from '@/@types/core';
import { type VNode } from 'vue';

/**
 * Represents a table column.
 */
export interface Column {
  /**
   * Unique key for the column.
   */
  key: string;

  /**
   * Label text displayed in the column header.
   */
  label: string;

  /**
   * Whether the column is sortable.
   */
  sortable?: boolean;

  /**
   * Inline styles applied to the column.
   */
  style?: string;

  /**
   * Whether the column content can be copied to clipboard.
   */
  copyable?: boolean;
}

/**
 * Represents a table row.
 */
export interface Row {
  [key: string]: any;
}

/**
 * Event callbacks for the Table component.
 */
export interface TableEmits {
  /**
   * Triggered when a column is sorted.
   * @param payload Object containing the key and sort order.
   */
  (e: 'sort', payload: { key: string; order: string }): void;

  /**
   * Triggered when a row is selected.
   * @param row The selected row.
   */
  (e: 'select', row: Row): void;

  /**
   * Triggered when all rows are selected.
   * @param rows The list of selected rows.
   */
  (e: 'selectAll', rows: Row[]): void;

  /**
   * Triggered when the remove button is clicked for a row.
   * @param row The row related to the remove action.
   */
  (e: 'removeButtonClick', row: Row): void;

  /**
   * Triggered when the edit button is clicked for a row.
   * @param row The row related to the edit action.
   */
  (e: 'editButtonClick', row: Row): void;

  /**
   * Triggered when a row is clicked.
   * @param row The clicked row.
   */
  (e: 'rowClick', row: Row): void;

  /**
   * Triggered when a row is copied to clipboard.
   * @param row The row related to the copy action.
   */
  (e: 'copyButtonClick', text: string): void;
}

/**
 * Slots available for the Table component.
 */
export interface TableSlots {
  /**
   * Slot for the table title.
   */
  title?: () => VNode[];

  /**
   * Slot for the table description.
   */
  description?: () => VNode[];

  /**
   * Slot for content on the right side of the table header.
   */
  'header-right'?: () => VNode[];

  /**
   * Slot for when there are no rows to display.
   */
  'row-empty-state'?: () => VNode[];

  /**
   * Custom slot for a specific column.
   */
  [key: `column-${string}`]: ((props: { column: Column }) => VNode[]) | undefined;

  /**
   * Custom slot for a specific row and cell.
   */
  [key: `row-${string}`]: ((props: { row: Row; value: any; rowIndex: number; colIndex: number }) => VNode[]) | undefined;
}

/**
 * Props for the Table component.
 */
export interface TableProps {
  /**
   * Title text displayed above the table.
   */
  title?: string;

  /**
   * Description text displayed below the title.
   */
  description?: string;

  /**
   * List of columns to display.
   */
  columns: Column[];

  /**
   * List of rows to display.
   */
  rows: Row[];

  /**
   * Whether to enable pagination.
   */
  pagination?: boolean;

  /**
   * Number of items to display per page.
   */
  itemsPerPage?: number;

  /**
   * The currently active page number.
   */
  currentPage?: number;

  /**
   * Whether rows can be selected.
   */
  selectable?: boolean;

  /**
   * Whether a search input is shown.
   */
  searchable?: boolean;

  /**
   * Whether rows have striped background styling.
   */
  stripedRows?: boolean;

  /**
   * Whether rows have borders.
   */
  rowsBorder?: boolean;

  /**
   * Whether the header is sticky on scroll.
   */
  stickyHeader?: boolean;

  /**
   * Whether the first column is sticky on scroll.
   */
  stickyFirstColumn?: boolean;

  /**
   * Whether the last column is sticky on scroll.
   */
  stickyLastColumn?: boolean;

  /**
   * Whether to enable virtual scrolling for rows.
   */
  virtualScroll?: boolean;

  /**
   * Height of each row in pixels.
   */
  rowHeight?: number;

  /**
   * Number of extra rows to render before and after the visible area in virtual scroll.
   */
  virtualScrollBuffer?: number;

  /**
   * Whether to select only visible rows when selecting all.
   */
  selectOnlyVisibleRows?: boolean;

  /**
   * Whether to show a loading state.
   */
  loading?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTable: DefineComponent<TableProps, TableSlots, TableEmits>;
  }
}
