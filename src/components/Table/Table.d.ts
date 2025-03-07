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
  (e: 'selectionChange', rows: Row[], row?: Row): void;
  (e: 'removeButtonClick'): void;
  (e: 'editButtonClick'): void;
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
}

declare const Table: DefineComponent<TableProps>;

declare module 'vue' {
  export interface GlobalComponents {
    LibTable: typeof Table;
  }
}

export default Table;
