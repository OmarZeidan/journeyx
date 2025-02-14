<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>
<template>
  <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8">
    <div class="flex items-center justify-between mb-4">
      <h5 class="text-xl font-bold leading-none text-gray-900">{{ title }}</h5>
      <div class="ml-2">
        <slot name="listCard-cta" />
      </div>
    </div>
    <slot />
  </div>
</template>
