<script setup lang="ts">
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(["onAdd", "onClearSearch"]);
</script>
<template>
  <div class="empty-state mt-10">
    <h2 class="text-center text-black text-lg font-semibold leading-7 pb-1" data-test="title">
      Nothing found!
    </h2>
    <p class="text-center text-gray-500 text-base font-normal leading-relaxed pb-4">
      <slot name="empty-state-description" />
    </p>
    <div class="flex gap-3">
      <BaseButton class="w-full" variant="secondary" @click="emit('onClearSearch')">
        Clear Search
      </BaseButton>
      <BaseButton class="w-full" @click="emit('onAdd')"> Add New </BaseButton>
    </div>
  </div>
</template>
