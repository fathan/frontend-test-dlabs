<template>
  <div>
    <MoleculeBreadcrumbs
      :base-path="'/admin/user'"
      :breadcrumb-data="state.breadcrumbs"
    />

    <!-- ----------------------------------- -->

    <MoleculeTitlePageActionTop
      title="User"
      subtitle="GET Simple data from API Users Github"
    />

    <!-- ----------------------------------- -->

    <div class="mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
        <template v-if="state.rows.length > 0">
          <MoleculeCardGithub
            v-for="user in state.rows"
            :id="user.id"
            :key="user.id"
            :avatar_url="user.avatar_url"
            :login="user.login"
            :type="user.type"
            :html_url="user.html_url"
          />
        </template>
        <template v-if="state.isLoading">
          <MoleculeSkeletonLoaderCard
            v-for="i in 18"
            :key="i"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';

import type { IBreadcrumbData } from '@/components/Molecules/MoleculeBreadcrumbs/model';

import UserService from '@/services/user';

import { sleep } from '@/utils/app';
import { errorHandler } from '@/utils/response';

import MoleculeSkeletonLoaderCard from '@/components/Molecules/MoleculeSkeletonLoaderCard';

interface IState {
  breadcrumbs: IBreadcrumbData[];
  rows: any;
  isLoading: boolean;
  selectedRowId?: number | string;
}

const state = reactive<IState>({
  selectedRowId: '',
  breadcrumbs: [
    {
      path: '',
      breadcrumbName: 'User'
    }
  ],
  rows: [],
  isLoading: false
});

// ///////////////////////////////////

const xhrGetList = async () => {
  state.isLoading = true;
  await sleep(2000);

  try {
    const response = await UserService.users();
    state.rows = response;
  }
  catch (error: any) {
    errorHandler(error.message);
  }
  finally {
    state.isLoading = false;
  }
};

const initialize = () : void => {
  state.rows = [];
  xhrGetList();
};

onMounted(() => {
  initialize();
});

</script>
