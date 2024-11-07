<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img
      :src="avatar_url"
      alt="User Avatar"
      class="w-full h-32 object-cover"
    >

    <div class="p-4">
      <h2 class="text-xl font-bold mb-2">
        {{ login }}
      </h2>
      
      <p class="text-gray-600">
        ID: {{ id }}
      </p>
      
      <p class="text-gray-600 mb-2">
        Type: {{ type }}
      </p>

      <a
        :href="html_url"
        target="_blank"
      >
        <a-button
          type="primary"
          class="flex items-center"
        >
          View Profile
        </a-button>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IPropsMoleculeCardGithub } from './model';

withDefaults(defineProps<IPropsMoleculeCardGithub>(), {
  avatar_url: '',
  login: '',
  id: '',
  type: '',
  html_url: ''
});
</script>