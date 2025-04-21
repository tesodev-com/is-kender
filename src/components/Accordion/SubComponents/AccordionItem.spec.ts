import { addCircleOutlineIcon, removeCircleOutlineIcon } from '@/assets/icons';
import { mount, type VueWrapper } from '@vue/test-utils';
import Svg from 'library-components/Svg';
import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import AccordionItem from './AccordionItem.vue';

describe('AccordionItem.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(AccordionItem, {
      props: {
        modelValue: false,
        accordionIconPosition: 'right',
        separator: true,
      },
      global: {
        components: {
          Svg,
        },
        provide: {
          addCircleOutlineIcon,
          removeCircleOutlineIcon,
        },
      },
    });
  });

  it('renders correctly with default props', () => {
    expect(wrapper.find('.accordion-item').exists()).toBe(true);
    expect(wrapper.find('.accordion-header').exists()).toBe(true);
    expect(wrapper.find('.accordion-content-container').exists()).toBe(false);
  });

  it('applies transition hooks correctly', async () => {
    const el = document.createElement('div');
    const content = document.createElement('div');
    content.classList.add('accordion-content');
    el.appendChild(content);
    Object.defineProperty(content, 'getBoundingClientRect', {
      value: () => ({ height: 100 }),
    });

    wrapper.vm.beforeEnter(el);
    expect(el.style.height).toBe('0px');

    wrapper.vm.enter(el);
    expect(el.style.height).toBe('100px');

    wrapper.vm.beforeLeave(el);
    expect(el.style.height).toBe('100px');

    wrapper.vm.leave(el);
    expect(el.style.height).toBe('0px');
  });

  it('does not toggle when disabled', async () => {
    await wrapper.setProps({ disabled: true });
    await nextTick();
    const header = wrapper.find('.accordion-header');
    await header.trigger('click');
    await nextTick();
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('renders custom header and content slots', async () => {
    const slotWrapper = mount(AccordionItem, {
      props: {
        modelValue: false,
        accordionIconPosition: 'right',
      },
      slots: {
        header: '<div class="custom-header">Custom Header</div>',
        content: '<div class="custom-content">Custom Content</div>',
      },
      global: {
        components: {
          Svg,
        },
        provide: {
          addCircleOutlineIcon,
          removeCircleOutlineIcon,
        },
      },
    });

    expect(slotWrapper.find('.custom-header').exists()).toBe(true);
    expect(slotWrapper.find('.custom-content').exists()).toBe(false);

    await slotWrapper.setProps({ modelValue: true });
    await nextTick();
    await nextTick(); // Wait for computed property update
    expect(slotWrapper.find('.custom-content').exists()).toBe(true);
  });
});
