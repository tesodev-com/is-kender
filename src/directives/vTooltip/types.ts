import { type DirectiveBinding } from 'vue';

export interface Tooltip {
  title?: string;
  content?: string;
  position: 'top' | 'right' | 'bottom' | 'left';
  width?: string;
}
export interface Binding extends DirectiveBinding {
  value: Tooltip;
}

export interface TooltipTargetHTMLElement extends HTMLElement {
  _tooltipBindings?: Tooltip;
}
