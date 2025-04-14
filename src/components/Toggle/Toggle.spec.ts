import { mount, type VueWrapper } from '@vue/test-utils';
import Toggle, { type ToggleProps } from 'library-components/Toggle';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Toggle.vue', () => {
  let wrapper: VueWrapper;
  const createComponent = (props: ToggleProps = {}, initialModelValue = false) => {
    return mount(Toggle, {
      props: {
        ...props,
        modelValue: initialModelValue,
        'onUpdate:modelValue': (value: boolean) => {
          wrapper.setProps({ modelValue: value });
        },
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

    const labelElement = wrapper.find('label.toggle-label');
    expect(labelElement.exists()).toBe(true);
    expect(labelElement.find('.toggle-label-text').text()).toBe(label);
  });

  it('renders with description when provided', () => {
    const description = 'This is a test description';
    wrapper = createComponent({ label: 'Test', description });

    const labelElement = wrapper.find('label.toggle-label');
    expect(labelElement.exists()).toBe(true);
    expect(labelElement.find('.toggle-label-description').text()).toBe(description);
  });

  it('adds toggle-checked class when modelValue is true', async () => {
    wrapper = createComponent({}, true);
    expect(wrapper.find('.toggle').classes()).toContain('toggle-checked');

    await wrapper.find('button.toggle').trigger('click');
    expect(wrapper.find('.toggle').classes()).not.toContain('toggle-checked');
  });

  it('adds toggle-disabled class when disabled prop is true', () => {
    wrapper = createComponent({ disabled: true });

    const button = wrapper.find('button.toggle');
    const input = wrapper.find('input[type="checkbox"]');

    expect(button.classes()).toContain('toggle-disabled');
    expect(button.attributes('disabled')).toBeDefined();
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('emits update:modelValue event when toggle is clicked', async () => {
    wrapper = createComponent();

    await wrapper.find('button.toggle').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('sets unique id for input and label', () => {
    const spy = vi.spyOn(Math, 'random').mockReturnValue(0.123456);
    wrapper = createComponent({ label: 'Test Label' });

    const input = wrapper.find('input[type="checkbox"]');
    const label = wrapper.find('label.toggle-label');

    expect(input.attributes('id')).toBe(label.attributes('for'));
    expect(input.attributes('id')).toContain('toggle-');

    spy.mockRestore();
  });

  it('should not emit update:modelValue event when disabled', async () => {
    wrapper = createComponent({ disabled: true });

    await wrapper.find('button.toggle').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeFalsy();
  });

  it('should reflect modelValue changes properly', async () => {
    wrapper = createComponent({}, false);
    expect(wrapper.find('.toggle').classes()).not.toContain('toggle-checked');

    await wrapper.setProps({ modelValue: true });
    expect(wrapper.find('.toggle').classes()).toContain('toggle-checked');

    await wrapper.find('button.toggle').trigger('click');
    expect(wrapper.find('.toggle').classes()).not.toContain('toggle-checked');
  });

  it('applies correct size class', () => {
    const sizes: Array<'sm' | 'md' | 'lg' | 'xl' | '2xl'> = ['sm', 'md', 'lg', 'xl', '2xl'];

    sizes.forEach(size => {
      wrapper = createComponent({ size });
      expect(wrapper.find('.toggle').classes()).toContain(`toggle-${size}`);
    });
  });

  it('applies correct thumb shape class', () => {
    const shapes: Array<'circle' | 'square'> = ['circle', 'square'];

    shapes.forEach(shape => {
      wrapper = createComponent({ thumbShape: shape });
      expect(wrapper.find('.toggle').classes()).toContain(`toggle-thumb-${shape}`);
    });
  });
});
