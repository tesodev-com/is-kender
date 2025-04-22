import { mount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Accordion from './Accordion.vue';
import { AccordionItem } from './SubComponents';
import type { AccordionItemProps } from './types';

const items: AccordionItemProps[] = [
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
      global: {
        components: {
          AccordionItem,
        },
      },
    });
  });

  it('renders the correct number of items', () => {
    const items = wrapper.findAllComponents(AccordionItem);
    expect(items.length).toBe(3);
  });

  it('applies the correct classes based on props', () => {
    const accordionItem = wrapper.findComponent(AccordionItem);
    expect(accordionItem.props('separator')).toBe(true);
    expect(accordionItem.props('accordionIconPosition')).toBe('right');
  });

  it('toggles an item open/close on click', async () => {
    const headers = wrapper.findAll('.accordion-header');
    await headers[0].trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.accordionItems[0].isOpen).toBe(true);

    await headers[0].trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.accordionItems[0].isOpen).toBe(false);
  });

  it('closes other items when allowMultiple is false', async () => {
    const headers = wrapper.findAll('.accordion-header');
    await headers[0].trigger('click');
    await wrapper.vm.$nextTick();
    await headers[1].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.accordionItems[0].isOpen).toBe(false);
    expect(wrapper.vm.accordionItems[1].isOpen).toBe(true);
  });

  it('allows multiple open items when allowMultiple is true', async () => {
    await wrapper.setProps({ allowMultiple: true });
    const headers = wrapper.findAll('.accordion-header');

    await headers[0].trigger('click');
    await wrapper.vm.$nextTick();
    await headers[1].trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.accordionItems[0].isOpen).toBe(true);
    expect(wrapper.vm.accordionItems[1].isOpen).toBe(true);
  });

  it('renders slots correctly', async () => {
    const slotWrapper = mount(Accordion, {
      props: {
        allowMultiple: false,
        accordionIconPosition: 'right',
      },
      slots: {
        header: '<span class="custom-title">Custom Title</span>',
        content: '<div class="custom-content">Custom Content</div>',
      },
      global: {
        components: {
          AccordionItem,
        },
      },
    });

    expect(slotWrapper.find('.custom-title').exists()).toBe(true);
    expect(slotWrapper.find('.custom-content').exists()).toBe(false);

    const header = slotWrapper.find('.accordion-header');
    await header.trigger('click');
    await slotWrapper.vm.$nextTick();

    expect(slotWrapper.find('.custom-content').exists()).toBe(true);
  });

  it('emits events when items are opened/closed', async () => {
    const accordionItem = wrapper.findComponent(AccordionItem);
    await accordionItem.vm.$emit('opened');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('openedAccordion')).toBeTruthy();
    expect(wrapper.emitted('openedAccordion')?.[0]).toEqual([items[0], 0]);

    await accordionItem.vm.$emit('closed');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('closedAccordion')).toBeTruthy();
    expect(wrapper.emitted('closedAccordion')?.[0]).toEqual([items[0], 0]);
  });
});
