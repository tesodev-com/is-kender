import type { DefineComponent } from '@/@types/core';

/**
 * Represents a node in the TreeSelect component.
 */
export interface TreeSelectNode {
  /**
   * Value associated with the node.
   */
  value: string;

  /**
   * Label displayed for the node.
   */
  label: string;

  /**
   * Child nodes of this node.
   */
  children?: TreeSelectNode[];

  /**
   * Whether the node is disabled.
   */
  disabled?: boolean;

  /**
   * Optional slot key for custom rendering.
   */
  slotKey?: string;

  /**
   * Whether the node is fully selected.
   */
  isSelected?: boolean;

  /**
   * Whether the node is partially selected.
   */
  isPartial?: boolean;
}

/**
 * Props for a TreeSelect node component.
 */
export interface TreeSelectNodeProps {
  /**
   * Node data.
   */
  node: TreeSelectNode;

  /**
   * Depth level of the node.
   */
  depth: number;

  /**
   * Whether the node is selected.
   */
  isSelected: boolean;

  /**
   * Whether the node is partially selected.
   */
  isPartial: boolean;

  /**
   * Whether the node is expanded.
   */
  isExpanded: boolean;

  /**
   * Index of the node among siblings.
   */
  nodeIndex: number;

  /**
   * Set of currently expanded node values.
   */
  expandedNodes: Set<string>;

  /**
   * Whether multiple selection is enabled.
   */
  isMultiple?: boolean;
}

/**
 * Event callbacks for the TreeSelectNode component.
 */
export interface TreeSelectNodeEmits {
  /**
   * Triggered when a node is selected.
   * @param node The selected node.
   */
  (e: 'select', node: TreeSelectNode): void;

  /**
   * Triggered when a node is expanded or collapsed.
   * @param node The node being toggled.
   */
  (e: 'toggleExpand', node: TreeSelectNode): void;

  /**
   * Triggered when the mouse hovers over a node.
   * @param value The value of the hovered node.
   */
  (e: 'mouseover', value: string): void;
}

/**
 * Props for the TreeSelect component.
 */
export interface TreeSelectProps {
  /**
   * List of tree nodes available for selection.
   */
  treeOptions: TreeSelectNode[];

  /**
   * Whether multiple selection is allowed.
   */
  isMultiple?: boolean;

  /**
   * Whether selecting a parent automatically selects all its children.
   */
  selectAllChild?: boolean;

  /**
   * Label text displayed above the TreeSelect.
   */
  label?: string;

  /**
   * Placeholder text for the TreeSelect input.
   */
  placeholder?: string;

  /**
   * Whether the TreeSelect is disabled.
   */
  disabled?: boolean;

  /**
   * Whether the field is required.
   */
  required?: boolean;

  /**
   * Whether to enable searching through tree nodes.
   */
  isSearch?: boolean;

  /**
   * Preferred position of the options list.
   */
  optionsPosition?: 'top' | 'bottom';

  /**
   * Offset distance of the options list from the input.
   */
  optionsOffset?: number;

  /**
   * Name of the icon displayed on the left.
   */
  leftIcon?: string;

  /**
   * Hint text displayed below the TreeSelect.
   */
  hint?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibTreeSelect: DefineComponent<TreeSelectProps>;
  }
}
