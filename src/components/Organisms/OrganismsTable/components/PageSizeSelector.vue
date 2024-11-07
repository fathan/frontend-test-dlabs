<template>
  <a-select
    v-model:value="pageSize"
    style="width: 120px"
    @change="handleChange"
  >
    <a-select-option
      v-for="size in pageSizes"
      :key="size"
      :value="size"
    >
      {{ size }} / page
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  pageSizes: {
    type: Array as () => number[],
    required: true
  }
});

const emits = defineEmits([
  'changePageSize',
  'changePage'
]);

const route = useRoute();
const router = useRouter();

const pageSize = ref<number>(
  route.query.perpage ? parseInt(route.query.perpage as string) : props.pageSizes[0]
);

const handleChange = () => {
  emits('changePageSize', pageSize.value);

  console.log(pageSize.value.toString());

  router.push({
    query: {
      ...route.query,
      page: '1',
      perpage: pageSize.value.toString()
    }
  });

  emits('changePage', 1);
};

watch(() => route.query.perpage, (newPerPage) => {
  if (newPerPage) {
    pageSize.value = parseInt(newPerPage as string);
  }
});
</script>
