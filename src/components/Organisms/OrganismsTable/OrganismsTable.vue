<!-- eslint-disable max-len -->
<template>
  <div class="rounded-lg border border-gray-200 overflow-y-auto">
    <table class="bg-white min-w-full divide-y divide-gray-200">
      <TableHead
        :headers="headers"
        :rows="rows"
        :show-check-all="showCheckAll"
        @toggle-all="onHandleToggleAll"
        @sort="onHandleSort"
      />
      <tbody>
        <TableSearching :col-span="headers.length + 1">
          <template #search>
            <slot name="table-searching" />
          </template>
        </TableSearching>
        <TableLoadingData v-if="isLoading" />
        
        <template v-else-if="rows.length === 0">
          <tr>
            <td colspan="100%">
              <slot name="table-empty-data">
                <TableEmptyData />
              </slot>
            </td>
          </tr>
        </template>
        
        <slot name="table-rows" />
      </tbody>
      <TableFooter
        v-if="rows.length"
        :total="total"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        @change-page-size="onHandlePageSizeChange"
        @change-page="onHandlePageChange"
      />
    </table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import TableHead from './components/TableHead.vue';
import TableSearching from './components/TableSearching.vue';
// import TableRow from './components/TableRow.vue';
import TableEmptyData from './components/TableEmptyData.vue';
import TableFooter from './components/TableFooter.vue';
import TableLoadingData from './components/TableLoadingData.vue';

import type { ITableHeaders, ITableSort } from '@/types/table';

const props = defineProps({
  headers: {
    type: Array as () => ITableHeaders[],
    required: true
  },
  rows: {
    type: Array as () => any,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  },
  pageSizes: {
    type: Array as () => number[],
    required: true
  },
  showCheckAll: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits([
  'change-page-size',
  'change-page',
  'sort'
]);

const onHandleToggleAll = (checked: boolean) => {
  props.rows.forEach((row) => {
    row.checked = checked;
  });
};

const onHandleSort = (data: ITableSort) => {
  emits('sort', data);
};

const onHandlePageSizeChange = (size: number) => {
  emits('change-page-size', size);
};

const onHandlePageChange = (page: number) => {
  emits('change-page', page);
};
</script>
