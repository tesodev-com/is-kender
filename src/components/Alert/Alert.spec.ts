import { shallowMount, VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Alert from './Alert.vue';

describe('Alert', () => {
  let wrapper: VueWrapper<any, any>;

  function createWrapper(props = {}) {
    return shallowMount(Alert, {
      props: {
        title: 'Test Alert',
        text: 'This is a test alert',
        closable: true,
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

  it('should render properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Alert');
    expect(wrapper.text()).toContain('This is a test alert');
  });

  it('should close when close button is clicked', async () => {
    const closeButton = wrapper.find('.alert-close');
    expect(closeButton.exists()).toBe(true);
    await closeButton.trigger('click');
    expect(wrapper.vm.visible).toBe(false);
  });

  it('should automatically close after given life duration', async () => {
    vi.useFakeTimers();
    wrapper = createWrapper({ life: 3000 });
    expect(wrapper.vm.visible).toBe(true);
    vi.advanceTimersByTime(3000);
    expect(wrapper.vm.visible).toBe(false);
    vi.useRealTimers();
  });
});