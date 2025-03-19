import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import Table, { type TableProps } from 'library/Table';

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
          Svg: {
            template: '<span class="svg-stub"></span>',
            props: ['src', 'size'],
          },
          Button: {
            template: '<button><slot></slot></button>',
            props: ['color'],
            emits: ['click'],
            mounted() {
              this.$el.addEventListener('click', () => {
                this.$emit('click');
              });
            },
          },
          Input: {
            template: '<input :placeholder="placeholder" />',
            props: ['modelValue', 'placeholder', 'fluid'],
            emits: ['update:modelValue'],
            mounted() {
              this.$el.addEventListener('input', (e: any) => {
                this.$emit('update:modelValue', e.target.value);
              });
            },
          },
        },
      },
    });
  };

  beforeEach(() => {
    wrapper = createWrapper();
  });

  it('renders table with columns and rows', () => {
    expect(wrapper.find('.table-container').exists()).toBe(true);
    expect(wrapper.findAll('.column-cell').length).toBe(columns.length);
    expect(wrapper.findAll('.row-cell-container').length).toBe(rows.length);
  });

  it('renders header with title when provided', () => {
    wrapper = createWrapper({ title: 'Test Table' });
    expect(wrapper.find('.table-header-title').text()).toBe('Test Table');
  });

  it('displays search input when searchable is true', () => {
    wrapper = createWrapper({ searchable: true });
    expect(wrapper.find('input[placeholder="Search..."]').exists()).toBe(true);
  });

  it('filters rows based on search query', async () => {
    wrapper = createWrapper({ searchable: true });
    const input = wrapper.find('input');
    await input.setValue('Bob');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.row-cell-container').length).toBe(1);
    const nameCell = wrapper.findAll('.row-cell')[1];
    expect(nameCell.text()).toContain('Bob');
  });

  it('shows empty state when no rows match search', async () => {
    wrapper = createWrapper({ searchable: true });
    const input = wrapper.find('input');
    await input.setValue('Nonexistent');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.find('.empty-state-text').text()).toContain('No data available');
  });

  it('clears search when clear button is clicked', async () => {
    wrapper = createWrapper({ searchable: true });
    const input = wrapper.find('input');
    await input.setValue('Bob');
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.row-cell-container').length).toBe(1);

    await wrapper.vm.clearSearch();
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.row-cell-container').length).toBe(rows.length);
  });

  it('toggles select all checkbox', async () => {
    wrapper = createWrapper({ selectable: true });
    const selectAllDiv = wrapper.find('.column-select-all');
    await selectAllDiv.trigger('click');
    expect(wrapper.emitted('selectAll')?.[0]).toEqual([rows]);
    expect(wrapper.findAll('.row-select-selected').length).toBe(rows.length);

    await selectAllDiv.trigger('click');
    expect(wrapper.emitted('selectAll')?.[1]).toEqual([[]]);
    expect(wrapper.findAll('.row-select-selected').length).toBe(0);
  });

  it('selects individual row', async () => {
    wrapper = createWrapper({ selectable: true });
    const rowSelect = wrapper.findAll('.row-select')[0];
    await rowSelect.trigger('click');
    expect(wrapper.emitted('select')?.[0]).toEqual([rows[0]]);
    expect(wrapper.findAll('.row-select-selected').length).toBe(1);
  });

  it('sorts rows when sortable column is clicked', async () => {
    wrapper = createWrapper();
    const sortButton = wrapper.findAll('.column-cell-sort')[0];
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
    const actionButtons = wrapper.findAll('.actions button');
    await actionButtons[0].trigger('click');
    expect(wrapper.emitted('removeButtonClick')?.[0]).toEqual([rows[0]]);

    await actionButtons[1].trigger('click');
    expect(wrapper.emitted('editButtonClick')?.[0]).toEqual([rows[0]]);
  });

  it('applies sticky classes when props are set', () => {
    wrapper = createWrapper({ stickyFirstColumn: true, stickyLastColumn: true });
    expect(wrapper.find('.column-sticky-left').exists()).toBe(true);
    expect(wrapper.find('.column-sticky-right').exists()).toBe(true);
  });

  it('renders striped rows when stripedRows is true', () => {
    wrapper = createWrapper({ stripedRows: true });
    expect(wrapper.find('.row-cell-container-striped').exists()).toBe(true);
  });
});
