import { type Binding, type Tooltip, type TooltipTargetHTMLElement } from '@/directives/vTooltip';
import { type Directive } from 'vue';

const DATA_NAMES = { TOOLTIP_ID: 'data-tooltip-id' };
const vTooltip: Directive = {
  mounted: (el: TooltipTargetHTMLElement, binding: Binding) => {
    const tooltipID = Math.random().toString(36).slice(2, 11);
    el.setAttribute(DATA_NAMES.TOOLTIP_ID, tooltipID);
    el._tooltipBindings = binding.value;
    addListeners(el);
  },
  unmounted(el: TooltipTargetHTMLElement) {
    if (el._tooltipBindings) {
      delete el._tooltipBindings;
    }
    const tooltipID = el.getAttribute(DATA_NAMES.TOOLTIP_ID) || '';
    const tooltip = document.getElementById(tooltipID);
    if (tooltip) {
      tooltip.remove();
    }
    removeListeners(el);
  },
};

function createTooltip(tooltipArgs: Tooltip, id: string) {
  const tooltip = document.createElement('div');
  const child = setTooltipTemplate(tooltipArgs.content, tooltipArgs.title);
  tooltip.appendChild(child);
  tooltip.setAttribute('id', id);
  const hasWidth = Object.prototype.hasOwnProperty.call(tooltipArgs, 'width');
  Object.assign(tooltip.style, {
    position: 'absolute',
    display: 'block',
    borderRadius: '0.5rem',
    boxShadow: '0px 2px 2px rgba(10, 13, 18, 0.04)',
    maxWidth: '200px',
    minHeight: '2rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'rgb(10, 13, 18)',
    color: 'white',
    gap: '4px',
    pointerEvents: 'none',
    opacity: '0',
    transition: 'opacity 0.3s, transform 0.3s',
    zIndex: '1000',
    transform: 'translateY(-10px)',
    fontSize: '0.75rem',
  } as CSSStyleDeclaration);
  if (hasWidth) {
    tooltip.style.width = tooltipArgs.width as string;
    tooltip.style.maxWidth = tooltipArgs.width as string;
  }
  return tooltip;
}

function setTooltipTemplate(content?: string, title?: string) {
  const containerEl = document.createElement('div');
  containerEl.style.display = 'flex';
  containerEl.style.flexDirection = 'column';
  containerEl.style.gap = '4px';
  let titleEl;
  let contentEl;
  if (title) {
    titleEl = document.createElement('p');
    titleEl.style.fontWeight = '700';
    titleEl.innerText = title;
    containerEl.appendChild(titleEl);
  }
  if (content) {
    contentEl = document.createElement('p');
    contentEl.innerText = content;
    containerEl.appendChild(contentEl);
  }
  return containerEl;
}

function positionTooltip(el: TooltipTargetHTMLElement, tooltip: HTMLElement, position: Tooltip['position']) {
  const gap = 4;
  const { offsetHeight: tooltipHeight, offsetWidth: tooltipWidth } = tooltip;
  const { offsetTop: targetOffsetTop, offsetLeft: targetOffsetLeft, offsetWidth: targetOffsetWidth, offsetHeight: targetOffsetHeight } = el;
  const { top: targetViewTop, right: targetViewRight, bottom: targetViewBottom, left: targetViewLeft } = el.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  switch (position) {
    case 'top': {
      const checkInViewport = targetViewTop >= tooltipHeight + gap;
      tooltip.style.top = checkInViewport ? `${targetOffsetTop - gap - tooltipHeight}px` : `${targetOffsetTop + gap + targetOffsetHeight}px`;
      tooltip.style.left = `${targetOffsetLeft - (tooltipWidth - targetOffsetWidth) / 2}px`;
      break;
    }
    case 'right': {
      const checkInViewport = viewportWidth - targetViewRight >= tooltipWidth + gap;
      tooltip.style.top = `${targetOffsetTop + (targetOffsetHeight - tooltipHeight) / 2}px`;
      tooltip.style.left = checkInViewport ? `${targetOffsetLeft + targetOffsetWidth + gap}px` : `${targetOffsetLeft - tooltipWidth - gap}px`;
      break;
    }
    case 'bottom': {
      const checkInViewport = viewportHeight - targetViewBottom >= tooltipHeight + gap;
      tooltip.style.top = checkInViewport ? `${targetOffsetTop + gap + targetOffsetHeight}px` : `${targetOffsetTop - gap - tooltipHeight}px`;
      tooltip.style.left = `${targetOffsetLeft - (tooltipWidth - targetOffsetWidth) / 2}px`;
      break;
    }
    case 'left': {
      const checkInViewport = targetViewLeft >= tooltipWidth + gap;
      tooltip.style.top = `${targetOffsetTop + (targetOffsetHeight - tooltipHeight) / 2}px`;
      tooltip.style.left = checkInViewport ? `${targetOffsetLeft - tooltipWidth - gap}px` : `${targetOffsetLeft + targetOffsetWidth + gap}px`;
      break;
    }
    default:
      break;
  }
  setTimeout(() => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
  }, 0);
}

function addListeners(el: HTMLElement) {
  el.addEventListener('mouseenter', showTooltip);
  el.addEventListener('mouseleave', hideTooltip);
}
function removeListeners(el: HTMLElement) {
  el.removeEventListener('mouseenter', showTooltip);
  el.removeEventListener('mouseleave', hideTooltip);
}

function showTooltip(event: Event) {
  const element = event.target as TooltipTargetHTMLElement;
  const tooltipId = element.getAttribute('data-tooltip-id') || '';
  const isTooltipLive = document.getElementById(tooltipId);
  if (!isTooltipLive) {
    const tooltip = createTooltip(element._tooltipBindings as Tooltip, tooltipId);
    document.body.appendChild(tooltip);
    const tooltipPosition = element._tooltipBindings?.position || 'right';
    if (tooltip) {
      positionTooltip(element, tooltip, tooltipPosition);
    }
  }
}

function hideTooltip(event: Event) {
  const element = event.target as TooltipTargetHTMLElement;
  const tooltipId = element.getAttribute('data-tooltip-id') || '';
  const tooltip = document.getElementById(tooltipId) as HTMLElement;
  tooltip.remove();
}
export default vTooltip;
