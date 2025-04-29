import type { DefineComponent } from '@/@types/core';
import type { SetupContext } from 'vue';

/**
 * Represents a single item in a breadcrumb navigation.
 */
export interface BreadcrumbItemProps {
  /** The display text of the breadcrumb item. */
  text: string;

  /** The link or path for navigation. */
  to: string;

  /** Optional icon to display before the text. */
  icon?: string;

  /** Custom slots for the breadcrumb item. Optional. */
  slots?: SetupContext['slots'];

  /** Whether to use the Vue Router for navigation. Optional. */
  useRouter?: boolean;

  /** Marks this item as the last in the breadcrumb trail. Optional. */
  last?: boolean;
}

/**
 * Props for the Breadcrumb component.
 */
export interface BreadcrumbProps {
  /** List of breadcrumb items (excluding slots and useRouter). */
  items: Omit<BreadcrumbItemProps, 'slots' | 'useRouter'>[];

  /** Whether to use Vue Router for all items. Optional. */
  useRouter?: boolean;

  /** Separator character or symbol between items. Optional. */
  separator?: string;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibBreadcrumb: DefineComponent<BreadcrumbProps>;
  }
}
