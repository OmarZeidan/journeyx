<script setup lang="ts">
import BaseHero from "./components/BaseHero.vue";
import DriversList from "./components/DriversList.vue";
import IconLogo from "./components/icons/IconLogo.vue";
import ToursList from "./components/ToursList.vue";
</script>

<template>
  <header>
    <div class="container mx-auto flex p-5 items-center">
      <a href="/" class="flex items-center text-indigo-500">
        <IconLogo />
        <span class="ml-2 text-xl text-gray-900">
          Journey
          <span class="font-black -ml-1 text-2xl"> X</span>
        </span>
      </a>
    </div>
  </header>

  <BaseHero />

  <section class="flex gap-3 container mx-auto flex-col lg:flex-row" id="lists-section">
    <DriversList />
    <ToursList />
  </section>

  <footer class="bg-white shadow-sm dark:bg-gray-800 mt-50">
    <div class="w-full mx-auto max-w-screen-xl p-4">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Made with 💜 by Omar Zeidan.
      </span>
    </div>
  </footer>
</template>
