export interface AccordionItemProps {
  title: string;
  content?: string;
  slotKey?: string;
  isOpen?: boolean;
  disabled?: boolean;
}

export interface AccordionProps {
  items?: AccordionItemProps[];
  allowMultiple?: boolean;
  accordionIconPosition?: 'left' | 'right';
  separator?: boolean;
  headerClass?: string;
  contentClass?: string;
  isOpen?: boolean;
}

export interface AccordionEmits {
  (event: 'openedAccordion', item: AccordionItemProps, index: number): void;
  (event: 'closedAccordion', item: AccordionItemProps, index: number): void;
}

export interface AccordionItemComponentProps {
  accordionIconPosition?: 'left' | 'right';
  separator?: boolean;
  headerClass?: string;
  contentClass?: string;
  disabled?: boolean;
  modelValue?: boolean;
  hideIcons?: boolean;
}

export interface AccordionItemEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'opened'): void;
  (e: 'closed'): void;
}
