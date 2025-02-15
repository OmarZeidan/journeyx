<script setup lang="ts">
import FormInput from "./Form/FormInput.vue";
import FormLabel from "./Form/FormLabel.vue";

interface Props {
  fieldId?: string;
}
defineProps<Props>();

const model = defineModel<string>();
</script>

<template>
  <FormLabel :html-for="fieldId" text="Search" class="sr-only" />

  <div class="relative">
    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg
        class="w-4 h-4 text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>

    <FormInput v-model="model" type="search" :id="fieldId" placeholder="Search" class="ps-10 p-4" />
  </div>
</template>
