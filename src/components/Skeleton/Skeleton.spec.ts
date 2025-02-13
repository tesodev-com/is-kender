import { shallowMount, VueWrapper } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Skeleteon from './Skeleteon.vue';

describe('Skeleton', () => {
  let wrapper: VueWrapper;
  function createWrapper() {
    return shallowMount(Skeleteon, {});
  }
  beforeEach(() => {
    wrapper = createWrapper();
  });
  it('should render correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
