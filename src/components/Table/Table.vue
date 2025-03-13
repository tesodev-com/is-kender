<template>
  <div class="table-container">
    <div
      v-if="isTableHeaderExists"
      class="table-header"
    >
      <div
        v-if="hasHeaderLeft"
        class="table-header-left"
      >
        <slot
          v-if="hasTitle"
          name="title"
        >
          <h3 class="table-header-title">
            {{ title }}
          </h3>
        </slot>
        <slot
          v-if="hasDescription"
          name="description"
        >
          <h3 class="table-header-description">
            {{ description }}
          </h3>
        </slot>
      </div>
      <div class="table-header-right">
        <Input
          v-if="searchable"
          v-model="searchQuery"
          placeholder="Search..."
          fluid
        />
        <slot name="header-right" />
      </div>
    </div>
    <div class="table-data-container">
      <table class="table-data">
        <thead :class="{ 'table-data-thead-sticky': stickyHeader }">
          <tr
            class="table-data-columns"
            :class="[{ 'table-data-columns-no-header': !isTableHeaderExists }]"
          >
            <th
              v-if="selectable"
              class="column-cell column-cell-checkbox"
              :class="{ 'column-sticky-left': stickyFirstColumn, 'column-cell-border-top': isTableHeaderExists }"
            >
              <div
                class="column-select-all"
                :class="[{ 'column-select-all-selected': isAllSelected, 'column-select-all-disabled': paginatedRows.length === 0 }]"
                @click="selectAll"
              >
                <Svg
                  v-if="isAllSelected"
                  class="column-select-all-icon"
                  :src="checkIcon"
                />
              </div>
            </th>
            <th
              v-for="(column, columnIndex) in columns"
              :key="column.key || columnIndex"
              class="column-cell"
              :class="[
                {
                  'column-cell-selectable': selectable && columnIndex === 0,
                  'column-sticky-left': stickyFirstColumn && !selectable && columnIndex === 0,
                  'column-sticky-left-selectable': stickyFirstColumn && selectable && columnIndex === 0,
                  'column-sticky-right': stickyLastColumn && columnIndex === columns.length - 1,
                  'column-cell-border-top': isTableHeaderExists,
                },
              ]"
            >
              <slot
                :name="`column-${column.key}`"
                :column="column"
              >
                <template v-if="column.sortable">
                  <button
                    class="column-cell-sort"
                    @click="handleSort(column.key)"
                  >
                    {{ column.label }}
                    <Svg
                      :src="getSortIndicator(column.key)"
                      size="16"
                    />
                  </button>
                </template>
                <template v-else>
                  {{ column.label }}
                </template>
              </slot>
            </th>
          </tr>
        </thead>
        <tbody class="table-data-rows">
          <template v-if="filteredRows.length === 0">
            <tr class="row-empty-state">
              <td
                :colspan="columns.length + (selectable ? 1 : 0)"
                class="row-empty-state-cell"
              >
                <slot name="row-empty-state">
                  <div class="empty-state">
                    <div
                      v-if="searchQuery"
                      class="search-icon"
                    >
                      <Svg
                        size="20"
                        :src="searchIcon"
                      />
                      <span
                        v-for="circle in 6"
                        :key="circle"
                        class="search-icon-circle"
                        :class="`search-icon-circle-${circle}`"
                      />
                    </div>
                    <div
                      class="empty-state-text"
                      :class="[{ 'empty-state-text-no-query': !searchQuery }]"
                    >
                      <h3>No data available</h3>
                      <p v-if="searchQuery">
                        Your search "{{ searchQuery }}" did not match any data.
                        <br />
                        Please try again to search a data.
                      </p>
                    </div>
                    <Button
                      v-if="searchQuery"
                      color="secondary"
                      @click="clearSearch"
                    >
                      Clear search
                    </Button>
                  </div>
                </slot>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(row, rowIndex) in paginatedRows"
              :key="row.key || rowIndex"
              class="row-cell-container"
              :class="[{ 'row-cell-container-striped': stripedRows, 'row-cell-container-border': rowsBorder }]"
            >
              <td
                v-if="selectable"
                class="row-cell row-cell-checkbox"
                :class="{ 'row-sticky-left': stickyFirstColumn }"
              >
                <div
                  class="row-select"
                  :class="[{ 'row-select-selected': selectedItems.has(row) }]"
                  @click="selectRow(row)"
                >
                  <Svg
                    v-if="selectedItems.has(row)"
                    class="row-select-icon"
                    :src="checkIcon"
                  />
                </div>
              </td>
              <td
                v-for="(column, colIndex) in columns"
                :key="colIndex"
                class="row-cell"
                :class="[
                  {
                    'row-cell-selectable': selectable && colIndex === 0,
                    'row-cell-actions': column.key === 'actions',
                    'row-sticky-left': stickyFirstColumn && !selectable && colIndex === 0,
                    'row-sticky-left-selectable': stickyFirstColumn && selectable && colIndex === 0,
                    'row-sticky-right': stickyLastColumn && colIndex === columns.length - 1,
                  },
                ]"
              >
                <slot
                  :name="`row-${column.key}`"
                  :row="row"
                  :value="row[column.key]"
                  :rowIndex="rowIndex"
                  :colIndex="colIndex"
                >
                  <template v-if="column.key === 'actions'">
                    <div class="actions">
                      <button @click="emit('removeButtonClick', row)">
                        <Svg
                          :src="deleteIcon"
                          size="16"
                        />
                      </button>
                      <button @click="emit('editButtonClick', row)">
                        <Svg
                          :src="editIcon"
                          size="16"
                        />
                      </button>
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      {{ row[column.key] }}
                    </div>
                  </template>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div
      v-if="pagination"
      class="table-pagination"
    >
      <Pagination
        v-model:currentPage="currentPage"
        :itemsPerPage="itemsPerPage"
        :totalItems="filteredRows.length"
        :showTopBorder="false"
        outlineButtons
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import Svg from 'library/Svg';
import Button from 'library/Button';
import Input from 'library/Input';
import Pagination from 'library/Pagination';
import { checkIcon, expandLessIcon, expandMoreIcon, importExportIcon, editIcon, deleteIcon, searchIcon } from '@/assets/icons';
import type { Row, TableEmits, TableProps, TableSlots } from 'library/Table';

const props = withDefaults(defineProps<TableProps>(), {
  pagination: false,
  currentPage: 1,
  itemsPerPage: 10,
  searchable: false,
  selectable: false,
  stripedRows: false,
  rowsBorder: false,
  stickyFirstColumn: false,
  stickyLastColumn: false,
});

const emit = defineEmits<TableEmits>();

const slots = defineSlots<TableSlots>();

const selectedItems = ref(new Set<Row>());
const searchQuery = ref('');
const sortKey = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const currentPage = ref(props.currentPage);
const itemsPerPage = ref(props.itemsPerPage);

const isTableHeaderExists = computed(() => {
  return props.title || slots.title || slots.description || props.description || props.searchable;
});

const hasHeaderLeft = computed(() => {
  return props.title || slots.title || props.description || slots.description;
});

const hasTitle = computed(() => {
  return props.title || slots.title;
});

const hasDescription = computed(() => {
  return props.description || slots.description;
});

const filteredRows = computed(() => {
  let result = [...(props.rows || [])];

  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    const columnKeys = props.columns.map(column => column.key);
    result = result?.filter(row =>
      columnKeys.some(key => {
        const value = row[key];
        return value != null && String(value).toLowerCase().includes(lowerCaseQuery);
      })
    );
  }

  if (sortKey.value) {
    result.sort((a, b) => {
      const valueA = a[sortKey.value];
      const valueB = b[sortKey.value];
      if (sortOrder.value === 'asc') {
        return valueA > valueB ? 1 : -1;
      }
      return valueA < valueB ? 1 : -1;
    });
  }

  return result;
});

const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredRows.value.slice(start, end);
});

const isAllSelected = computed(() => {
  return paginatedRows.value.length > 0 && paginatedRows.value.every(item => selectedItems.value.has(item));
});

watch(
  () => searchQuery.value,
  () => {
    currentPage.value = 1;
  }
);

function selectAll() {
  if (isAllSelected.value) {
    paginatedRows.value.forEach(row => selectedItems.value.delete(row));
  } else {
    paginatedRows.value.forEach(row => selectedItems.value.add(row));
  }
  emit('selectAll', Array.from(selectedItems.value));
}

function selectRow(row: Row) {
  if (selectedItems.value.has(row)) {
    selectedItems.value.delete(row);
  } else {
    selectedItems.value.add(row);
  }
  emit('select', row);
}

function handleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
  emit('sort', { key: sortKey.value, order: sortOrder.value });
}

function getSortIndicator(key: string) {
  if (sortKey.value !== key) {
    return importExportIcon;
  }
  return sortOrder.value === 'asc' ? expandLessIcon : expandMoreIcon;
}

function clearSearch() {
  searchQuery.value = '';
  currentPage.value = 1;
}
</script>

<style lang="scss" scoped src="./Table.style.scss"></style>
