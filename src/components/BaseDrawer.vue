<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import BaseButton from "./BaseButton.vue";

interface Props {
  isOpen: boolean;
  position?: "left" | "right";
  width?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: "left",
  width: 420,
});

const emit = defineEmits(["update:isOpen"]);

const isOpen = ref(props.isOpen);
watch(
  () => props.isOpen,
  (newVal) => {
    isOpen.value = newVal;
  },
);

const closeDrawer = () => {
  isOpen.value = false;
  emit("update:isOpen", false);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isOpen) {
    closeDrawer();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div>
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black opacity-75 z-40"
      @click="closeDrawer"
      data-test="drawer-overlay"
    ></div>

    <div
      :class="[
        'fixed top-0 h-full bg-white shadow-lg z-50 transition-transform duration-300',
        position === 'left' ? 'left-0' : 'right-0',
        isOpen ? 'translate-x-0' : position === 'left' ? '-translate-x-full' : 'translate-x-full',
      ]"
      :style="{ width: `${width}px` }"
      role="dialog"
    >
      <BaseButton
        class="absolute top-4 right-4"
        @click="closeDrawer"
        variant="secondary"
        size="icon"
        data-test="button-close-drawer"
      >
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          ></path>
        </svg>
        <span class="sr-only">Close</span>
      </BaseButton>

      <div class="p-6">
        <h2 class="text-xl font-bold mb-1"><slot name="drawer-title">Drawer Title</slot></h2>

        <div class="mt-4">
          <slot name="drawer-content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
