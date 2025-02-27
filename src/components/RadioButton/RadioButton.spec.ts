import RadioButton from './RadioButton.vue';
import { shallowMount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('RadioButton.vue', () => {
  let wrapper: VueWrapper<any>;
  const sizes = ['sm', 'md', 'lg'];
  function createWrapper(props = {}) {
    return shallowMount(RadioButton, {
      props: {
        label: 'Radio Button',
        modelValue: '1',
        value: '1',
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
      expect(wrapper.classes()).toContain('radio-button');
      expect(wrapper.classes()).toContain(`radio-button--${size}`);
    });
  });
  it('should apply correct classes for disabled', () => {
    const wrapper = createWrapper({ disabled: true });
    expect(wrapper.classes()).toContain('radio-button');
    expect(wrapper.classes()).toContain('radio-button--disabled');
  });
  it('should put label text', () => {
    const wrapper = createWrapper({ label: 'Radio Button' });
    expect(wrapper.find('.radio-button__label').text()).toBe('Radio Button');
  });
  it('should apply correct classes for checked', () => {
    const wrapper = createWrapper({ modelValue: '1', value: '1' });
    expect(wrapper.classes()).toContain('radio-button');
    expect(wrapper.classes()).toContain('radio-button--checked');
  });
  it('should emit input event on click', async () => {
    const modelValue = ref('2');
    const wrapper = createWrapper({ modelValue: modelValue.value, value: '1', name: 'test', label: 'Radio Button' });
    const input = wrapper.find('.radio-button__input');
    await input.trigger('change');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['1']);
  });
});
