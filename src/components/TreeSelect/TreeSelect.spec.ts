import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TreeSelect from './TreeSelect.vue';
import TreeNode from './TreeNode.vue';
import Svg from 'library-components/Svg';
import { nextTick } from 'vue';

vi.mock('@/utils/calculatePosition', () => ({
  calculateElementPosition: () => ({
    top: '100px',
    left: '200px',
    width: '300px',
  }),
}));

describe('TreeSelect', () => {
  let wrapper: any;

  const defaultProps = {
    treeOptions: [
      {
        value: '1',
        label: 'Option 1',
        children: [
          { value: '1-1', label: 'Option 1-1' },
          { value: '1-2', label: 'Option 1-2' },
        ],
      },
      { value: '2', label: 'Option 2' },
    ],
    placeholder: 'Select an option',
  };

  beforeEach(() => {
    wrapper = mount(TreeSelect, {
      props: defaultProps,
      global: {
        components: { Svg, TreeNode },
        stubs: { Teleport: true },
      },
    });
  });

  it('renders correctly with default props', () => {
    expect(wrapper.find('.select-container').exists()).toBe(true);
    expect(wrapper.find('.select-trigger').exists()).toBe(true);
    expect(wrapper.find('.select-trigger-value').text()).toBe('Select an option');
  });

  it('toggles dropdown when trigger is clicked', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('does not toggle dropdown when disabled', async () => {
    await wrapper.setProps({ disabled: true });
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('displays label when provided', async () => {
    await wrapper.setProps({ label: 'Test Label' });
    expect(wrapper.find('.select-label-container').exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe('Test Label');
  });

  it('updates model value when selecting a single option', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    await nextTick();

    const treeNode = wrapper.findComponent(TreeNode);
    await treeNode.vm.$emit('select', { value: '1', label: 'Option 1' });
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['1']);
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('handles multiple selection', async () => {
    await wrapper.setProps({ isMultiple: true });
    await wrapper.find('.select-trigger').trigger('click');
    await nextTick();

    const treeNode = wrapper.findComponent(TreeNode);
    await treeNode.vm.$emit('select', { value: '1', label: 'Option 1' });
    expect(wrapper.emitted('update:multiple')![0]).toEqual([['1']]);
    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('filters options when search is enabled', async () => {
    await wrapper.setProps({ isSearch: true });
    await wrapper.find('.select-trigger').trigger('click');
    await nextTick();

    const searchInput = wrapper.find('.select-dropdown-search');
    expect(searchInput.exists()).toBe(true);

    await searchInput.setValue('Option 1');
    await nextTick();

    expect(wrapper.vm.filteredTreeOptions.length).toBeGreaterThan(0);
    expect(wrapper.vm.filteredTreeOptions[0].label).toContain('Option 1');
  });

  it('closes dropdown on outside click', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);

    await document.body.click();
    await nextTick();
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('computes placeholder correctly', async () => {
    expect(wrapper.vm.computePlaceholder).toBe('Select an option');

    wrapper.vm.model = '1';
    await nextTick();
    expect(wrapper.vm.computePlaceholder).toBe('Option 1');
  });

  it('handles expand/collapse of tree nodes', async () => {
    await wrapper.find('.select-trigger').trigger('click');
    await nextTick();

    const treeNode = wrapper.findComponent(TreeNode);
    await treeNode.vm.$emit('toggleExpand', { value: '1', label: 'Option 1', children: [] });
    expect(wrapper.vm.expandedNodes.has('1')).toBe(true);

    await treeNode.vm.$emit('toggleExpand', { value: '1', label: 'Option 1', children: [] });
    expect(wrapper.vm.expandedNodes.has('1')).toBe(false);
  });

  it('displays hint when provided', async () => {
    await wrapper.setProps({ hint: 'Test hint' });
    expect(wrapper.find('.select-hint').exists()).toBe(true);
    expect(wrapper.find('.select-hint').text()).toBe('Test hint');
  });
});
