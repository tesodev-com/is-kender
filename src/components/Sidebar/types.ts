import type { DefineComponent } from '@/@types/core';
import { type VNode } from 'vue';

/**
 * Represents a link item inside the Sidebar.
 */
export interface SidebarLink {
  /**
   * Display text of the link.
   */
  text?: string;

  /**
   * URL or path the link navigates to.
   */
  href?: string;

  /**
   * Whether the link is disabled.
   */
  disabled?: boolean;

  /**
   * Optional slot key for custom rendering.
   */
  slotKey?: string;

  /**
   * Whether the link is currently expanded (for nested links).
   */
  isOpen?: boolean;

  /**
   * Source URL for the icon displayed next to the link.
   */
  iconSrc?: string;

  /**
   * List of child links for nested navigation.
   */
  children?: SidebarLink[];
}

/**
 * Event callbacks for the Sidebar component.
 */
export interface SidebarEmits {
  /**
   * Triggered when the sidebar is closed.
   */
  (e: 'close'): void;
}

/**
 * Event callbacks for SidebarItem component.
 */
export interface SidebarItemEmits {
  /**
   * Triggered when a link is toggled open or closed.
   * @param link The link being toggled.
   * @param index The index of the link in the list.
   */
  (e: 'toggle', link: SidebarLink, index: number): void;
}

/**
 * Slots available for the Sidebar component.
 */
export interface SidebarSlots {
  /**
   * Slot for the title section.
   */
  title?: () => VNode[];

  /**
   * Slot for the bottom section.
   */
  bottom?: () => VNode[];

  /**
   * Custom slot for a specific sidebar link.
   */
  [key: string]: ((props: SidebarLink) => VNode[]) | undefined;
}

/**
 * Props for the Sidebar component.
 */
export interface SidebarProps {
  /**
   * List of links to display in the sidebar.
   */
  links: SidebarLink[];

  /**
   * Title displayed at the top of the sidebar.
   */
  title?: string;

  /**
   * Whether clicking outside the sidebar closes it.
   */
  closeOnOutsideClick?: boolean;

  /**
   * Whether pressing the Escape key closes the sidebar.
   */
  closeOnEscape?: boolean;

  /**
   * Whether to use the router for navigation.
   */
  useRouter?: boolean;

  /**
   * Position of the sidebar on the screen.
   */
  position?: 'left' | 'right';

  /**
   * Whether the sidebar is optimized for mobile view.
   */
  isMobile?: boolean;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibSidebar: DefineComponent<SidebarProps, SidebarSlots, SidebarEmits>;
  }
}
