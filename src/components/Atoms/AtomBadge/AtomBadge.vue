<!-- eslint-disable max-len -->
<template>
  <div :class="variant">    
    <div
      v-if="props.indicator !== undefined && typeof label=== 'boolean'" :class="{
        'rounded-full w-[6px] h-[6px]': true,
        'bg-[#17B26A]': props.indicator,
        'bg-[#F04438]': !props.indicator
      }"
    />
    {{ typeof label=== 'boolean' ? label === true ? 'Active' : 'Inactive' : label }} 
  </div>
</template>
  
<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';
import type { IProps } from './model';
  
const props = withDefaults(defineProps<IProps>(), {
  label: 'Badge',
  variant: 'rounded-[6px] border-[1px] border-[#D0D5DD] w-fit py-[2px] px-[8px] text-[12px]'  
});
  
</script>
