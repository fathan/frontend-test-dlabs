<template>
  <a class="flex flex-row p-2">
    <div class="mr-2 flex justify-center items-center">
      <img :src="props.icon">
    </div>
    <div>
      <span>
        {{ props.label }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue';
import IconUser from '@assets/icons/icon-user.svg';

interface IProps {
  label: string;
  icon: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: '-',
  icon: IconUser
});
</script>