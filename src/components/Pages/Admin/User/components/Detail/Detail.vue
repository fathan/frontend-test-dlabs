<template>
  <div>
    <MoleculeBreadcrumbs
      :base-path="'/admin/user'"
      :breadcrumb-data="state.breadcrumbs"
    />

    <MoleculeTitlePageActionTop
      :title="`${ state.user.fullname } - ${ state.user.age }`"
      :subtitle="state.user.email"
      is-with-border-bottom
    >
      <template #badge-info>
        <div class="ml-3">
          <div class="border py-0 px-3 bg-white border-[#D0D5DD] rounded-md">
            <a-badge v-if="state.user.status" text="Active" status="success" />
            <a-badge v-else text="Inactive" status="error" />
          </div>
        </div>
      </template>

      <template #button-action>
        <div class="flex flex-row gap-2">
          <a-button
            type="primary"
            class="flex items-center"
            :icon="h(EditOutlined)"
            @click="onHandleOpenModalFormUser()"
          >
            Edit User
          </a-button>
        </div>
      </template>
    </MoleculeTitlePageActionTop>

    <div class="modal-customize">
      <a-modal
        v-model:open="isVisibleFormModal"
        :title="null"
      >
        <OrganismsUserForm
          type-form="update"
          :row-id="Number($route.params.userId)"
        />

        <template #footer>
          <div class="p-4 border-t border-[#F5F5F5]">
            <a-button
              key="back"
              @click="onHandleCloseModalFormUser()"
            >
              Batalkan
            </a-button>
            <a-button
              key="submit"
              type="primary"
              :loading="isLoadingFormSubmit"
              @click="onHandleSubmitForm()"
            >
              Submit
            </a-button>
          </div>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, h, inject, onMounted, watch, nextTick } from 'vue';
import { EditOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { useRoute } from 'vue-router';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import type { IBreadcrumbData } from '@components/Molecules/MoleculeBreadcrumbs/model';

import { useUserStore } from '@stores/user';
import { storeToRefs } from 'pinia';
import type { Emitter } from '@interfaces/app';

import OrganismsUserForm from '@components/Organisms/OrganismsUserForm';
import type { IUser } from '@/interfaces/user';

interface IState {
  breadcrumbs: IBreadcrumbData[],
  user: IUser
}

const emitter = inject<Emitter>('$emitter') as Emitter;
const route = useRoute();
const userStore = useUserStore();
const {
  isVisibleFormModal,
  isLoadingFormSubmit
} = storeToRefs(userStore);

const state = reactive<IState>({
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'User'
    },
    {
      path: '',
      breadcrumbName: 'Detail'
    }
  ],
  user: {
    id: '',
    fullname: '',
    email: '',
    age: 0,
    status: false
  }
});

// ///////////////////////////////////

emitter.on('user:initialize-list', () => {
  getDetailUser();
});

const getDetailUser = () => {
  const id = Number(route.params.userId);
  const response = userStore.getUserById(id);

  if (response) {
    state.user.fullname = response?.fullname;
    state.user.email = response?.email;
    state.user.age = response?.age;
    state.user.status = response?.status;
  }
};

onMounted(() => {
  getDetailUser();
});

const onHandleOpenModalFormUser = () : void => {
  onHandleStatusFormModal(true);
  emitter.emit('user:show-form-user', true);
};

const onHandleCloseModalFormUser = () : void => {
  Modal.confirm({
    title: h('div', { style: 'color: #101828;' }, 'Konfirmasi Batalkan Pembuatan User'),
    icon: h(ExclamationCircleOutlined),
    content: h('div', { style: 'color: #475467;' }, 'Apakah anda yakin ingin membatalkan pembuatan User?'),
    okText: 'Ya, Batalkan',
    onOk () {
      onHandleStatusFormModal(false);
    },
    cancelText: 'Tidak, Kembali ke Form',
    onCancel () {
      onHandleStatusFormModal(false);
    },
    class: 'test'
  });
};

const onHandleStatusFormModal = (status: boolean) : void => {
  userStore.setIsVisibleFormModal(status);
};

// ///////////////////////////////////

const onHandleSubmitForm = () : void => {
  emitter.emit('user:submit-form', true);

  userStore.setIsLoadingFormSubmit(true);

  setTimeout(() => {
    userStore.setIsLoadingFormSubmit(false);
  }, 2000);
};

// ///////////////////////////////////

onMounted(() => {
  watch(isVisibleFormModal, async (newVal) => {
    if (newVal) {
      await nextTick();
      const modalContent = document.querySelector('.ant-modal-content') as HTMLElement;
      if (modalContent) {
        modalContent.style.padding = '0';
      }
    }
  });
});
</script>