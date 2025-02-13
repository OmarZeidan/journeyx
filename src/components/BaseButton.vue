<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary"
  /**
   * Whether the button should behave like a link to change cursor to pointer.
   * For now, this is only to add cursor-pointer, however, this can be further improved to render a link with href.
   * @default false
   */
  asLink?: boolean
  size?: "sm" | "base" | "lg"
}
withDefaults(defineProps<Props>(), { variant: "primary", size: "base" })
</script>

<template>
  <button
    :class="[
      variant === 'primary'
        ? 'text-white bg-indigo-500 hover:bg-indigo-600'
        : 'text-gray-700 bg-gray-100  hover:bg-gray-200 ',
      asLink && 'cursor-pointer',
      size === 'lg'
        ? 'py-2 px-6 text-lg'
        : size === 'sm'
          ? 'px-3 py-2 text-xs'
          : 'py-2 px-4 text-base',
      'border-0 focus:outline-none rounded cursor-pointer',
    ]"
    :aria-label="asLink ? 'Link button' : 'Button'"
    type="button"
  >
    <slot />
  </button>
</template>
