<script setup lang="ts">
import InputSearch from "./InputSearch.vue";

interface Props {
  title: string;
}

const model = defineModel<string>();

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
    <InputSearch v-model="model" />
    <slot />
  </div>
</template>
