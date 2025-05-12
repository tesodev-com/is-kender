import { mount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Accordion from './Accordion.vue';

describe('Accordion.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(Accordion, {
      props: {
        accordionIconPosition: 'right',
        header: 'Test Header',
        content: 'Test Content',
      },
      global: {
        stubs: {
          Svg: true,
        },
      },
    });
  });

  it('applies the correct classes based on props', () => {
    const header = wrapper.find('.accordion__header');
    expect(header.classes()).toContain('accordion__header--right');
  });

  it('toggles open/close on click', async () => {
    const header = wrapper.find('.accordion__header');
    await header.trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);

    await header.trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('renders header and content props correctly', async () => {
    const wrapper = mount(Accordion, {
      props: {
        accordionIconPosition: 'right',
        header: 'Test Header',
        content: 'Test Content',
      },
      global: {
        stubs: {
          Svg: true,
        },
      },
    });

    expect(wrapper.text()).toContain('Test Header');

    // Click to open and show content
    await wrapper.find('.accordion__header').trigger('click');
    expect(wrapper.text()).toContain('Test Content');
  });

  it('renders slots correctly', async () => {
    const slotWrapper = mount(Accordion, {
      props: {
        accordionIconPosition: 'right',
      },
      slots: {
        header: '<span class="custom-title">Custom Title</span>',
        content: '<div class="custom-content">Custom Content</div>',
      },
      global: {
        stubs: {
          Svg: true,
        },
      },
    });

    expect(slotWrapper.find('.custom-title').exists()).toBe(true);
    expect(slotWrapper.find('.custom-content').exists()).toBe(false);

    const header = slotWrapper.find('.accordion__header');
    await header.trigger('click');
    await slotWrapper.vm.$nextTick();

    expect(slotWrapper.find('.custom-content').exists()).toBe(true);
  });

  it('emits update:isOpen event when toggled', async () => {
    const header = wrapper.find('.accordion__header');
    await header.trigger('click');

    expect(wrapper.emitted('update:isOpen')).toBeTruthy();
    expect(wrapper.emitted('update:isOpen')?.[0]).toEqual([true]);

    await header.trigger('click');

    expect(wrapper.emitted('update:isOpen')?.[1]).toEqual([false]);
  });

  it('emits open and close events', async () => {
    const wrapper = mount(Accordion, {
      props: {
        accordionIconPosition: 'right',
      },
      global: {
        stubs: {
          Svg: true,
        },
      },
    });

    const header = wrapper.find('.accordion__header');
    await header.trigger('click');

    expect(wrapper.emitted('close')).toBeTruthy();

    await header.trigger('click');

    expect(wrapper.emitted('open')).toBeTruthy();
  });

  it('handles disabled state correctly', async () => {
    const disabledWrapper = mount(Accordion, {
      props: {
        disabled: true,
        header: 'Disabled Header',
      },
      global: {
        stubs: {
          Svg: true,
        },
      },
    });

    const header = disabledWrapper.find('.accordion__header');
    await header.trigger('click');

    expect(disabledWrapper.vm.isOpen).toBe(false);
    expect(disabledWrapper.emitted('open')).toBeFalsy();
  });

  it('hides icons when hideIcons is true', () => {
    const wrapper = mount(Accordion, {
      props: {
        hideIcons: true,
      },
      global: {
        stubs: {
          Svg: {
            template: '<div class="svg-stub"></div>',
          },
        },
      },
    });

    expect(wrapper.find('.svg-stub').exists()).toBe(true);
  });

  it('uses custom icons when provided', () => {
    const customIconWrapper = mount(Accordion, {
      props: {
        openIcon: 'custom-open-icon',
        closeIcon: 'custom-close-icon',
      },
      global: {
        stubs: {
          Svg: {
            template: '<div class="svg-stub"></div>',
          },
        },
      },
    });

    const svgStubs = customIconWrapper.findAll('.svg-stub');
    expect(svgStubs.length).toBe(1);
  });

  it('applies custom classes to header and content', async () => {
    const wrapper = mount(Accordion, {
      props: {
        headerClass: 'custom-header',
        contentClass: 'custom-content',
      },
      global: {
        stubs: {
          Svg: true,
        },
      },
    });

    expect(wrapper.find('.accordion__header').classes()).toContain('custom-header');

    const header = wrapper.find('.accordion__header');
    await header.trigger('click');

    expect(wrapper.find('.accordion__content').classes()).toContain('custom-content');
  });
});
