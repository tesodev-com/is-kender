import { shallowMount, type VueWrapper } from '@vue/test-utils';
import Drawer from 'library-components/Drawer';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Drawer.vue', () => {
  let wrapper: VueWrapper;

  function createWrapper(props = {}) {
    return shallowMount(Drawer, {
      props,
    });
  }

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('does not render when closed', () => {
    wrapper = createWrapper();
    expect(wrapper.find('.drawer').exists()).toBe(false);
  });

  it('does not render header when hasHeader is false', () => {
    wrapper = createWrapper({ hasHeader: false });
    expect(wrapper.find('.drawer-header').exists()).toBe(false);
  });

  it('does not render close button when hasCloseButton is false', () => {
    wrapper = createWrapper({ hasCloseButton: false });
    expect(wrapper.find('.drawer-header button').exists()).toBe(false);
  });
});
