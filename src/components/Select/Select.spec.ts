import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Select, { type SelectOption, type SelectProps } from 'library/Select';

const options: SelectOption[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', disabled: true },
  { value: '3', label: 'Option 3' },
];

describe('Select.vue', () => {
  let wrapper: VueWrapper<any>;

  const createWrapper = (props: Partial<SelectProps> = {}) => {
    return mount(Select, {
      props: {
        options,
        placeholder: 'Select an option',
        ...props,
      },
      global: {
        stubs: {
          Svg: {
            template: '<span class="svg-stub"></span>',
            props: ['src', 'size'],
          },
          Teleport: {
            template: '<div><slot></slot></div>',
          },
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders label when provided', () => {
    wrapper = createWrapper({ label: 'Test Label' });
    expect(wrapper.find('.select-label-container label').text()).toBe('Test Label');
  });

  it('shows required asterisk when required prop is true', () => {
    wrapper = createWrapper({ label: 'Test Label', required: true });
    expect(wrapper.find('.select-label-required').text()).toBe('*');
  });

  it('displays placeholder when no value is selected', () => {
    expect(wrapper.find('.select-trigger-value').text()).toBe('Select an option');
  });

  it('toggles dropdown on trigger click', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.find('.select-dropdown').exists()).toBe(true);

    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.find('.select-dropdown').exists()).toBe(false);
  });

  it('does not toggle dropdown when disabled', async () => {
    wrapper = createWrapper({ disabled: true });
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.find('.select-dropdown').exists()).toBe(false);
  });

  it('selects single option and closes dropdown', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    const items = wrapper.findAll('.select-dropdown-item');
    await items[0].trigger('click');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1']);
    expect(wrapper.find('.select-dropdown').exists()).toBe(false);
    expect(wrapper.find('.select-trigger-value').text()).toBe('Option 1');
  });

  it('handles multiple selections', async () => {
    wrapper = createWrapper({ isMultiple: true });
    await wrapper.find('.select-trigger').trigger('click');
    const items = wrapper.findAll('.select-dropdown-item');

    await items[0].trigger('click');
    await items[2].trigger('click');

    expect(wrapper.emitted('update:multiple')?.[1]).toEqual([['1', '3']]);
    expect(wrapper.find('.select-trigger-value').text()).toBe('Option 1, Option 3');
  });

  it('does not select disabled options', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    const items = wrapper.findAll('.select-dropdown-item');
    await items[1].trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  it('filters options when search is enabled', async () => {
    wrapper = createWrapper({ isSearch: true });
    await wrapper.find('.select-trigger').trigger('click');

    const searchInput = wrapper.find('.select-dropdown-search');
    await searchInput.setValue('Option 3');

    const items = wrapper.findAll('.select-dropdown-item');
    expect(items.length).toBe(1);
    expect(items[0].text()).toContain('Option 3');
  });

  it('closes dropdown on outside click', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.find('.select-dropdown').exists()).toBe(true);

    await document.body.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.select-dropdown').exists()).toBe(false);
  });
});
