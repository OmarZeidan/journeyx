<script setup lang="ts">
import BaseButton from "./BaseButton.vue"
</script>
<template>
  <section class="text-gray-600">
    <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div
        class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center"
      >
        <h1 class="sm:text-5xl text-4xl mb-4 font-extrabold text-gray-900">
          Sync, Manage, and Grow <br class="hidden lg:inline-block" />Your Tours Effortlessly!
        </h1>
        <p class="mb-8 leading-relaxed font-light">
          Seamlessly organize tours, assign drivers with ease, and ensure perfect location matching.
          Simplify your workflow and keep everything in sync!🚀
        </p>
        <div class="flex justify-center gap-3">
          <BaseButton> New Tour </BaseButton>
          <BaseButton variant="secondary"> New Driver </BaseButton>
        </div>
      </div>
      <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img
          class="object-cover object-center rounded"
          alt="hero-image-journeyX"
          src="../assets/rolling.svg"
        />
      </div>
    </div>
  </section>
</template>
