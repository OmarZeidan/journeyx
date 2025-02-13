<script setup lang="ts">
import IconLogo from './components/icons/IconLogo.vue'
</script>

<template>
  <header>
    <div class="container mx-auto flex p-5 items-center">
      <a href="/" class="flex items-center text-indigo-500">
        <IconLogo />
        <span class="ml-2 text-xl text-gray-900">Journey X</span>
      </a>
    </div>
  </header>

  <footer class="bg-white shadow-sm dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        Made with 💜 by Omar Zeidan.
      </span>
    </div>
  </footer>
</template>
