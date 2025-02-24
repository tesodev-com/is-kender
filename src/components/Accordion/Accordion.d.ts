import { type DefineComponent } from 'vue';

export interface AccordionItemProps {
  title: string;
  content?: string;
  slotKey?: string;
  isOpen?: boolean;
  disabled?: boolean;
}

export interface AccordionProps {
  items: IAccordionItem[];
  allowMultiple?: boolean;
  accordionIconPosition?: 'left' | 'right';
  separator?: boolean;
}

export interface AccordionEmits {
  (event: 'openedAccordion', item: IAccordionItem, index: number): void;
  (event: 'closedAccordion', item: IAccordionItem, index: number): void;
}

declare const Accordion: DefineComponent<AccordionProps, AccordionEmits>;

declare module 'vue' {
  export interface GlobalComponents {
    Accordion: typeof Accordion;
  }
}

export default Accordion;
