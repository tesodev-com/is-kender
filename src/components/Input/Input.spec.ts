import Input from '@/components/Input';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Input.vue', () => {
  let wrapper: VueWrapper;
  const sizes = ['sm', 'lg'];
  function createWrapper(props = {}) {
    return shallowMount(Input, {
      props: {
        ...props,
      },
    });
  }
  beforeEach(async () => {
    wrapper = createWrapper();
  });
  afterEach(() => {
    wrapper.unmount();
  });
  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });
  sizes.forEach(size => {
    it(`should apply correct classes for size=${size}`, () => {
      const wrapper = createWrapper({ size });
      expect(wrapper.find('.input-wrapper').exists()).toBe(true);
      expect(wrapper.find(`.input-wrapper--${size}`).exists()).toBe(true);
    });
  });
  it('should apply correct classes for disabled', () => {
    const wrapper = createWrapper({ disabled: true });
    expect(wrapper.find('.input-wrapper').exists()).toBe(true);
    expect(wrapper.find('.input-wrapper--disabled').exists()).toBe(true);
  });
  it('should apply correct classes for error', () => {
    const wrapper = createWrapper({ errorList: ['Error'] });
    expect(wrapper.find('.input-wrapper').exists()).toBe(true);
    expect(wrapper.find('.input-wrapper--error').exists()).toBe(true);
    expect(wrapper.find('.error-list').exists()).toBe(true);
    expect(wrapper.find('.error-list__item').text()).toBe('Error');
  });
  it('should apply correct classes for fluid', () => {
    const wrapper = createWrapper({ fluid: true });
    expect(wrapper.find('.input-wrapper').exists()).toBe(true);
    expect(wrapper.find('.input-wrapper--fluid').exists()).toBe(true);
  });
});
