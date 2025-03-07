import { mount, type VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Toggle from './Toggle.vue';

describe('Toast', () => {
  let wrapper: VueWrapper;
  function createWrapper() {
    return mount(Toggle, {});
  }
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
