import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Checkbox from './Checkbox.vue';

describe('Checkbox', () => {
  let wrapper: VueWrapper<any>;
  const sizes = ['sm', 'md', 'lg'];
  function createWrapper(props = {}) {
    return shallowMount(Checkbox, {
      props: {
        label: 'Checkbox',
        modelValue: ['checkbox'],
        value: 'checkbox',
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
  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  sizes.forEach(size => {
    it(`should apply correct classes for size=${size}`, () => {
      const wrapper = createWrapper({ size });
      expect(wrapper.classes()).toContain('checkbox');
      expect(wrapper.classes()).toContain(`checkbox--${size}`);
    });
  });
  it('should apply correct classes for disabled', () => {
    const wrapper = createWrapper({ disabled: true });
    expect(wrapper.classes()).toContain('checkbox--disabled');
  });
  it('should put label text', () => {
    const wrapper = createWrapper({ label: 'Checkbox' });
    expect(wrapper.find('.checkbox__label').text()).toBe('Checkbox');
  });

  it('should apply correct classes for checked', () => {
    const wrapper = createWrapper({ modelValue: ['checkbox'] });
    expect(wrapper.classes()).toContain('checkbox--checked');
  });
  it('should emit input event on click', async () => {
    await wrapper.find('.checkbox__input').trigger('change');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });
});
