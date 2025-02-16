<script setup lang="ts">
import { useDriverForm } from "@/composables/useDriverForm";
import { useDriverMutation } from "@/composables/useDriverMutation";
import { useUtils } from "@/composables/useUtils";
import type { Doc } from "@cvx/_generated/dataModel";
import { computed, onBeforeUnmount, watch } from "vue";
import BaseButton from "./BaseButton.vue";
import FormInput from "./Form/FormInput.vue";
import FormLabel from "./Form/FormLabel.vue";

interface Props {
  driver?: Doc<"drivers">;
}
const props = defineProps<Props>();
const emit = defineEmits(["close"]);

const { form, errors, validateForm } = useDriverForm();
const { submitManageDriver, isAddDriverLoading, isUpdateDriverLoading } = useDriverMutation();
const { resetObject } = useUtils();

const handleFormSubmit = async () => {
  if (validateForm()) {
    try {
      await (props.driver?._id ? submitManageDriver(form, props.driver) : submitManageDriver(form));
      // TODO: Add toast or success message
      emit("close");
    } catch (error) {
      console.error(`Error ${props.driver?._id ? "updating" : "adding"} driver:`, error);
      alert("An error occurred. Please try again.");
    }
  }
};

const submitButtonText = computed(() => {
  if (isAddDriverLoading.value || isUpdateDriverLoading.value) return "Loading ...";
  return !!props.driver?._id ? "Update Now" : "Add Now";
});

watch(
  // Watching passed-in driver
  // if exists and updated, we update the form data to reflect the new driver to edit.
  () => props.driver,
  (newDriver) => {
    form.name = newDriver?.name || "";
    form.location = newDriver?.location || "";
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (!props.driver?._id) {
    resetObject(form);
  } else {
    resetObject(errors);
  }
});
</script>

<template>
  <form
    @submit.prevent="handleFormSubmit"
    name="manageDriverForm"
    class="max-w-sm mx-auto space-y-4"
  >
    <div>
      <FormLabel html-for="fullName" text="Full Name" />
      <FormInput
        id="fullName"
        placeholder="John Maxwell"
        v-model="form.name"
        :error="errors.name"
      />
    </div>

    <div data-test="location-input">
      <FormLabel html-for="location" text="Location" />
      <FormInput
        id="location"
        placeholder="Berlin"
        v-model="form.location"
        :error="errors.location"
      />
    </div>

    <BaseButton
      class="w-full"
      type="submit"
      :disabled="isAddDriverLoading || isUpdateDriverLoading"
    >
      {{ submitButtonText }}
    </BaseButton>
  </form>
</template>
