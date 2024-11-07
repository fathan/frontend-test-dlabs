<template>
  <a-breadcrumb
    separator="&nbsp;&nbsp;>&nbsp;&nbsp;"
    :routes="breadcrumbData"
  >
    <template #itemRender="{ route, paths }">
      <router-link
        v-if="breadcrumbData.indexOf(route) === 0"
        :to="{
          path: '/admin/dashboard'
        }"
      >
        Home
      </router-link>

      <span v-if="breadcrumbData.indexOf(route) === 0">
        &nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;
      </span>

      <router-link
        v-if="route.isTitle"
        :to="`${ basePath }`"
      >
        {{ route.breadcrumbName }}
      </router-link>

      <span v-else-if="breadcrumbData.indexOf(route) === breadcrumbData.length - 1">
        {{ route.breadcrumbName }}
      </span>

      <router-link v-else :to="computeLink(basePath, paths)">
        {{ route.breadcrumbName }}
      </router-link>
    </template>
  </a-breadcrumb>

  <hr
    v-if="isWithBottomLine"
    class="h-px my-5 bg-gray-200 border-0 dark:bg-[#E4E7EC]"
  >
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

import type { IBreadcrumbData } from './model';

// ///////////////////////////

interface IProps {
  basePath: string;
  isWithBottomLine: boolean;
  breadcrumbData: IBreadcrumbData[];
}

// ///////////////////////////

withDefaults(defineProps<IProps>(), {
  isWithBottomLine: true,
  breadcrumbData: () => [] as IBreadcrumbData[]
});

const computeLink = (basePath: string, paths: any): string =>  {
  let result = `${ basePath }/${ paths.join('/') }`;
  return result;
};

</script>
