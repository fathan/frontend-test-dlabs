<!-- eslint-disable max-len -->
<template>
  <section class="bg-[#33529b]">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div class="mx-auto max-w-screen-sm text-center">
        <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-white">
          404
        </h1>
        
        <p class="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl">
          Something's missing.
        </p>
        
        <p class="mb-4 text-lg font-light text-white">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p>

        <div class="w-5/12 m-auto table">
          <router-link
            :to="{
              path: '/'
            }"
          >
            <AtomButton
              label="Back to Homepage"
              variant="primary"
              size="md"
              class="mt-4"
              rounded
              full
            />
          </router-link>
        </div>
      </div>   
    </div>
  </section>
</template>