import type { DefineComponent } from '@/@types/core';

/**
 * Represents a single item in an accordion.
 */
export interface AccordionItemProps {
  /** The title of the accordion item. */
  title: string;

  /** The content of the accordion item. Optional. */
  content?: string;

  /** A unique key for identifying the slot. Optional. */
  slotKey?: string;

  /** Whether the item is open by default. Optional. */
  isOpen?: boolean;

  /** Whether the item is disabled. Optional. */
  disabled?: boolean;
}

/**
 * Props for the Accordion component.
 */
export interface AccordionProps {
  /** List of accordion items. Optional. */
  items?: AccordionItemProps[];

  /** Whether multiple items can be open at the same time. Optional. */
  allowMultiple?: boolean;

  /** Position of the accordion icon, either left or right. Optional. */
  accordionIconPosition?: 'left' | 'right';

  /** Whether to show a separator between items. Optional. */
  separator?: boolean;

  /** Custom class for the header section. Optional. */
  headerClass?: string;

  /** Custom class for the content section. Optional. */
  contentClass?: string;

  /** Whether the entire accordion is open by default. Optional. */
  isOpen?: boolean;
}

/**
 * Events emitted by the Accordion component.
 */
export interface AccordionEmits {
  /**
   * Emitted when an accordion item is opened.
   * @param event - Event name.
   * @param item - The opened accordion item.
   * @param index - Index of the opened item.
   */
  (event: 'openedAccordion', item: AccordionItemProps, index: number): void;

  /**
   * Emitted when an accordion item is closed.
   * @param event - Event name.
   * @param item - The closed accordion item.
   * @param index - Index of the closed item.
   */
  (event: 'closedAccordion', item: AccordionItemProps, index: number): void;
}

/**
 * Props for a single AccordionItem component.
 */
export interface AccordionItemComponentProps {
  /** Position of the accordion icon, either left or right. Optional. */
  accordionIconPosition?: 'left' | 'right';

  /** Whether to show a separator below the item. Optional. */
  separator?: boolean;

  /** Custom class for the header section. Optional. */
  headerClass?: string;

  /** Custom class for the content section. Optional. */
  contentClass?: string;

  /** Whether the item is disabled. Optional. */
  disabled?: boolean;

  /** Whether the item is currently open. Used with v-model. Optional. */
  modelValue?: boolean;

  /** Whether to hide the expand/collapse icons. Optional. */
  hideIcons?: boolean;
}

/**
 * Events emitted by the AccordionItem component.
 */
export interface AccordionItemEmits {
  /**
   * Emitted when the modelValue is updated (open or close).
   * @param value - New value of model (true for open, false for closed).
   */
  (e: 'update:modelValue', value: boolean): void;

  /**
   * Emitted when the item is opened.
   */
  (e: 'opened'): void;

  /**
   * Emitted when the item is closed.
   */
  (e: 'closed'): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibAccordion: DefineComponent<AccordionProps, object, AccordionEmits>;
  }
}
