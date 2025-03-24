import { mount, type VueWrapper } from '@vue/test-utils';
import type { SidebarLink } from 'library-components/Sidebar';
import { beforeEach, describe, expect, it } from 'vitest';
import Sidebar from './Sidebar.vue';

const links: SidebarLink[] = [
  { text: 'Home', href: '/', isOpen: false },
  {
    text: 'Products',
    href: '/products',
    isOpen: false,
    children: [
      { text: 'Category 1', href: '/products/cat1' },
      { text: 'Category 2', href: '/products/cat2' },
    ],
  },
];

describe('Sidebar.vue', () => {
  let wrapper: VueWrapper<any>;

  const createWrapper = (props = {}) => {
    return mount(Sidebar, {
      props: {
        links,
        title: 'Test Sidebar',
        ...props,
      },
      global: {
        stubs: {
          SidebarItem: {
            template: '<div class="sidebar-item-stub"></div>',
            props: ['link', 'index', 'useRouter'],
          },
          Teleport: {
            template: '<div><slot></slot></div>',
          },
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders title correctly', () => {
    expect(wrapper.find('.sidebar-title h3').text()).toBe('Test Sidebar');
  });

  it('renders correct number of sidebar items', () => {
    const items = wrapper.findAll('.sidebar-item-stub');
    expect(items.length).toBe(2);
  });

  it('applies correct classes based on position', async () => {
    wrapper = createWrapper({ position: 'right', isMobile: true });
    await wrapper.vm.$nextTick();

    wrapper.vm.openSidebar();
    await wrapper.vm.$nextTick();

    const aside = wrapper.find('aside');
    expect(aside.exists()).toBe(true);
    expect(aside.classes()).toContain('sidebar-mobile');
    expect(aside.classes()).toContain('sidebar-right');
  });

  it('shows/hides sidebar on mobile', async () => {
    wrapper = createWrapper({ isMobile: true });
    expect(wrapper.find('aside').exists()).toBe(false);

    wrapper.vm.openSidebar();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('aside').exists()).toBe(true);
  });

  it('closes sidebar on backdrop click', async () => {
    wrapper = createWrapper({ isMobile: true });
    wrapper.vm.openSidebar();
    await wrapper.vm.$nextTick();

    const backdrop = wrapper.find('.sidebar-backdrop');
    expect(backdrop.exists()).toBe(true);
    await backdrop.trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('closes sidebar on escape key', async () => {
    wrapper = createWrapper({ isMobile: true, closeOnEscape: true });
    wrapper.vm.openSidebar();
    await wrapper.vm.$nextTick();

    const keyboardEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(keyboardEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('renders bottom slot content', () => {
    const wrapperWithSlot = mount(Sidebar, {
      props: { links },
      slots: { bottom: '<div class="bottom-content">Bottom</div>' },
      global: {
        stubs: {
          SidebarItem: {
            template: '<div class="sidebar-item-stub"></div>',
            props: ['link', 'index', 'useRouter'],
          },
          Teleport: {
            template: '<div><slot></slot></div>',
          },
        },
      },
    });
    expect(wrapperWithSlot.find('.bottom-content').exists()).toBe(true);
  });
});
