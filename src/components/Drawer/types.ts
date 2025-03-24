export interface DrawerProps {
  position?: 'left' | 'right' | 'up' | 'down';
  size?: '25%' | '50%' | '100%';
  title?: string;
  hasHeader?: boolean;
  hasCloseButton?: boolean;
}
export type ToggleValue = boolean;
