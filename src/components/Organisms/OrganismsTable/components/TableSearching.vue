<template>
  <tr class="w-full border-b border-gray-200 bg-[#F9FAFB]">
    <slot name="search" />
  </tr>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  colSpan: {
    type: Number,
    required: true
  }
});
</script>
