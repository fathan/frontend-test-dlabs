<template>
  <td class="px-6 py-3">&nbsp;</td>
  <td class="px-6 py-3">&nbsp;</td>
  <td class="px-6 py-3">&nbsp;</td>
  <td class="px-6 py-3">
    <a-input-group compact>
      <a-select
        v-model:value="state.search.status"
        class="w-full"
        placeholder="Search By Status"
      >
        <a-select-option value="1">Active</a-select-option>
        <a-select-option value="0">Inactive</a-select-option>
      </a-select>
    </a-input-group>
  </td>
  <td class="px-6 py-3 flex justify-center">
    <div class="flex gap-3">
      <a-button
        key="submit"
        type="primary"
        :loading="state.isLoadingSearching"
        @click="onHandleActionSearching()"
      >
        Search
      </a-button>
      <a-button
        key="back"
        @click="onHandleActionResetSearching()"
      >
        Reset
      </a-button>
    </div>
  </td>

  <contextHolder />
</template>

<script setup lang="ts">
import { reactive, defineEmits, toRaw, defineProps } from 'vue';
import { notification } from 'ant-design-vue';

interface IState {
  placeholderTypeOption1: string;
  placeholderTypeOption2: string;
  isLoadingSearching: boolean;
  search: {
    status: boolean;
  }
}

const emits = defineEmits([
  'on-action-search',
  'on-action-reset-search'
]);

defineProps({
  showCheckAll: {
    type: Boolean,
    default: false
  }
});

const state = reactive<IState>({
  isLoadingSearching: false,
  search: {
    is_active: undefined
  }
});

const [contextHolder] = notification.useNotification();

const onHandleResetSearching = () => {
  state.search = {
    is_active: undefined
  };
};

// ///////////////////////////////////

const onHandleActionSearching = () => {
  const data = toRaw(state.search);
  emits('on-action-search', data);
};

const onHandleActionResetSearching = () => {
  onHandleResetSearching();
  const data = toRaw(state.search);
  emits('on-action-reset-search', data);
};

</script>