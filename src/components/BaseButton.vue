<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "secondary" | "danger";
  /**
   * Whether the button should behave like a link to change cursor to pointer.
   * For now, this is only to add cursor-pointer, however, this can be further improved to render a link with href.
   * @default false
   */
  asLink?: boolean;
  size?: "sm" | "base" | "lg" | "icon";
}
const props = withDefaults(defineProps<Props>(), { variant: "primary", size: "base" });

const buttonClasses = computed(() => {
  return {
    "text-white bg-indigo-500 hover:bg-indigo-600": props.variant === "primary",
    "text-gray-700 bg-gray-100 hover:bg-gray-200": props.variant === "secondary",
    "text-white bg-red-500 hover:bg-red-600": props.variant === "danger",
    "px-3 py-2 text-xs": props.size === "sm",
    "px-4 py-2": props.size === "base",
    "px-6 py-3 text-lg": props.size === "lg",
    "text-xs px-2 py-2 bg-white hover:bg-gray-50": props.size === "icon",
    "border-0 focus:outline-none rounded cursor-pointer text-base disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500":
      true,
  };
});
</script>

<template>
  <button :class="buttonClasses" :aria-label="asLink ? 'Link button' : 'Button'" type="button">
    <slot />
  </button>
</template>
