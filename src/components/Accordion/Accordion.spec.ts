import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Accordion from './Accordion.vue';

interface AccordionItem {
  title: string;
  content?: string;
  isOpen?: boolean;
}

const items: AccordionItem[] = [
  { title: 'Item 1', content: 'Content 1', isOpen: false },
  { title: 'Item 2', content: 'Content 2', isOpen: false },
  { title: 'Item 3', content: 'Content 3', isOpen: false },
];

describe('Accordion.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(Accordion, {
      props: {
        items,
        allowMultiple: false,
        accordionIconPosition: 'right',
        separator: true,
      },
    });
  });

  it('renders the correct number of items', () => {
    const items = wrapper.findAll('.accordion-item');
    expect(items.length).toBe(3);
  });

  it('applies the correct classes based on props', () => {
    expect(wrapper.find('.accordion-item').classes()).toContain('accordion-item-separator');
    expect(wrapper.find('.accordion-header').classes()).toContain('accordion-header-right');
  });

  it('toggles an item open/close on click', async () => {
    const headers = wrapper.findAll('.accordion-header');
    await headers[0].trigger('click');
    expect(wrapper.vm.accordionItems[0].isOpen).toBe(true);
    await headers[0].trigger('click');
    expect(wrapper.vm.accordionItems[0].isOpen).toBe(false);
  });

  it('closes other items when allowMultiple is false', async () => {
    const headers = wrapper.findAll('.accordion-header');
    await headers[0].trigger('click');
    await headers[1].trigger('click');
    expect(wrapper.vm.accordionItems[0].isOpen).toBe(false);
    expect(wrapper.vm.accordionItems[1].isOpen).toBe(true);
  });

  it('allows multiple open items when allowMultiple is true', async () => {
    wrapper.setProps({ allowMultiple: true });
    await wrapper.vm.$nextTick();

    const headers = wrapper.findAll('.accordion-header');
    await headers[0].trigger('click');
    await headers[1].trigger('click');

    expect(wrapper.vm.accordionItems[0].isOpen).toBe(true);
    expect(wrapper.vm.accordionItems[1].isOpen).toBe(true);
  });

  it('renders slots correctly', () => {
    const slotWrapper = mount(Accordion, {
      props: { items },
      slots: { title: '<span class="custom-title">Custom Title</span>' },
    });
    expect(slotWrapper.find('.custom-title').exists()).toBe(true);
  });

  it('applies transition hooks correctly', async () => {
    const el = document.createElement('div');
    Object.defineProperty(el, 'scrollHeight', { value: 100 });

    wrapper.vm.beforeEnter(el);
    expect(el.style.height).toBe('0px');

    wrapper.vm.enter(el);
    expect(el.style.height).toBe('100px');

    wrapper.vm.beforeLeave(el);
    expect(el.style.height).toBe('100px');

    wrapper.vm.leave(el);
    expect(el.style.height).toBe('0px');
  });
});
