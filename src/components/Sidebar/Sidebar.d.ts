import { type DefineComponent, type VNode } from 'vue';

export interface SidebarLink {
  text?: string;
  href?: string;
  disabled?: boolean;
  slotKey?: string;
  isOpen?: boolean;
  iconSrc?: string;
  children?: SidebarLink[];
}

export interface SidebarEmits {
  (e: 'close'): void;
}

export interface SidebarItemEmits {
  (e: 'toggle', link: SidebarLink, index: number): void;
}

export interface SidebarSlots {
  title?: () => VNode[];
  bottom?: () => VNode[];
  [key: string]: ((props: SidebarLink) => VNode[]) | undefined;
}

export interface SidebarProps {
  links: ISidebarLink[];
  title?: string;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  useRouter?: boolean;
  position?: 'left' | 'right';
  isMobile?: boolean;
}

declare const Sidebar: DefineComponent<SidebarProps, SidebarEmits>;

declare module 'vue' {
  export interface GlobalComponents {
    Sidebar: typeof Sidebar;
  }
}

export default Sidebar;
