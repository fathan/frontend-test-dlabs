<template>
  <main class="w-[102.9%] 2xl:w-[102.05%] -ml-4">
    <div class="w-full relative bg-white">
      <div class="flex items-center gap-4 absolute left-[22px] w-[96.2%] 2xl:w-[97.2%]">
        <a-avatar
          :size="180"
          src="https://media.licdn.com/dms/image/v2/C5603AQG1CkaEcR-hOw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1617022748917?e=2147483647&v=beta&t=I_Csez9rNIiIg1ni2MZN7FlZvznF6FtdhUVNz6KMMg8"
          class="border-[5px] border-white shadow-lg"
        />
  
        <MoleculeTitlePageActionTop
          title="Fathan Rohman"
          subtitle="karir.fathan@gmail.com"
          :is-with-border-bottom="false"
          class="flex justify-between w-[90%] pt-10"
        >
          <template #badge-info>
            <div class="ml-3">
              <div class="border py-0 px-3 bg-white border-[#D0D5DD] rounded-md">
                <a-badge text="Aktif" status="success" />
              </div>
            </div>
          </template>
        </MoleculeTitlePageActionTop>
      </div>
    </div>
  </main>
</template>
  
<script setup lang="ts">
</script>