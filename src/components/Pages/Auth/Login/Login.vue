<!-- eslint-disable max-len -->
<template>
  <main class="relative overflow-hidden w-full">
    <div class="flex flex-wrap min-h-screen w-full content-center justify-center py-10 z-9999">
      <div class="flex flex-col gap-8">
        <div class="flex flex-col items-center justify-center">
          <div class="mb-4">
            <img src="https://dlabs.id/assets/logo/logo-1.png" style="width: 200px;">
          </div>
          <div class="text-3xl font-bold text-white mb-4">
            Login
          </div>
          <div class="text-sm text-white">
            Masuk ke akun Anda
          </div>
        </div>

        <a-form
          ref="formRef"
          :layout="state.layout"
          :model="state"
          :rules="rules"
          class="flex flex-wrap content-center justify-center rounded-lg bg-white shadow-md p-8 z-9999"
        >
          <div class="flex flex-col gap-2 w-80">
            <a-form-item
              ref="username"
              name="username"
              label="Username"
              class="mb-0"
            >
              <a-input
                v-model:value="state.username"
                placeholder="Masukan Username Anda"
                autocomplete="off"
              />
            </a-form-item>
            <a-form-item
              ref="password"
              name="password"
              label="Password"
              class="mb-0"
            >
              <a-input-password
                v-model:value="state.password"
                placeholder="Masukan Password Akun Anda"
                autocomplete="off"
              >
                <template #prefix>
                  <LockOutlined class="site-form-item-icon" />
                </template>
              </a-input-password>
            </a-form-item>

            <div class="flex flex-row justify-between mt-4">
              <div>
                <a-checkbox v-model:checked="rememberMe">
                  <span class="text-sm">
                    Remember me
                  </span>
                </a-checkbox>
              </div>
              <div>
                <a
                  href="#"
                  class="text-[#33529b] text-sm"
                >
                  Forgot Password
                </a>
              </div>
            </div>

            <AtomButton
              label="Login"
              variant="primary"
              size="md"
              class="mt-4"
              rounded
              full
              :is-loading="state.isLoading"
              :disabled="state.isLoading"
              @click="onSubmit()"
            />
          </div>
        </a-form>

        <div class="text-center hidden">
          Do not have an account? 
          <a
            href="#"
            class="text-[#33529b] text-sm"
          >
            Register
          </a>
        </div>
      </div>
    </div>

    <contextHolder />
  </main>
</template>

<script lang="ts" setup>
import { ref, reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import { LockOutlined } from '@ant-design/icons-vue';
import { notification } from 'ant-design-vue';
import { useRouter } from 'vue-router';

import { sleep } from '@utils/app';

import AuthServices from '@services/auth';
import { useAuthStore } from '@stores/auth';

interface IForm {
  layout: string;
  username: string;
  password:  string;
  isLoading: boolean;
}

interface INotification {
  type: 'success' | 'failed';
  content: string
}

// ////////////////////////////////////////////////////

const authStore = useAuthStore();
const router = useRouter();

// ////////////////////////////////////////////////////

const state: UnwrapRef<IForm> = reactive({
  layout: 'vertical',
  username: 'emilys',
  password: 'emilyspass',
  isLoading: false
});

const formRef = ref();
const rememberMe = ref<boolean>(true);

// ////////////////////////////////////////////////////

const validateUsername = (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Kolom username wajib diisi');
  }
  else {
    return Promise.resolve();
  }
};

const validatePassword = (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Kolom password wajib diisi');
  }
  else {
    if (state.password.length < 6) {
      return Promise.reject('Password minimal terdiri dari 6 karakter');
    }

    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: validateUsername,
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: 'change'
    }
  ]
};

// ////////////////////////////////////////////////////

const [
  api, contextHolder
] = notification.useNotification();

const openNotification = (param: INotification) => {
  if (param.type === 'success') {
    api.info({
      message: '',
      description: param.content,
      placement: 'bottomRight'
    });
  }
  else if (param.type === 'failed') {
    api.error({
      message: '',
      description: param.content,
      placement: 'bottomRight'
    });
  }
};

const onSubmit = async () => {
  try {
    await formRef.value.validate();

    const data = toRaw(state);

    state.isLoading = true;

    const response = await AuthServices.login({
      username: data.username,
      password: data.password
    });

    console.log(response);

    openNotification({
      type: 'success',
      content: 'Berhasil masuk ke akun anda'
    });

    await sleep(2000);

    authStore.setAccessToken(`${ response.data.accessToken }`);
    authStore.setIsAuthenticated(true);

    router.push({
      path: '/admin/dashboard'
    });
  }
  catch (error: any) {
    console.log('error', error);
  }
  finally {
    state.isLoading = false;
  }
};

</script>
