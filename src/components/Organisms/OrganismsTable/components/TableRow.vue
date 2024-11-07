<template>
  <tr>
    <td>
      <a-checkbox :checked="row.checked" @change="toggleRow" />
    </td>
    <td>
      <slot name="content" />
    </td>
    <td>
      <slot name="actions" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  row: {
    type: Object as () => { checked: boolean, [key: string]: any },
    required: true
  }
});

const emits = defineEmits(['toggle-row']);

const toggleRow = (checked: any) => {
  emits('toggle-row', checked);
};
</script>
