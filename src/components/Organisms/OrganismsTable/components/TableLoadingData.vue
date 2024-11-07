<template>
  <tr>
    <td colspan="100%" class="text-center py-4">
      <div class="w-full flex items-center mt-6 text-center h-96 my-24">
        <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
          <a-spin :indicator="indicator" />
          <h1 class="mt-3 text-sm text-[#344054]">
            Loading data...
          </h1>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';

const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '40px',
    color: '#D92D20'
  },
  spin: true
});
</script>
