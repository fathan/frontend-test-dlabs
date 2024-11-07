<!-- eslint-disable max-len -->
<template>
  <div>
    <MoleculeBreadcrumbs
      :base-path="'/admin/user'"
      :breadcrumb-data="state.breadcrumbs"
    />

    <!-- ----------------------------------- -->

    <MoleculeTitlePageActionTop
      title="User"
      subtitle="Manage Users and Active Status with database localStorage browser for storage data"
    >
      <template #button-action>
        <div class="flex flex-row gap-2 mt-5 lg:mt-0">
          <a-button
            type="primary"
            :icon="h(PlusOutlined)"
            class="flex items-center"
            @click="onHandleActionNewData()"
          >
            New User
          </a-button>
        </div>
      </template>
    </MoleculeTitlePageActionTop>

    <!-- ----------------------------------- -->

    <OrganismsTable
      :headers="state.headers"
      :rows="state.rows"
      :is-loading="state.isLoading"
      :total="state.total"
      :current-page="1"
      :page-sizes="state.pageSizes"
      :show-check-all="state.showCheckAll"
      class="mt-5"
      @change-page-size="onHandlePageSizeChange"
      @change-page="onHandlePageChange"
      @sort="onHandleSort"
    >
      <template #table-searching>
        <OrganismsUserListSearching
          @on-action-search="onHandleActionSearching($event)"
          @on-action-reset-search="onHandleActionResetSearching()"
        />
      </template>
      <template #table-rows>
        <tr
          v-for="(row, index) in state.rows"
          :key="index"
          class="border-b border-gray-200"
        >
          <td class="px-6 py-3 text-[#475467] text-[12px] flex items-center gap-2">
            <div>
              <b>{{ row.fullname }}</b>
            </div>
          </td>
          <td class="px-6 py-3 text-[#475467] text-[12px]">
            <div>
              <b>{{ row.email }}</b>
            </div>
          </td>
          <td class="px-6 py-3 text-[#475467] text-[12px]">
            <div>
              <b>{{ row.age }}</b>
            </div>
          </td>
          <td class="px-6 py-3 text-[#475467]">
            <AtomBadge
              :label="row.status"
              :indicator="row.status"
              variant="rounded-[6px] border-[1px] border-[#D0D5DD] w-fit py-[2px] px-[8px] text-[12px] flex items-center gap-[6px]"
            />
          </td>
          <td class="px-3 py-3 flex items-center justify-center">
            <router-link :to="{ name: 'Admin User Detail', params: { userId: row.id } }">
              <a-button
                type="link"
                @click="onHandleActionDetail(row.id)"
              >
                <AtomIcon
                  name="arrow-narrow-right"
                  category="arrows"
                  size="lg"
                  color="#485567"
                />
              </a-button>
            </router-link>
            <a-button
              type="link"
              @click="onHandleActionEdit(row.id)"
            >
              <AtomIcon
                name="edit-02"
                category="general"
                size="lg"
                color="#485567"
              />
            </a-button>
            <a-button
              type="link"
              danger
              @click="onHandleActionDelete(row.id, row.fullname)"
            >
              <AtomIcon
                name="trash-01"
                category="general"
                size="lg"
                color="#485567"
              />
            </a-button>
          </td>
        </tr>
      </template>

      <template #table-empty-data>
        <div class="w-full flex items-center mt-6 text-center h-96 my-24">
          <div class="flex flex-col w-full max-w-sm px-4 mx-auto">
            <div class="p-2 mx-auto text-gray-400 border border-gray-100 bg-white rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h1 class="mt-3 text-lg text-gray-800">
              No users found
            </h1>
            <p class="mt-2 text-gray-500">
              Your filters and search did not match any users.Please try again or create add a new user.
            </p>
            <div class="flex items-center mt-4 sm:mx-auto gap-x-3">
              <a-button>
                Clear Search
              </a-button>

              <a-button
                type="primary"
                :icon="h(PlusOutlined)"
                class="flex items-center"
                @click="onHandleOpenModalFormUser()"
              >
                New User
              </a-button>
            </div>
          </div>
        </div>
      </template>
    </OrganismsTable>

    <!-- ----------------------------------- -->

    <div class="modal-customize">
      <a-modal
        v-model:open="isVisibleFormModal"
        :title="null"
        :mask-closable="false"
        centered
      >
        <OrganismsUserForm
          :type-form="state.typeForm"
          :row-id="state.selectedRowId"
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
import { useRoute } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

import { useUserStore } from '@stores/user';
import { storeToRefs } from 'pinia';

import type { ITableHeaders, ITableSort } from '@/types/table';
import type { TTypeForm } from '@/types/app';
import type { IBreadcrumbData } from '@/components/Molecules/MoleculeBreadcrumbs/model';
import type { Emitter } from '@interfaces/app';

import { sleep } from '@/utils/app';
import { successHandler, errorHandler } from '@/utils/response';

import OrganismsUserForm from '@components/Organisms/OrganismsUserForm';
import OrganismsTable from '@components/Organisms/OrganismsTable';
import OrganismsUserListSearching from '@components/Organisms/OrganismsUserListSearching';

import * as Constant from '@/configurations/constants';

interface IState {
  breadcrumbs: IBreadcrumbData[];
  headers: ITableHeaders[];
  rows: any;
  isLoading: boolean;
  total: number;
  pageSizes: number[];
  showCheckAll: boolean;
  typeForm: TTypeForm;
  selectedRowId?: number | string;
  filter: {
    status: string | boolean;
  }
}

const route = useRoute();
const userStore = useUserStore();
const {
  isVisibleFormModal,
  isLoadingFormSubmit
} = storeToRefs(userStore);

const emitter = inject<Emitter>('$emitter') as Emitter;

const state = reactive<IState>({
  typeForm: Constant.FORM_CREATE,
  selectedRowId: '',
  // ///////////////////
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'User'
    }
  ],
  headers: [
    { key: 'fullname', label: 'Name', positionText: 'text-left', sortable: true },
    { key: 'email', label: 'Email', positionText: 'text-left', sortable: true },
    { key: 'age', label: 'Umur', positionText: 'text-left', sortable: true },
    { key: 'status', label: 'Status', positionText: 'text-center', sortable: true },
    { key: 'actions', label: 'Actions', positionText: 'flex items-center justify-center', sortable: false }
  ],
  rows: [],
  // ///////////////////
  isLoading: false,
  total: 0,
  pageSizes: [
    10, 20, 30, 40, 50,
    60, 70, 80, 90, 100
  ],
  showCheckAll: false,
  filter: {
    status: ''
  }
});

// ///////////////////////////////////

emitter.on('user:initialize-list', () => {
  initialize();
});

// ///////////////////////////////////

const onHandleSort = (data: ITableSort) => {
  userStore.sortUsers(data.column, data.order);
  initialize();
};

// ///////////////////////////////////

const onHandlePageSizeChange = (size: number) => {
  console.log(size);
  initialize();
};

const onHandlePageChange = (page: number) => {
  console.log(page);
  initialize();
};

onMounted(() => {
  watch(
    () => ({
      page: route.query.page,
      perpage: route.query.perpage
    }),
    () => {
      initialize();
    },
    { immediate: true }
  );
});

// ///////////////////////////////////

const onHandleStatusFormModal = (status: boolean) : void => {
  userStore.setIsVisibleFormModal(status);
};

const onHandleOpenModalFormUser = () : void => {
  onHandleStatusFormModal(true);
};

const onHandleCloseModalFormUser = () : void => {
  Modal.confirm({
    title: h(
      'div',
      { style: 'color: #101828;' },
      'Konfirmasi Batalkan Pembuatan User'
    ),
    icon: h(ExclamationCircleOutlined),
    content: h(
      'div',
      { style: 'color: #475467;' },
      'Apakah anda yakin ingin membatalkan pembuatan User?'
    ),
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

// ///////////////////////////////////

const onHandleActionSearching = (e) => {
  if (typeof e.status !== 'undefined') {
    const status = Boolean(parseInt(e.status));
    state.filter.status = status;

    const buildData = userStore.getUserByStatus(status);
    console.log(buildData);

    state.rows = buildData;
  }
};

const onHandleActionResetSearching = () => {
  state.filter.status = '';

  state.rows = userStore.getUserAll;
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

const getUserList = async () => {
  state.isLoading = true;
  await sleep(2000);

  try {
    const response = userStore.getUserAll;
    state.rows = response;
  }
  catch (error: any) {
    errorHandler(error.message);
  }
  finally {
    state.isLoading = false;
  }
};

const deleteUserData = (id: number) => {
  userStore.deleteUser(id);
  successHandler('Data user berhasil didelete');

  initialize();
};

const initialize = () : void => {
  state.rows = [];
  getUserList();
};

// ///////////////////////////////////

const onHandleActionNewData = () => {
  state.typeForm = Constant.FORM_CREATE;
  onHandleOpenModalFormUser();
};

const onHandleActionDetail = (id: number) => {
  console.log(id);
};

const onHandleActionEdit = (id: number) => {
  state.typeForm = Constant.FORM_UPDATE;
  state.selectedRowId = id;

  onHandleOpenModalFormUser();
};

const onHandleActionDelete = (id: number, name: string) => {
  Modal.confirm({
    title: h(
      'div',
      { style: 'color: #101828;' },
      'Konfirmasi Hapus User'
    ),
    icon: h(ExclamationCircleOutlined),
    content: h(
      'div',
      { style: 'color: #475467;' },
      `Apakah anda yakin ingin menghapus User ${ name }?`
    ),
    okText: 'Ya, Hapus User',
    okType: 'danger',
    onOk () {
      deleteUserData(id);
    },
    cancelText: 'Batalkan',
    onCancel () {
      // @TODO
    },
    class: 'test'
  });
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

<style scoped>
.custom-modal-wrapper .ant-modal-content {
  padding: 0;
}
.custom-modal-content {
  padding: 24px;
}
</style>