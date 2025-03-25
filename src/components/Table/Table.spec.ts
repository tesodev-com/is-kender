import { mount, type VueWrapper } from '@vue/test-utils';
import Table, { type TableProps } from 'library-components/Table';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'actions', label: 'Actions' },
];

const rows = [
  { id: 1, name: 'Alice', key: 'row1' },
  { id: 2, name: 'Bob', key: 'row2' },
  { id: 3, name: 'Charlie', key: 'row3' },
];

describe('Table.vue', () => {
  let wrapper: VueWrapper<any>;

  const createWrapper = (props: Partial<TableProps> = {}) => {
    return mount(Table, {
      props: {
        columns,
        rows,
        ...props,
      },
      global: {
        stubs: {
          Svg: { template: '<span class="svg-stub"></span>', props: ['src', 'size'] },
          Button: {
            template: '<button class="stub-button"><slot></slot></button>',
            props: ['color'],
            emits: ['click'],
          },
          Input: {
            template: '<input :value="modelValue" :placeholder="placeholder" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ['modelValue', 'placeholder', 'fluid'],
            emits: ['update:modelValue'],
          },
          Pagination: true,
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders table with columns and rows', async () => {
    expect(wrapper.find('.table-container').exists()).toBe(true);
    expect(wrapper.findAll('.column-cell').length).toBe(columns.length);
    expect(wrapper.vm.filteredRows.length).toBe(rows.length);
  });

  it('renders header with title when provided', async () => {
    wrapper = createWrapper({ title: 'Test Table' });
    await wrapper.vm.$nextTick();
    const titleElement = wrapper.find('.table-header-title');
    expect(titleElement.exists()).toBe(true);
    expect(titleElement.text()).toBe('Test Table');
  });

  it('displays search input when searchable is true', () => {
    wrapper = createWrapper({ searchable: true });
    expect(wrapper.find('input[placeholder="Search..."]').exists()).toBe(true);
  });

  it('filters rows based on search query', async () => {
    wrapper = createWrapper({ searchable: true, virtualScroll: false });
    const input = wrapper.find('input');
    await input.setValue('Bob');
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.paginatedRows.length).toBe(1);
    expect(wrapper.findAll('.row-cell-container').length).toBe(1);
    const nameCell = wrapper.findAll('.row-cell')[1];
    expect(nameCell.text()).toContain('Bob');
  });

  it('shows empty state when no rows match search', async () => {
    wrapper = createWrapper({ searchable: true, virtualScroll: false });
    const input = wrapper.find('input');
    await input.setValue('Nonexistent');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.find('.empty-state-text').text()).toContain('No data available');
  });

  it('clears search when clear button is clicked', async () => {
    wrapper = createWrapper({ searchable: true, virtualScroll: false });
    const input = wrapper.find('.table-header-right input');

    const inputElement = input.element as HTMLInputElement;
    inputElement.value = 'Nonexistent';
    await input.trigger('input');
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.searchQuery).toBe('Nonexistent');
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.vm.paginatedRows.length).toBe(0);

    const clearButton = wrapper.find('.empty-state button');
    expect(clearButton.exists()).toBe(true);
    expect(clearButton.text()).toBe('Clear search');

    await clearButton.trigger('click');
    await wrapper.vm.$nextTick();

    wrapper.vm.clearSearch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.searchQuery).toBe('');
    expect(wrapper.vm.paginatedRows.length).toBe(rows.length);
  });

  it('toggles select all checkbox', async () => {
    wrapper = createWrapper({ selectable: true, virtualScroll: false });
    const selectAllDiv = wrapper.find('.column-select-all');
    await selectAllDiv.trigger('click');
    expect(wrapper.emitted('selectAll')?.[0]).toEqual([rows]);
    expect(wrapper.findAll('.row-select-selected').length).toBe(rows.length);

    await selectAllDiv.trigger('click');
    expect(wrapper.emitted('selectAll')?.[1]).toEqual([[]]);
    expect(wrapper.findAll('.row-select-selected').length).toBe(0);
  });

  it('selects individual row', async () => {
    wrapper = createWrapper({ selectable: true, virtualScroll: false });
    const rowSelect = wrapper.findAll('.row-select')[0];
    await rowSelect.trigger('click');
    expect(wrapper.emitted('select')?.[0]).toEqual([rows[0]]);
    expect(wrapper.findAll('.row-select-selected').length).toBe(1);
  });

  it('sorts rows when sortable column is clicked', async () => {
    wrapper = createWrapper({ virtualScroll: false });
    const sortButton = wrapper.find('.column-cell-sort');
    await sortButton.trigger('click');
    expect(wrapper.emitted('sort')?.[0]).toEqual([{ key: 'name', order: 'asc' }]);
    const sortedRowsAsc = wrapper.findAll('.row-cell-container');
    expect(sortedRowsAsc[0].text()).toContain('Alice');

    await sortButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('sort')?.[1]).toEqual([{ key: 'name', order: 'desc' }]);
    const sortedRowsDesc = wrapper.findAll('.row-cell-container');
    expect(sortedRowsDesc[0].text()).toContain('Charlie');
  });

  it('emits edit and remove events for actions', async () => {
    wrapper = createWrapper({ virtualScroll: false });
    await wrapper.vm.$nextTick();
    const actionButtons = wrapper.findAll('.actions button');

    await actionButtons[0].trigger('click'); // Remove button for first row
    expect(wrapper.emitted('removeButtonClick')?.[0]).toEqual([rows[0]]);

    await actionButtons[1].trigger('click'); // Edit button for first row
    expect(wrapper.emitted('editButtonClick')?.[0]).toEqual([rows[0]]);
  });

  it('applies sticky classes when props are set', () => {
    wrapper = createWrapper({ stickyFirstColumn: true, stickyLastColumn: true });
    expect(wrapper.find('.column-sticky-left').exists()).toBe(true);
    expect(wrapper.find('.column-sticky-right').exists()).toBe(true);
  });

  it('renders striped rows when stripedRows is true', async () => {
    wrapper = createWrapper({ stripedRows: true, virtualScroll: true });
    Object.defineProperty(wrapper.vm.scrollContainer, 'clientHeight', { value: 500 });
    wrapper.vm.handleScroll();
    await wrapper.vm.$nextTick();
    const rowContainers = wrapper.findAll('.row-cell-container');
    expect(rowContainers[0].classes()).toContain('row-cell-container-striped');
    expect(rowContainers[1].classes()).not.toContain('row-cell-container-striped');
  });
});
