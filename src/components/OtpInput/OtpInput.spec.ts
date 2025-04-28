import { mount, type VueWrapper } from '@vue/test-utils';
import OTPInput from 'library-components/OtpInput';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('OTPInput.vue', () => {
  let wrapper: VueWrapper<any>;
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  function createWrapper(props = {}) {
    const otp = ref('');
    return mount(OTPInput, {
      props: {
        modelValue: otp.value,
        'onUpdate:modelValue': (value: string) => (otp.value = value),
        digits: 4,
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
  });

  it('renders the correct number of inputs', () => {
    const inputs = wrapper.findAll('.otp-input');
    expect(inputs.length).toBe(4);
  });

  sizes.forEach(size => {
    it(`should apply correct classes for size=${size}`, () => {
      wrapper = createWrapper({ size });
      const inputs = wrapper.findAll('.otp-input');
      inputs.forEach(input => {
        expect(input.classes()).toContain('otp-input');
        expect(input.classes()).toContain(`otp-input-${size}`);
      });
    });
  });

  it('should render divider when showDivider is true and digits is even', async () => {
    wrapper = createWrapper({ showDivider: true, digits: 4 });
    await wrapper.vm.$nextTick();
    const divider = wrapper.find('.otp-divider');
    expect(divider.exists()).toBe(true);
    expect(divider.text()).toBe('-');
  });

  it('should not render divider when showDivider is false', () => {
    wrapper = createWrapper({ showDivider: false });
    const divider = wrapper.find('.otp-divider');
    expect(divider.exists()).toBe(false);
  });

  it('should apply password type when isPassword is true', () => {
    wrapper = createWrapper({ isPassword: true });
    const inputs = wrapper.findAll('.otp-input');
    inputs.forEach(input => {
      expect(input.attributes('type')).toBe('password');
    });
  });

  it('should update otp model on input', async () => {
    wrapper = createWrapper();
    const input = wrapper.find('.otp-input');
    await input.trigger('keydown', { key: '1' });
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['1']);
  });

  it('should allow non-numeric when numericOnly is false', async () => {
    wrapper = createWrapper({ numericOnly: false });
    const input = wrapper.find('.otp-input');
    await input.trigger('keydown', { key: 'a' });
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['a']);
  });

  it('should display label when provided', () => {
    wrapper = createWrapper({ label: 'Enter OTP' });
    const label = wrapper.find('.otp-label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Enter OTP');
  });

  it('should display hint when provided', () => {
    wrapper = createWrapper({ hint: 'Check your email' });
    const hint = wrapper.find('.otp-hint');
    expect(hint.exists()).toBe(true);
    expect(hint.text()).toBe('Check your email');
  });
});
