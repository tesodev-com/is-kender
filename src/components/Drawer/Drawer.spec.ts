import { mount } from '@vue/test-utils';
import Drawer from 'library/Drawer';
import { describe, expect, it } from 'vitest';

describe('Drawer.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
      },
    });
    expect(wrapper.find('.overlay').exists()).toBe(true);
    expect(wrapper.find('.drawer').exists()).toBe(true);
    expect(wrapper.find('.drawer-header').exists()).toBe(true);
    expect(wrapper.find('.drawer-content').exists()).toBe(true);
  });

  it('closes when overlay is clicked', async () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
      },
    });
    await wrapper.find('.overlay').trigger('click');
    expect(wrapper.emitted('update:isOpen')).toBeTruthy();
    expect(wrapper.emitted('update:isOpen')?.[0]).toEqual([false]);
  });

  it('closes when close button is clicked', async () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('update:isOpen')).toBeTruthy();
    expect(wrapper.emitted('update:isOpen')?.[0]).toEqual([false]);
  });

  it('renders correct position class', () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
        position: 'right',
      },
    });
    expect(wrapper.find('.drawer-right').exists()).toBe(true);
  });
  it('renders correct size class', () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
        size: '25%',
      },
    });
    expect(wrapper.find('.drawer').attributes('style')).toContain('--drawer-size: 25%');
  });
  it('renders header when hasHeader is true', () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
        hasHeader: true,
      },
    });
    expect(wrapper.find('.drawer-header').exists()).toBe(true);
  });

  it('does not render header when hasHeader is false', () => {
    const wrapper = mount(Drawer, {
      props: {
        isOpen: true,
        hasHeader: false,
      },
    });
    expect(wrapper.find('.drawer-header').exists()).toBe(false);
  });
});
