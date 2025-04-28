export interface ButtonProps {
  [key: string]: any;
  el?: 'button' | 'a' | any;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'dark';
  variant?: 'solid' | 'outline' | 'ghost';
  text?: string;
  fluid?: boolean;
  rounded?: 'half' | 'full';
  loading?: boolean;
  iconOnly?: boolean;
}
