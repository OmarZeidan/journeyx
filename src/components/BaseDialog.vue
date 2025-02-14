<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import BaseButton from "./BaseButton.vue";

interface Props {
  isOpen: boolean;
  title: string;
  description?: string;
}
const props = withDefaults(defineProps<Props>(), {
  title: "Dialog",
});

const emit = defineEmits(["close", "confirm"]);

const closeDialog = () => {
  emit("close");
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.isOpen) {
    closeDialog();
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
  <div v-if="isOpen" class="relative z-10" data-test="dialog-wrapper">
    <div class="fixed inset-0 bg-black/25 z-40" />

    <div class="fixed inset-0 overflow-y-auto z-50" @click="closeDialog">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <div
          class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          @click.stop
        >
          <h3 class="text-lg font-medium leading-6 text-gray-900" data-test="dialog-title">
            {{ title }}
          </h3>
          <div class="mt-2">
            <p v-if="description" class="text-sm text-gray-500" data-test="dialog-description">
              {{ description }}
            </p>

            <div class="flex justify-end gap-2">
              <BaseButton size="sm" class="bg-red-500 hover:bg-red-700" @click="emit('confirm')">
                Confirm
              </BaseButton>
              <BaseButton size="sm" variant="secondary" @click="emit('close')"> Cancel </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
