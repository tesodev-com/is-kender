export interface BadgeProps {
  color?: 'gray' | 'primary' | 'error' | 'warning' | 'success' | 'blue-gray' | 'blue-light' | 'blue' | 'indigo' | 'purple' | 'pink' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'modern';
  pill?: boolean;
  dot?: boolean;
  onlyIcon?: boolean;
}
