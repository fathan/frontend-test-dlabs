<template>
  <div>
    <div class="flex justify-between items-center">
      <h5 class="text-[1.2rem] font-semibold">
        Welcome, Fathan Rohman
      </h5>

      <a-form
        name="horizontal_login"
        layout="inline"
        autocomplete="off"
        class="w-[18%]"
      >
        <a-form-item
          class="w-full"
          name="searchKey"
        >
          <a-input placeholder="Search">
            <template #prefix>
              <SearchOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
      </a-form>
    </div>

    <div class="mt-10">
      <a-alert
        message="Informasi"
        description="Frontend Developer Techinal Test at PT Dlabs Indonesia Infotech"
        type="info"
        show-icon
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
</script>