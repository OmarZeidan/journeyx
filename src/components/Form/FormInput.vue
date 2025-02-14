<script setup lang="ts">
import { useAttrs } from "vue";

// NOTE: Using Partial<HTMLInputElement> won't satisfy this.
type InputAttrs = {
  type?: string;
  id?: string;
  placeholder?: string;
  error?: string;
};

/**
 * For 3.4+ version of vue, found this easier way of handling v-model in custom components
 * @see https://vuejs.org/api/sfc-script-setup.html#definemodel
 */
const model = defineModel<string>();
const attrs = useAttrs() as InputAttrs;
</script>

<template>
  <input
    type="text"
    v-bind="attrs"
    v-model="model"
    :class="[
      'bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block focus:bg-white w-full p-2.5',
      { 'border-red-500': attrs.error },
    ]"
  />
  <p v-if="attrs.error" class="mt-2 text-sm text-red-600" data-test="input-error">
    {{ attrs.error }}
  </p>
</template>
