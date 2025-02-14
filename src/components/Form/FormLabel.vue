<script setup lang="ts">
interface Props {
  text: string;
  htmlFor?: string;
}

defineProps<Props>();
</script>

<template>
  <label :for="htmlFor" class="block mb-2 text-sm font-medium text-gray-900">{{ text }}</label>
</template>
