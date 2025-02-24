import { type DefineComponent } from 'vue';

export interface BadgeProps {
  color?: 'gray' | 'primary' | 'error' | 'warning' | 'success' | 'blue-gray' | 'blue-light' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'modern';
  pill?: boolean;
  dot?: boolean;
  onlyIcon?: boolean;
}

declare const Badge: DefineComponent<BadgeProps>;

declare module 'vue' {
  export interface GlobalComponents {
    Badge: typeof Badge;
  }
}

export default Badge;
