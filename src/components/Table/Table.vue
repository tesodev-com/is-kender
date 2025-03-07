<template>
  <div class="table-container">
    <div
      v-if="isTableHeaderExists"
      class="table-header"
    >
      <div
        v-if="slots.title || title || slots.description || description"
        class="table-header-left"
      >
        <slot
          v-if="slots.title || title"
          name="title"
        >
          <h3 class="table-header-title">
            {{ title }}
          </h3>
        </slot>
        <slot
          v-if="slots.description || description"
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
        <thead>
          <tr
            class="table-data-columns"
            :class="[{ 'table-data-columns-no-header': !isTableHeaderExists }]"
          >
            <th
              v-if="selectable"
              class="column-cell column-cell-checkbox"
              @click="selectAll"
            >
              <div
                class="column-select-all"
                :class="[{ 'column-select-all-selected': isAllSelected }]"
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
              :class="[{ 'column-cell-selectable': selectable && columnIndex === 0 }]"
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
              v-for="(row, rowIndex) in filteredRows"
              :key="rowIndex"
              class="row-cell-container"
              :class="[{ 'row-cell-container-striped': stripedRows }]"
            >
              <td
                v-if="selectable"
                class="row-cell row-cell-checkbox"
                @click="selectRow(row)"
              >
                <div
                  class="row-select"
                  :class="[{ 'row-select-selected': selectedItems.has(row) }]"
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
                :class="[{ 'row-cell-selectable': selectable && colIndex === 0, 'row-cell-actions': column.key === 'actions' }]"
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
                      <button @click="emit('removeButtonClick')">
                        <Svg
                          :src="deleteIcon"
                          size="16"
                        />
                      </button>
                      <button @click="emit('editButtonClick')">
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import Svg from 'library/Svg';
import Button from 'library/Button';
import Input from 'library/Input';
import { checkIcon, expandLessIcon, expandMoreIcon, importExportIcon, editIcon, deleteIcon, searchIcon } from '@/assets/icons';
import type { Row, TableEmits, TableProps, TableSlots } from 'library/Table';

const props = withDefaults(defineProps<TableProps>(), {
  searchable: false,
  selectable: false,
  stripedRows: false,
});

const emit = defineEmits<TableEmits>();

const slots = defineSlots<TableSlots>();

const selectedItems = ref(new Set<Row>());
const searchQuery = ref('');
const sortKey = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const isTableHeaderExists = computed(() => {
  return props.title || slots.title || slots.description || props.description || props.searchable;
});

const filteredRows = computed(() => {
  let result = [...(props.rows || [])];

  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    result = result?.filter(row => Object.values(row).some(value => String(value).toLowerCase().includes(lowerCaseQuery)));
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

const isAllSelected = computed(() => {
  return props.rows.length > 0 && props.rows.every(item => selectedItems.value.has(item));
});

function selectAll() {
  if (isAllSelected.value) {
    props.rows.forEach(row => selectedItems.value.delete(row));
  } else {
    props.rows.forEach(row => selectedItems.value.add(row));
  }
  emit('selectionChange', Array.from(selectedItems.value));
}

function selectRow(row: Row) {
  if (selectedItems.value.has(row)) {
    selectedItems.value.delete(row);
  } else {
    selectedItems.value.add(row);
  }
  emit('selectionChange', Array.from(selectedItems.value), row);
}

function handleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

function getSortIndicator(key: string) {
  if (sortKey.value !== key) {
    return importExportIcon;
  }
  return sortOrder.value === 'asc' ? expandLessIcon : expandMoreIcon;
}

function clearSearch() {
  searchQuery.value = '';
}
</script>

<style lang="scss" scoped src="./Table.style.scss"></style>
