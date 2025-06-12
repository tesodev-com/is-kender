import type { DefineComponent } from '@/@types/core';

export interface AccordionProps {
  /**
   * Position of the accordion icon
   * @default 'right'
   */
  accordionIconPosition?: 'left' | 'right';
  /**
   * Custom class for the header of the accordion
   * @default ''
   */
  headerClass?: string;
  /**
   * Custom class for the content of the accordion
   * @default ''
   */
  contentClass?: string;
  /**
   * Header text content
   * @default ''
   */
  header?: string;
  /**
   * Content text or HTML content
   * @default ''
   */
  content?: string;
  /**
   * If true, the accordion cannot be toggled
   * @default false
   */
  disabled?: boolean;
  /**
   * Custom icon for the open state
   * @default ''
   */
  openIcon?: string;
  /**
   * Custom icon for the close state
   * @default ''
   */
  closeIcon?: string;
  /**
   * If true, hides the toggle icons
   * @default false
   */
  hideIcons?: boolean;
}

export interface AccordionEmits {
  /**
   * Emitted when the accordion is opened
   */
  (event: 'open'): void;
  /**
   * Emitted when the accordion is closed
   */
  (event: 'close'): void;
}

export interface AccordionSlots {
  /**
   * Slot for the header content
   * @param props - Props passed to the slot
   * @param props.isOpen - Indicates if the accordion is open
   * @param props.toggle - Function to toggle the accordion
   * @param props.accordionIconPosition - Position of the accordion icon
   */
  header(props: { isOpen: boolean; toggle: () => void; accordionIconPosition: AccordionProps['accordionIconPosition'] }): any;

  /**
   * Slot for the content of the accordion
   * @param props - Props passed to the slot
   * @param props.isOpen - Indicates if the accordion is open
   * @param props.toggle - Function to toggle the accordion
   * @param props.accordionIconPosition - Position of the accordion icon
   */
  content(props: { isOpen: boolean; toggle: () => void; accordionIconPosition: AccordionProps['accordionIconPosition'] }): any;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibAccordion: DefineComponent<AccordionProps, AccordionSlots, AccordionEmits>;
  }
}
