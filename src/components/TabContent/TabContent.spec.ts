import { shallowMount, type VueWrapper } from '@vue/test-utils';
import TabContent, { type TabContentProps } from 'library-components/TabContent';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('TabContent.vue', () => {
  let wrapper: VueWrapper<any>;

  const mockTabsContext = {
    selectedTab: ref<string>('tab1'),
  };

  function createWrapper(props: Partial<TabContentProps> = {}, selectedTab = 'tab1') {
    mockTabsContext.selectedTab.value = selectedTab;

    return shallowMount(TabContent, {
      props: {
        value: 'tab1',
        ...props,
      },
      global: {
        provide: {
          tabsContext: mockTabsContext,
        },
      },
      slots: {
        default: '<div class="test-content">Tab Content</div>',
      },
    });
  }

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders correctly when tab is selected', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.tabs__content').exists()).toBe(true);
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toBe('Tab Content');
    expect(wrapper.attributes('hidden')).toBeUndefined();
  });

  it('is hidden when tab is not selected', () => {
    wrapper = createWrapper({ value: 'tab1' }, 'tab2');
    expect(wrapper.find('.tabs__content').exists()).toBe(true);
    expect(wrapper.attributes('hidden')).toBe('');
  });

  it('applies custom class when provided', () => {
    const customClass = 'my-custom-class';
    wrapper = createWrapper({ customClass });
    expect(wrapper.classes()).toContain(customClass);
  });

  it('applies active class when tab is selected', () => {
    wrapper = createWrapper({ value: 'tab1' }, 'tab1');
    expect(wrapper.classes()).toContain('tabs__content--active');
  });

  it('does not apply active class when tab is not selected', () => {
    wrapper = createWrapper({ value: 'tab1' }, 'tab2');
    expect(wrapper.classes('tabs__content--active')).toBe(false);
  });

  it('updates visibility when selectedTab changes', async () => {
    wrapper = createWrapper({ value: 'tab1' }, 'tab2');
    expect(wrapper.attributes('hidden')).toBe('');

    mockTabsContext.selectedTab.value = 'tab1';
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes('hidden')).toBeUndefined();
  });

  it('renders slot content only when tab is selected', () => {
    // When tab is selected
    wrapper = createWrapper({ value: 'tab1' }, 'tab1');
    expect(wrapper.find('.test-content').exists()).toBe(true);
    expect(wrapper.text()).toBe('Tab Content');
    expect(wrapper.attributes('hidden')).toBeUndefined();

    // When tab is not selected
    wrapper = createWrapper({ value: 'tab1' }, 'tab2');
    expect(wrapper.find('.test-content').exists()).toBe(false);
    expect(wrapper.text()).toBe('');
    expect(wrapper.attributes('hidden')).toBe('');
  });

  it('has correct ARIA role', () => {
    expect(wrapper.attributes('role')).toBe('tabcontent');
  });

  it('toggles hidden attribute based on selectedTab', async () => {
    // Initially selected
    wrapper = createWrapper({ value: 'tab1' }, 'tab1');
    expect(wrapper.attributes('hidden')).toBeUndefined();

    // Change to unselected
    mockTabsContext.selectedTab.value = 'tab2';
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes('hidden')).toBe('');

    // Change back to selected
    mockTabsContext.selectedTab.value = 'tab1';
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes('hidden')).toBeUndefined();
  });
});
