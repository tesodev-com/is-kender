import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import SidebarItem from './SidebarItem.vue';
import type { SidebarLink } from 'library/Sidebar';

describe('SidebarItem.vue', () => {
  let wrapper: VueWrapper<any>;

  const createWrapper = (link: SidebarLink, props = {}) => {
    return mount(SidebarItem, {
      props: {
        link,
        index: 0,
        useRouter: true,
        ...props,
      },
      global: {
        stubs: {
          Svg: {
            template: '<span class="svg-stub"></span>',
            props: ['src', 'size'],
          },
          'router-link': {
            template: '<a class="router-link-stub"><slot></slot></a>',
          },
        },
      },
    });
  };

  beforeEach(() => {
    const simpleLink: SidebarLink = {
      text: 'Test Link',
      href: '/test',
      iconSrc: '/icon.svg',
    };
    wrapper = createWrapper(simpleLink);
  });

  it('renders simple link correctly', async () => {
    await wrapper.vm.$nextTick();

    const linkContent = wrapper.find('.sidebar-nav-link-content');
    expect(linkContent.exists()).toBe(true);
    expect(linkContent.text()).toContain('Test Link');
    expect(linkContent.find('.svg-stub').exists()).toBe(true);
  });

  it('renders collapsible item when children exist', async () => {
    const collapsibleLink: SidebarLink = {
      text: 'Parent',
      href: '/parent',
      isOpen: false,
      children: [
        { text: 'Child 1', href: '/child1' },
        { text: 'Child 2', href: '/child2' },
      ],
    };

    wrapper = createWrapper(collapsibleLink);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.sidebar-nav-collapse').exists()).toBe(true);
    expect(wrapper.find('.sidebar-nav-link-icon').exists()).toBe(true);
  });

  it('shows children when item is open', async () => {
    const collapsibleLink: SidebarLink = {
      text: 'Parent',
      href: '/parent',
      isOpen: true,
      children: [{ text: 'Child', href: '/child' }],
    };

    wrapper = createWrapper(collapsibleLink);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.sidebar-nav-list').exists()).toBe(true);
    expect(wrapper.findAll('.sidebar-nav-link').length).toBe(2);
  });

  it('uses custom slot when slotKey is provided', async () => {
    const linkWithSlot: SidebarLink = {
      text: 'Test',
      href: '/test',
      slotKey: 'custom',
    };

    wrapper = mount(SidebarItem, {
      props: { link: linkWithSlot, index: 0 },
      slots: { custom: '<span class="custom-slot">Custom</span>' },
      global: {
        stubs: {
          Svg: {
            template: '<span class="svg-stub"></span>',
            props: ['src', 'size'],
          },
          'router-link': {
            template: '<a class="router-link-stub"><slot></slot></a>',
          },
        },
      },
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.find('.custom-slot').exists()).toBe(true);
  });

  it('uses router-link when useRouter is true', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.router-link-stub').exists()).toBe(true);
  });

  it('uses regular anchor when useRouter is false', async () => {
    wrapper = createWrapper({ text: 'Test', href: '/test' }, { useRouter: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('a').exists()).toBe(true);
    expect(wrapper.find('.router-link-stub').exists()).toBe(false);
  });
});
