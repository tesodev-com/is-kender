import { mount, type VueWrapper } from '@vue/test-utils';
import Tab from 'library/Tab';
import TabPanel from 'library/TabPanel';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { h } from 'vue';
import Tabs from './Tabs.vue';
describe('Tabs.vue', () => {
  let wrapper: VueWrapper;
  function createWrapper(props = {}) {
    return mount(Tabs, {
      props: {
        ...props,
      },
    });
  }
  beforeEach(async () => {
    wrapper = createWrapper();
  });
  afterEach(() => {
    if (wrapper) wrapper.unmount();
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders tab panels from default slot', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [h(TabPanel, { name: 'Tab 1', index: 0 }, 'Content 1'), h(TabPanel, { name: 'Tab 2', index: 1 }, 'Content 2')],
      },
    });
    const tabs = wrapper.findAllComponents(Tab);
    expect(tabs).toHaveLength(2);
    expect(wrapper.find('.tabs__content').text()).toContain('Content 1');
  });

  it('renders custom tab list slot correctly', () => {
    const wrapper = mount(Tabs, {
      slots: {
        tabList: [h(Tab, { index: 0, disabled: false }, 'Custom Tab 1'), h(Tab, { index: 1, disabled: true }, 'Custom Tab 2')],
      },
    });

    const customTabs = wrapper.findAllComponents(Tab);
    expect(customTabs).toHaveLength(2);
    expect(customTabs[0].text()).toBe('Custom Tab 1');
    expect(customTabs[1].text()).toBe('Custom Tab 2');
  });

  it('switches active tab on click', async () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [h(TabPanel, { name: 'Tab 1', index: 0 }, 'Content 1'), h(TabPanel, { name: 'Tab 2', index: 1 }, 'Content 2')],
      },
    });

    const tabs = wrapper.findAll('.tabs__button-container > *');
    await tabs[1].trigger('click');

    expect(wrapper.find('.tabs__content').text()).toContain('Content 2');
  });

  it('displays fallback message if no panel is available', () => {
    const wrapper = mount(Tabs);
    expect(wrapper.find('.tabs__content').text()).toContain('Please add panel content');
  });

  it('disables tab if the disabled prop is true', () => {
    const wrapper = mount(Tabs, {
      slots: {
        default: [h(TabPanel, { name: 'Disabled Tab', index: 0, disabled: true }, 'Content')],
      },
    });
    expect(wrapper.find('.tab__button--disabled').exists()).toBe(true);
  });
});
