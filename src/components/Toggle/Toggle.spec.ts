import { mount, type VueWrapper } from '@vue/test-utils';
import Toggle, { type ToggleProps } from 'library/Toggle';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Toggle.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (props: ToggleProps = {}, modelValue = false) => {
    return mount(Toggle, {
      props: {
        ...props,
        modelValue,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    });
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders properly with default props', () => {
    wrapper = createComponent();
    expect(wrapper.find('.toggle').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find('.toggle-label').exists()).toBe(false);
  });

  it('renders with label when provided', () => {
    const label = 'Test Toggle';
    wrapper = createComponent({ label });

    expect(wrapper.find('.toggle-label').exists()).toBe(true);
    expect(wrapper.find('.toggle-label-text').text()).toBe(label);
  });

  it('renders with description when provided', () => {
    const description = 'This is a test description';
    wrapper = createComponent({ label: 'Test', description });

    expect(wrapper.find('.toggle-label-description').exists()).toBe(true);
    expect(wrapper.find('.toggle-label-description').text()).toBe(description);
  });

  it('adds toggle-checked class when modelValue is true', async () => {
    wrapper = createComponent({}, true);

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find('.toggle').classes()).toContain('toggle-checked');
  });

  it('adds toggle-disabled class when disabled prop is true', () => {
    wrapper = createComponent({ disabled: true });

    expect(wrapper.find('.toggle').classes()).toContain('toggle-disabled');
    expect(wrapper.find('input[type="checkbox"]').attributes('disabled')).toBeDefined();
  });

  it('emits update:modelValue event when toggle is clicked', async () => {
    wrapper = createComponent();

    await wrapper.find('input[type="checkbox"]').setValue(true);

    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('sets unique id for input and label', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.123456);
    wrapper = createComponent({ label: 'Test Label' });

    const inputId = wrapper.find('input[type="checkbox"]').attributes('id');
    const labelFor = wrapper.find('.toggle-label-text').attributes('for');

    expect(inputId).toBe(labelFor);
    expect(inputId).toContain('toggle-');

    spy.mockRestore();
  });

  it('should not emit update:modelValue event when disabled', async () => {
    wrapper = createComponent({ disabled: true });

    const input = wrapper.find('input[type="checkbox"]');
    expect(input.attributes('disabled')).toBeDefined();

    await input.setValue(true);

    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should reflect modelValue changes properly', async () => {
    wrapper = createComponent({}, false);

    expect(wrapper.find('.toggle').classes()).not.toContain('toggle-checked');

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find('.toggle').classes()).toContain('toggle-checked');

    await wrapper.setProps({ modelValue: false });
    expect(wrapper.find('.toggle').classes()).not.toContain('toggle-checked');
  });
});
