<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>
<template>
  <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
    <div class="flex items-center mb-4">
      <h5 class="flex-1 text-xl font-bold leading-none text-gray-900">{{ title }}</h5>
      <slot name="listCard-cta" />
    </div>
    <slot />
  </div>
</template>
