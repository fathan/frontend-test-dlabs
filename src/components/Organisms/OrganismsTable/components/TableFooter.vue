<template>
  <tfoot>
    <tr>
      <td colspan="100%" class="px-6 py-3">
        <div class="flex justify-between items-center">
          <PageSizeSelector
            :pageSizes="pageSizes"
            @change="handlePageSizeChange"
          />

          <Pagination
            :total="total"
            :currentPage="currentPage"
            @change="handlePageChange"
          />
        </div>
      </td>
    </tr>
  </tfoot>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import PageSizeSelector from './PageSizeSelector.vue';
import Pagination from './Pagination.vue';

defineProps({
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
  }
});

const emits = defineEmits([
  'change-page-size', 'change-page'
]);

const handlePageSizeChange = (size: number) => {
  emits('change-page-size', size);
};

const handlePageChange = (page: number) => {
  emits('change-page', page);
};
</script>
