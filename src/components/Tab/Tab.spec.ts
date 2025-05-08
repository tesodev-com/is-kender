import { shallowMount, type VueWrapper } from '@vue/test-utils';
import Tab, { type TabProps } from 'library-components/Tab';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('Tab.vue', () => {
  let wrapper: VueWrapper<any>;

  const mockTabsContext = {
    selectedTab: ref<string | undefined>('tab1'),
    setSelectedTab: (value: string | undefined) => {
      mockTabsContext.selectedTab.value = value;
    },
    tabsDirection: 'after',
  };

  const mockTabsListContext = {
    theme: 'line',
    themeColor: 'primary',
    fluid: ref(false),
    indicatorMode: ref('static'),
    tabsSize: ref('md'),
  };

  function createWrapper(props: Partial<TabProps> = {}) {
    return shallowMount(Tab, {
      props: {
        value: 'tab1',
        ...props,
      },
      global: {
        provide: {
          tabsContext: mockTabsContext,
          tabsListContext: mockTabsListContext,
        },
      },
      slots: {
        default: 'Tab Content',
      },
    });
  }

  beforeEach(() => {
    mockTabsContext.selectedTab.value = 'tab1';
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe('Tab Content');
    expect(wrapper.attributes('role')).toBe('tab');
  });

  it('applies correct classes when selected', () => {
    expect(wrapper.classes()).toContain('tabs__tab');
    expect(wrapper.classes()).toContain('tabs__tab--active');
    expect(wrapper.classes()).toContain('tabs__tab--size-md');
    expect(wrapper.classes()).toContain('tabs__tab--color-primary');
  });

  it('applies custom class when provided', () => {
    const customClass = 'my-custom-class';
    wrapper = createWrapper({ customClass });
    expect(wrapper.classes()).toContain(customClass);
  });

  it('handles disabled state correctly', () => {
    wrapper = createWrapper({ disabled: true });
    expect(wrapper.classes()).toContain('tabs__tab--disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });

  it('handles click events when not disabled', async () => {
    await wrapper.trigger('click');
    expect(mockTabsContext.selectedTab.value).toBe('tab1');
  });

  it('does not handle click events when disabled', async () => {
    wrapper = createWrapper({ disabled: true });
    mockTabsContext.selectedTab.value = 'other-tab';
    await wrapper.trigger('click');
    expect(mockTabsContext.selectedTab.value).toBe('other-tab');
  });

  it('sets correct aria attributes', async () => {
    mockTabsContext.selectedTab.value = 'tab1';
    const wrapper1 = createWrapper({ value: 'tab1' });
    expect(wrapper1.attributes('aria-selected')).toBe('true');
    expect(wrapper1.attributes('aria-controls')).toBe('tab1');

    mockTabsContext.selectedTab.value = 'tab1';
    const wrapper2 = createWrapper({ value: 'tab2' });
    expect(wrapper2.attributes('aria-selected')).toBe('false');
  });

  it('applies fluid class when tabsListContext fluid is true', async () => {
    mockTabsListContext.fluid.value = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain('tabs__tab--fluid');
  });

  it('applies correct theme classes', () => {
    mockTabsListContext.theme = 'segmented';
    wrapper = createWrapper();
    expect(wrapper.classes()).toContain('tabs__tab--color-gray');
    expect(wrapper.classes()).toContain('tabs__tab-indicator--theme-segmented');
  });

  it('handles indicator mode correctly', () => {
    mockTabsListContext.indicatorMode.value = 'static';
    wrapper = createWrapper();
    expect(wrapper.classes()).toContain('tabs__tab-indicator--mode-static');
    expect(wrapper.classes()).toContain('tabs__tab-indicator--position-after');
  });
});
