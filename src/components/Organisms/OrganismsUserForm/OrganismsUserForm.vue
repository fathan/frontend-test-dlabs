<!-- eslint-disable max-len -->
<template>
  <div class="p-4 overflow-hidden">
    <div class="relative z-0">
      <img
        src="~@assets/svg/bg-pattern-form-1.svg"
        class="absolute -top-4 -left-4"
      >
      <div class="absolute top-2 left-2 bg-white border border-[#E4E7EC] rounded-md p-2 flex justify-center items-center w-12 h-12">
        <img src="~@assets/svg/icon-user-02.svg">
      </div>
    </div>

    <div class="w-full mb-3 mt-20 z-9999">
      <span class="font-bold text-base lg:text-lg">
        {{ typeForm === FORM_CREATE ? 'Buat' : 'Edit' }} User
      </span>
    </div>

    <a-form
      ref="formRef"
      :layout="state.layout"
      :model="state.form"
      :rules="rules"
      class="flex flex-wrap z-9999"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full">
        <a-form-item
          ref="fullname"
          name="fullname"
          label="Full name"
          class="mb-0"
        >
          <a-input
            v-model:value="state.form.fullname"
            placeholder="Masukan nama depan"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item
          ref="email"
          name="email"
          label="Email"
          class="mb-0"
        >
          <a-input
            v-model:value="state.form.email"
            placeholder="Masukan alamat email"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item
          ref="age"
          name="age"
          label="age"
          class="mb-0"
        >
          <a-input
            v-model:value="state.form.age"
            placeholder="Masukan umur"
            autocomplete="off"
          />
        </a-form-item>
        
        <a-form-item
          ref="status"
          name="status"
          label="Status"
          class="mb-0"
        >
          <div class="flex flex-row">
            <a-switch v-model:checked="state.form.status" />
            <div class="ml-2 items-center justify-center">
              {{ state.form.status ? 'Aktif' : 'Tidak Aktif' }}
            </div>
          </div>
        </a-form-item>
      </div>
    </a-form>

    <contextHolder />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, reactive, toRaw, computed, watch } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { notification } from 'ant-design-vue';
import { useRoute } from 'vue-router';

import { useUserStore } from '@stores/user';

import { sleep } from '@/utils/app';
import { successHandler } from '@/utils/response';

import type { Emitter } from '@interfaces/app';
import type { IUser } from '@/interfaces/user';
import { FORM_CREATE, FORM_UPDATE } from '@configurations/constants';

import type { IStateFormUser, IPropsFormUser } from './model';
import {
  validateFullname,
  validateEmail,
  validateAgeNumber
} from './validation';

const props = withDefaults(defineProps<IPropsFormUser>(), {
  typeForm: 'create'
});

const route = useRoute();
const userStore = useUserStore();

const emitter = inject<Emitter>('$emitter') as Emitter;

const state = reactive<IStateFormUser>({
  selectedRowId: 0,
  layout: 'vertical',
  form: {
    fullname: '',
    email: '',
    age: '',
    status: false
  }
});

const formRef = ref<any>(null);

// ///////////////////////////////////////

const rules: Record<string, Rule[]> = {
  fullname: [
    {
      required: true,
      validator: validateFullname,
      trigger: 'change'
    }
  ],
  email: [
    {
      required: true,
      type: 'email',
      validator: validateEmail,
      trigger: 'change'
    }
  ],
  age: [
    {
      required: true,
      validator: validateAgeNumber,
      trigger: 'change'
    }
  ]
};

// ///////////////////////////////////////

const onHandleResetFormValidation = () => {
  formRef.value.resetFields();
};

const onHandleResetStateForm = () => {
  state.form = {
    fullname: '',
    email: '',
    age: '',
    status: false
  };
};

// ///////////////////////////////////////

const [contextHolder] = notification.useNotification();

const onSubmitForm = async () => {
  await formRef.value.validate();

  const data = toRaw(state.form);

  if (props.typeForm === FORM_CREATE) {
    createUser(data);
  }
  else if (props.typeForm === FORM_UPDATE) {
    updateUser(data);
  }
};

onMounted(() => {
  emitter.on('user:submit-form', () => {
    onSubmitForm();
  });
});

// ////////////////////////////////////////

const getDetailUser = () => {
  const id = Number(route.params.userId) || Number(props.rowId);
  state.selectedRowId = id;

  const response = userStore.getUserById(id);

  if (response) {
    state.form.fullname = response.fullname;
    state.form.email = response.email;
    state.form.age = response.age;
    state.form.status = response.status;
  }
};

const createUser = (userData: IUser) => {
  const id = Math.ceil(Math.random() * 1000);

  userData = { id, ...userData };
  userStore.createUser(userData);

  successHandler('Data user berhasil ditambahkan');
  onHandleResetFormValidation();
  onHandleResetStateForm();

  userStore.setIsVisibleFormModal(false);

  emitter.emit('user:initialize-list', true);
};

const updateUser = (userData: IUser) => {
  const id = state.selectedRowId;

  userData = { id, ...userData };
  userStore.updateUser(userData);

  successHandler('Data user berhasil diupdate');
  onHandleResetFormValidation();
  onHandleResetStateForm();

  userStore.setIsVisibleFormModal(false);

  emitter.emit('user:initialize-list', true);
};

// ////////////////////////////////////////

const getIsVisibleFormModal = computed(() => userStore.getIsVisibleFormModal);

setTimeout(async () => {
  await sleep(1000);

  if (props.typeForm === FORM_UPDATE) {
    getDetailUser();
  }
}, 500);

watch(getIsVisibleFormModal, async (newValue) => {
  if (newValue) {
    await sleep(1000);

    if (props.typeForm === FORM_UPDATE) {
      getDetailUser();
    }
  }
  else {
    onHandleResetFormValidation();
    onHandleResetStateForm();
  }
});

// ////////////////////////////////////////

</script>
