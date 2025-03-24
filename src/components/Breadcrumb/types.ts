import type { SetupContext } from 'vue';

export interface BreadcrumbItemProps {
  text: string;
  to: string;
  icon?: string;
  slots?: SetupContext['slots'];
  useRouter?: boolean;
  last?: boolean;
}

export interface BreadcrumbProps {
  items: Omit<BreadcrumbItemProps, 'slots' | 'useRouter'>[];
  useRouter?: boolean;
  separator?: string;
}
