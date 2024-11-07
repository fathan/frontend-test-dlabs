<!-- eslint-disable max-len -->
<template>
  <header class="bg-white w-full p-3 px-4 flex justify-between fixed top-0 left-0 right-0 shadow-md">
    <div
      :class="[
        'flex justify-center items-center',
        isSidebarOpen ? 'ml-72' : 'ml-0'
      ]"
    >
      <div
        class="font-bold text-2xl mr-5 cursor-pointer"
        @click="onHandleOpenCloseSidebar()"
      >
        ☰
      </div>
      <span class="font-semibold mt-2 text-lg">
        Dashboard
      </span>
    </div>

    <div class="flex">
      <div class="flex justify-center items-center mr-2">
        <img
          class="w-7 h-7"
          src="~@assets/icons/icon-bell.svg"
        >
      </div>
      <div class="cursor-pointer">
        <a-dropdown>
          <img
            class="w-10 h-10 p-1 rounded-full ring-1 ring-[#33529b]"
            src="https://media.licdn.com/dms/image/v2/C5603AQG1CkaEcR-hOw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1617022748917?e=2147483647&v=beta&t=I_Csez9rNIiIg1ni2MZN7FlZvznF6FtdhUVNz6KMMg8"
            alt="Avatar"
            @click.prevent
          >
          <template #overlay>
            <div class="rounded-lg bg-white shadow-md mt-3 w-60">
              <div class="flex flex-row border-b border-[#E4E7EC] p-3">
                <div class="relative mr-2">
                  <img
                    class="w-10 h-10 rounded-full"
                    src="https://media.licdn.com/dms/image/v2/C5603AQG1CkaEcR-hOw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1617022748917?e=2147483647&v=beta&t=I_Csez9rNIiIg1ni2MZN7FlZvznF6FtdhUVNz6KMMg8"
                    alt="Avatar"
                  >
                  <span class="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
                </div>
                <div class="flex flex-col">
                  <div class="font-semibold text-[#344054]">
                    {{ state.name }}
                  </div>
                  <div class="font-light text-[#475467]">
                    {{ state.email }}
                  </div>
                </div>
              </div>

              <div>
                <LinkItem
                  label="View Profile"
                  :icon="IconUser"
                  href="/admin/profile"
                />
                <hr class="h-px bg-gray-200 border-0">
                <LinkItem
                  label="Log Out"
                  :icon="IconLogout"
                  @click="onClickLogout()"
                />
              </div>
            </div>
          </template>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
import { Modal } from 'ant-design-vue';
import { storeToRefs } from 'pinia';

import { useAppStore } from '@stores/app';

import { useRouter } from 'vue-router';
import { useAuthStore } from '@stores/auth';

import type { Emitter } from '@interfaces/app';

import IconUser from '@assets/icons/icon-user.svg';
import IconLogout from '@assets/icons/icon-log-out.svg';

import LinkItem from '@components/Molecules/MoleculeNavbar/MenuDropdown/LinkItem';

interface IState {
  name?: string;
  email?: string;
}

const appStore = useAppStore();

const { isSidebarOpen } = storeToRefs(appStore);

const state = reactive<IState>({
  name: 'Fathan Rohman',
  email: 'karir.fathan@gmail.com'
});

// ////////////////////////////////////////////////////

const emitter = inject<Emitter>('$emitter') as Emitter;
const authStore = useAuthStore();
const router = useRouter();

// ////////////////////////////////////////////////////

const onClickLogout = () => {
  Modal.confirm({
    title: 'Are you sure you want to logout?',
    content: 'Click Yes to confirm, No to cancel.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk () {
      onProcessLogout();
    },
    onCancel () {
      console.log('Logout canceled.');
    }
  });
};

const onProcessLogout = () => {
  authStore.$reset();
  router.push({
    path: '/auth/login'
  });
};

const onHandleOpenCloseSidebar = () => {
  emitter.emit('sidebar:open-close', true);
};
</script>