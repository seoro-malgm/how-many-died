<template>
  <UApp>
    <div
      class="w-full flex flex-col items-stretch justify-stretch h-screen gap-0 bg-primary-900"
    >
      <header
        class="py-9 text-center container mx-auto fixed top-0 left-1/2 -translate-x-1/2 mix-blend-difference"
      >
        <div class="flex items-center justify-center container mx-auto">
          <h1
            class="text-center text-3xl lg:text-5xl leading-none text-primary-100 mix-blend-difference text-pretty"
          >
            <nuxt-link to="/">
              비극은 사건 때문이 아니라, 그것을 지켜보는 자들의 무관심으로
              완성된다
            </nuxt-link>
          </h1>
        </div>
      </header>
      <NuxtPage />
    </div>
  </UApp>
</template>

<script setup>
const props = defineProps({
  data: {
    type: String,
    default: null,
  },
});
const emit = defineEmits();
</script>

<style lang="postcss" scoped></style>
