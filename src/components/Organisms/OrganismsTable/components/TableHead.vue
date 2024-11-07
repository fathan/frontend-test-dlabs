<template>
  <thead class="bg-[#F9FAFB] h-12">
    <tr>
      <th v-if="showCheckAll" class="w-4">
        <a-checkbox
          :checked="allChecked"
          :indeterminate="indeterminate"
          @change="toggleAllRows($event)"
        />
      </th>
      <th
        v-for="(header, index) in headers"
        :key="index"
        :class="[
          `text-[#475467] text-sm font-light px-6 py-3 ${ header.positionText }`,
          { 'cursor-pointer': header.sortable }
        ]"
        @click="sortBy(header)"
      >
        <div class="flex">
          {{ header.label }}

          <span v-if="sortedColumn === header.key">
            <AtomIcon
              v-if="sortOrder === 'asc'"
              name="chevron-up"
              category="arrows"
              size="lg"
              color="#485567"
            />
            <AtomIcon
              v-else
              name="chevron-down"
              category="arrows"
              size="lg"
              color="#485567"
            />
          </span>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed, ref } from 'vue';

import type { ITableHeaders, ITableSort } from '@/types/table';

const props = defineProps({
  headers: {
    type: Array as () => ITableHeaders[],
    required: true
  },
  rows: {
    type: Array as () => {
      checked: boolean
    }[],
    required: true
  },
  showCheckAll: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits([
  'toggle-all',
  'sort'
]);

const allChecked = computed(() => props.rows && props.rows.every((row) => row.checked));
const indeterminate = computed(() => props.rows && props.rows.some((row) => row.checked) && !allChecked.value);

const sortedColumn = ref<string | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');

const toggleAllRows = (event: any) => {
  const checkbox = event.target as HTMLInputElement;
  emits('toggle-all', checkbox.checked);
};

const sortBy = (header: ITableHeaders) => {
  if (header.sortable) {
    if (sortedColumn.value === header.key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    }
    else {
      sortedColumn.value = header.key;
      sortOrder.value = 'asc';
    }

    const data: ITableSort = {
      column: header.key,
      order: sortOrder.value
    };

    emits('sort', data);
  }
};
</script>
