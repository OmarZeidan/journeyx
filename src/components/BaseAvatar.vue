<script setup lang="ts">
import { computed } from "vue";

interface Props {
  givenName: string;
}
const props = defineProps<Props>();

const initials = computed(() => {
  if (!props.givenName) return "NA";
  return props.givenName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
});
</script>
<template>
  <div
    class="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-300 rounded-full"
  >
    <span class="font-medium text-gray-600">
      {{ initials }}
    </span>
  </div>
</template>
