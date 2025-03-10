import { type DefineComponent, type VNode } from 'vue';

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface Row {
  [key: string]: any;
}

export interface TableEmits {
  (e: 'sort', { key: string, order: string }): void;
  (e: 'select', row: Row): void;
  (e: 'selectAll', rows: Row[]): void;
  (e: 'removeButtonClick', row: Row): void;
  (e: 'editButtonClick', row: Row): void;
}

export interface TableSlots {
  title?: () => VNode[];
  description?: () => VNode[];
  'header-right'?: () => VNode[];
  'row-empty-state'?: () => VNode[];
  [key: `column-${string}`]: ((props: { column: Column }) => VNode[]) | undefined;
  [key: `row-${string}`]: ((props: { row: Row; value: any; rowIndex: number; colIndex: number }) => VNode[]) | undefined;
}

export interface TableProps {
  title?: string;
  description?: string;
  columns: Column[];
  rows: Row[];
  selectable?: boolean;
  searchable?: boolean;
  stripedRows?: boolean;
  stickyHeader?: boolean;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
}

declare const Table: DefineComponent<TableProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTable: typeof Table;
  }
}

export default Table;
