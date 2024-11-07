<template>
  <a-pagination
    :total="totalPage * pageSize"
    :current="currentPage"
    :pageSize="pageSize"
    :showSizeChanger="false"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
  total: {
    type: Number,
    required: true
  }
});

const emits = defineEmits(['change']);

const route = useRoute();
const router = useRouter();

const currentPage = ref<number>(
  route.query.page ? parseInt(route.query.page as string) : 1
);

const pageSize = ref<number>(
  route.query.perpage ? parseInt(route.query.perpage as string) : 10
);

const totalPage = computed(() => {
  return Math.ceil(props.total / pageSize.value);
});

const handleChange = (page: number) => {
  emits('change', page);
  router.push({
    query: {
      ...route.query,
      page: page.toString()
    }
  });
};

watch(() => route.query.page, (newPage) => {
  if (newPage) {
    currentPage.value = parseInt(newPage as string);
  }
});
</script>
