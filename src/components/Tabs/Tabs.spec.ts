import { shallowMount, type VueWrapper } from '@vue/test-utils';
import Tabs, { type TabsDirection, type TabsOrientation, type TabsProps } from 'library-components/Tabs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('Tabs.vue', () => {
  let wrapper: VueWrapper;

  function createWrapper(props: Partial<TabsProps> = {}) {
    return shallowMount(Tabs, {
      props: {
        ...props,
      },
    });
  }

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.tabs').exists()).toBe(true);
  });

  it('applies correct orientation class when orientation is vertical', () => {
    const orientation: TabsOrientation = 'vertical';
    wrapper = createWrapper({ orientation });
    expect(wrapper.find('.tabs--orientation-vertical').exists()).toBe(true);
  });

  it('applies correct tabs direction class', () => {
    const tabsDirection: TabsDirection = 'before';
    wrapper = createWrapper({ tabsDirection });
    expect(wrapper.find('.tabs--direction-before').exists()).toBe(true);
  });

  it('applies custom class when provided', () => {
    const customClass = 'my-custom-class';
    wrapper = createWrapper({ customClass });
    expect(wrapper.classes()).toContain(customClass);
  });

  it('updates model value when defaultValue changes', async () => {
    const defaultValue = 'tab1';
    wrapper = createWrapper({ defaultValue });
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([defaultValue]);
  });

  it('emits value change event when tab is selected', async () => {
    const onValueChange = vi.fn();
    wrapper = createWrapper({ onValueChange });

    const exposed = wrapper.vm.$.exposed;
    if (exposed?.setSelectedTab) {
      await exposed.setSelectedTab('tab1');
      expect(onValueChange).toHaveBeenCalledWith('tab1');
    }
  });
});
