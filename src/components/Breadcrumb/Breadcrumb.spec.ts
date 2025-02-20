import { mount, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Breadcrumb from './Breadcrumb.vue';
import BreadcrumbItem from './BreadcrumbItem.vue';

describe('Breadcrumb.vue', () => {
  function createWrapper(props = {}) {
    return mount(Breadcrumb, {
      props: {
        items: [
          { text: 'Home', to: '/' },
          { text: 'Category', to: '/category' },
          { text: 'Product', to: '/product' },
        ],
        ...props,
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });
  }

  it('should render breadcrumb items correctly', () => {
    const wrapper = createWrapper();

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAllComponents(BreadcrumbItem).length).toBe(3);

    expect(wrapper.text()).toContain('Home');
    expect(wrapper.text()).toContain('Category');
    expect(wrapper.text()).toContain('Product');
  });

  it('should render custom separator', () => {
    const wrapper = createWrapper({ separator: '>' });

    expect(wrapper.find('.breadcrumb-separator').text()).toBe('>');
  });

  it('should not render separator for first item', () => {
    const items = [
      { text: 'Home', to: '/' },
      { text: 'Category', to: '/category' },
    ];
    const wrapper = createWrapper({ items, separator: '>' });

    const separators = wrapper.findAll('.breadcrumb-separator');
    expect(separators.length).toBe(1);
  });
});
