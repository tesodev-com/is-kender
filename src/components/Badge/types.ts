import type { DefineComponent } from '@/@types/core';

/**
 * Props for the Badge component.
 */
export interface BadgeProps {
  /** The color of the badge. Optional. */
  color?: 'gray' | 'primary' | 'error' | 'warning' | 'success' | 'blue-gray' | 'blue-light' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange';

  /** The size of the badge. Optional. */
  size?: 'sm' | 'md' | 'lg';

  /** The visual style of the badge. Optional. */
  variant?: 'solid' | 'outline' | 'modern';

  /** Whether the badge should have rounded pill shape. Optional. */
  pill?: boolean;

  /** Whether the badge should be displayed as a small dot. Optional. */
  dot?: boolean;

  /** Whether the badge should show only an icon, without text. Optional. */
  onlyIcon?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibBadge: DefineComponent<BadgeProps>;
  }
}
