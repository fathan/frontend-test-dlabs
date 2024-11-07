<template>
  <svg
    :width="size + 'em'"
    :height="size + 'em'"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      :d="state.pathData"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed, watchEffect, reactive } from 'vue';
import type { IProps } from './model';

const props = defineProps<IProps>();

const state = reactive<{ pathData: string; }>({
  pathData: ''
});

const fetchIcon = async (name: string) => {
  try {
    const categoryDir = props.category ? props.category : 'general';
    const response = await fetch(new URL(`../../../assets/icons/${ categoryDir }/${ name }.svg`, import.meta.url).href);
    const resSvgText = await response.text();

    if (response.ok) {
      const svgContent = resSvgText;
      
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
      const pathElement: any = svgDoc.querySelector('path');
      const pathData = pathElement.getAttribute('d');

      state.pathData = pathData;
    }
    else {
      console.error(`Icon ${ name } not found`);
    }
  }
  catch (error) {
    console.error(`Error fetching icon ${ name }:`, error);
  }
};

watchEffect(() => {
  fetchIcon(props.name);
});

const size = computed(() => {
  let result = props.size;

  switch (result) {
  case 'xs':
    result = 0.75;
    break;
  case 'sm':
    result = 1;
    break;
  case 'md':
    result = 1.25;
    break;
  case 'lg':
    result = 1.5;
    break;
  case 'xl':
    result = 2;
    break;
  }

  return result;
});
const color = computed(() => props.color ?? 'currentColor');
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
