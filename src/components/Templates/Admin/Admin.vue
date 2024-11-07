<!-- eslint-disable max-len -->
<template>
  <div class="flex overflow-hidden bg-[#FCFCFD]">
    <OrganismsSidebar />
    <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" />
    <div
      :class="[
        'flex flex-col h-screen w-full bg-[#FCFCFD]',
        isSidebarOpen ? 'ml-72' : 'ml-0'
      ]"
    >
      <OrganismsNavbar />

      <main class="flex-1 mt-16 overflow-y-auto pb-10">
        <div class="pt-6 px-4">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useAppStore } from '@stores/app';

import OrganismsSidebar from '@components/Organisms/OrganismsSidebar';
import OrganismsNavbar from '@components/Organisms/OrganismsNavbar';

const appStore = useAppStore();

const { isSidebarOpen } = storeToRefs(appStore);
const mainContent = ref<HTMLElement | null>(null);

const handleResize = () => {
  if (window.innerWidth < 768) {
    appStore.setIsSidebarOpen(false);
  }
  else {
    appStore.setIsSidebarOpen(true);
  }
};

onMounted(() => {
  if (mainContent.value) {
    mainContent.value.scrollTop = 0;
  }

  window.addEventListener('resize', handleResize);
  handleResize();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>