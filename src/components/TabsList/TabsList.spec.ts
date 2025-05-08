import { shallowMount, type VueWrapper } from '@vue/test-utils';
import TabsList, { type TabsListProps } from 'library-components/TabsList';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';

describe('TabsList.vue', () => {
  let wrapper: VueWrapper<any>;

  const mockTabsContext = {
    selectedTab: ref<string | undefined>('tab1'),
    setSelectedTab: vi.fn(),
    orientation: 'horizontal',
    tabsDirection: 'after',
  };

  function createWrapper(props: Partial<TabsListProps> = {}) {
    return shallowMount(TabsList, {
      props: {
        ...props,
      },
      global: {
        provide: {
          tabsContext: mockTabsContext,
        },
      },
    });
  }

  beforeEach(() => {
    wrapper = createWrapper();
    // Mock requestAnimationFrame
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    wrapper.unmount();
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.tabs__list').exists()).toBe(true);
  });

  it('applies custom class when provided', () => {
    const customClass = 'my-custom-class';
    wrapper = createWrapper({ customClass });
    expect(wrapper.classes()).toContain(customClass);
  });

  it('applies fluid class when fluid prop is true', () => {
    wrapper = createWrapper({ fluid: true });
    expect(wrapper.find('.tabs__list--fluid').exists()).toBe(true);
  });

  it('applies correct theme class', () => {
    const theme = 'button';
    wrapper = createWrapper({ theme });
    expect(wrapper.find('.tabs__list--theme-button').exists()).toBe(true);
  });

  it('sets correct indicator styles', () => {
    const indicatorThickness = 4;
    const indicatorColor = '#ff0000';
    wrapper = createWrapper({ indicatorThickness, indicatorColor });

    const style = wrapper.attributes('style');
    expect(style).toContain(`--indicator-thickness: ${indicatorThickness}px`);
    expect(style).toContain(`--indicator-color: ${indicatorColor}`);
  });

  it('sets correct indicator styles for sliding mode', async () => {
    wrapper = createWrapper({ indicatorMode: 'sliding' });
    const vm = wrapper.vm as any;

    vm.indicatorWidth = 100;
    vm.indicatorHeight = 50;
    vm.indicatorOffsetX = 10;
    vm.indicatorOffsetY = 20;
    await wrapper.vm.$nextTick();

    const indicator = wrapper.find('.tabs__list-indicator');
    const style = indicator.attributes('style');

    expect(style).toContain('--indicator-width: 100px');
    expect(style).toContain('--indicator-height: 50px');
    expect(style).toContain('--indicator-y-offset: 20px');
    expect(style).toContain('--indicator-x-offset: 10px');
  });

  it('shows sliding indicator when indicatorMode is sliding and width is set', async () => {
    wrapper = createWrapper({ indicatorMode: 'sliding' });
    const vm = wrapper.vm as any;

    // Directly set the ref value without using .value syntax
    vm.indicatorWidth = 100;
    await wrapper.vm.$nextTick();

    const indicator = wrapper.find('.tabs__list-indicator');
    expect(indicator.exists()).toBe(true);
    expect(indicator.classes()).toContain('tabs__list-indicator--position-after');
  });

  it('handles keyboard navigation', async () => {
    const mockTabs = [
      { disabled: false, getAttribute: () => 'tab1', focus: vi.fn() },
      { disabled: false, getAttribute: () => 'tab2', focus: vi.fn() },
      { disabled: true, getAttribute: () => 'tab3', focus: vi.fn() },
    ];

    const mockQuerySelectorAll = vi.fn().mockReturnValue(mockTabs);
    wrapper = createWrapper();
    wrapper.element.querySelectorAll = mockQuerySelectorAll;

    await wrapper.trigger('keydown', {
      key: 'ArrowRight',
    });

    expect(mockTabsContext.setSelectedTab).toHaveBeenCalledWith('tab2');
  });

  it('updates indicator on selectedTab change', async () => {
    const mockQuerySelector = vi.fn().mockReturnValue({
      offsetWidth: 100,
      offsetHeight: 50,
      offsetLeft: 10,
      offsetTop: 20,
    });

    wrapper = createWrapper({ indicatorMode: 'sliding' });
    wrapper.element.querySelector = mockQuerySelector;

    mockTabsContext.selectedTab.value = 'tab2';
    await wrapper.vm.$nextTick();

    const vm = wrapper.vm as any;
    expect(vm.indicatorWidth).toBe(100);
    expect(vm.indicatorHeight).toBe(50);
    expect(vm.indicatorOffsetX).toBe(10);
    expect(vm.indicatorOffsetY).toBe(20);
  });

  it('sets correct border sides based on orientation and direction', () => {
    const combinations = {
      'horizontal-after': 'none none solid none',
      'horizontal-before': 'solid none none none',
      'vertical-after': 'none solid none none',
      'vertical-before': 'none none none solid',
    };

    for (const [key, value] of Object.entries(combinations)) {
      const [orientation, direction] = key.split('-');
      mockTabsContext.orientation = orientation as 'horizontal' | 'vertical';
      mockTabsContext.tabsDirection = direction as 'before' | 'after';

      wrapper = createWrapper();
      const style = wrapper.attributes('style');
      expect(style).toContain(`--border-sides: ${value}`);
    }
  });

  it('observes resize events when indicator mode is sliding', () => {
    const mockObserve = vi.fn();
    const mockDisconnect = vi.fn();

    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe = mockObserve;
        disconnect = mockDisconnect;
      }
    );

    wrapper = createWrapper({ indicatorMode: 'sliding' });
    expect(mockObserve).toHaveBeenCalled();

    wrapper.unmount();
    expect(mockDisconnect).toHaveBeenCalled();

    vi.restoreAllMocks();
  });
});
