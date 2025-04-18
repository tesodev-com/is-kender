export interface TreeSelectNode {
  value: string;
  label: string;
  children?: TreeSelectNode[];
  disabled?: boolean;
  slotKey?: string;
  isSelected?: boolean;
  isPartial?: boolean;
}

export interface TreeSelectNodeProps {
  node: TreeSelectNode;
  depth: number;
  isSelected: boolean;
  isPartial: boolean;
  isExpanded: boolean;
  nodeIndex: number;
  expandedNodes: Set<string>;
  isMultiple?: boolean;
}

export interface TreeSelectNodeEmits {
  (e: 'select', node: TreeSelectNode): void;
  (e: 'toggleExpand', node: TreeSelectNode): void;
  (e: 'mouseover', value: string): void;
}

export interface TreeSelectProps {
  treeOptions: TreeSelectNode[];
  isMultiple?: boolean;
  selectAllChild?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isSearch?: boolean;
  optionsPosition?: 'top' | 'bottom';
  optionsOffset?: number;
  leftIcon?: string;
  hint?: string;
}
