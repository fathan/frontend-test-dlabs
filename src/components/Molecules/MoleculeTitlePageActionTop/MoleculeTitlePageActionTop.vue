<template>
  <div v-if="isBackNavigation" class="flex items-center w-full">
    <div>
      <router-link to="/admin/profile">
        <a-button type="link">
          <AtomIcon
            name="arrow-narrow-left"
            category="arrows"
            size="lg"
            color="#475467"
          />
        </a-button>
      </router-link>
    </div>

    <div class="flex flex-col">
      <div class="flex flex-col lg:flex-row justify-between">      
        <div class="flex flex-col">
          <div class="flex flex-row text-xl font-bold text-[#101828] mb-2">
            {{ title }}
  
            <slot name="badge-info" />
          </div>
          <div class="text-sm text-[#475467]">
            {{ subtitle }}
          </div>
        </div>
  
        <slot name="button-action" />
      </div>
  
      <div
        v-if="isWithBorderBottom"
        class="w-full mt-4"
      >
        <hr class="h-px bg-gray-200 border-0">
      </div>
    </div>
  </div>
  
  <div v-else class="flex flex-col">
    <div class="flex flex-col lg:flex-row justify-between">      
      <div class="flex flex-col">
        <div class="flex flex-row text-xl font-bold text-[#101828] mb-2">
          {{ title }}
  
          <slot name="badge-info" />
        </div>
        <div class="text-sm text-[#475467]">
          {{ subtitle }}
        </div>
      </div>
  
      <slot name="button-action" />
    </div>
  
    <div
      v-if="isWithBorderBottom"
      class="w-full mt-4"
    >
      <hr class="h-px bg-gray-200 border-0">
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

import type { IProps } from './model';

// ///////////////////////////

withDefaults(defineProps<IProps>(), {
  title: 'Page Title',
  subtitle: 'Page Subtitle',
  isWithBorderBottom: false,
  isBackNavigation: false
});

</script>