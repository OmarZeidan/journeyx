<script setup lang="ts">
import { useTourForm } from "@/composables/useTourForm";
import { useTourMutation } from "@/composables/useTourMutation";
import { useUtils } from "@/composables/useUtils";
import type { Doc } from "@cvx/_generated/dataModel";
import { computed, onBeforeUnmount, watch } from "vue";
import BaseButton from "./BaseButton.vue";
import FormInput from "./Form/FormInput.vue";
import FormLabel from "./Form/FormLabel.vue";
import { CITIES } from "@/constants";

interface Props {
  tour?: Doc<"tours">;
  drivers: Array<Doc<"drivers">>;
}
const props = defineProps<Props>();
const emit = defineEmits(["close"]);

const { form, errors, validateForm } = useTourForm(props.drivers);
const { onAddNewTour, onUpdateTour, isAddTourLoading, isUpdateTourLoading } = useTourMutation();
const { resetObject } = useUtils();

const handleFormSubmit = async () => {
  if (validateForm()) {
    try {
      await (props.tour?._id ? onUpdateTour({ _id: props.tour._id, ...form }) : onAddNewTour(form));
      // TODO: Add toast or success message
      emit("close");
    } catch (error) {
      console.error(`Error ${props.tour?._id ? "updating" : "adding"} tour:`, error);
    }
  }
};

const submitButtonText = computed(() => {
  if (isAddTourLoading.value || isUpdateTourLoading.value) return "Loading ...";
  return !!props.tour?._id ? "Update Now" : "Add Now";
});

watch(
  () => props.tour,
  (newTour) => {
    form.customerName = newTour?.customerName || "";
    form.location_from = newTour?.location_from || "";
    form.location_to = newTour?.location_to || "";
    form.date = newTour?.date || "";
    form.driver = newTour?.driver || "";
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (!props.tour?._id) {
    resetObject(form);
  } else {
    resetObject(errors);
  }
});
</script>

<template>
  <form @submit.prevent="handleFormSubmit" name="manageTourForm" class="max-w-sm mx-auto space-y-4">
    <div>
      <FormLabel html-for="customerName" text="Customer Name" />
      <FormInput
        type="name"
        id="customerName"
        v-model="form.customerName"
        placeholder="My Awesome Company"
        :error="errors.customerName"
      />
    </div>

    <div class="flex gap-2">
      <div class="flex-1">
        <FormLabel html-for="locationFrom" text="Location From" />
        <select
          id="locationFrom"
          v-model="form.location_from"
          class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block focus:bg-white w-full p-2.5"
          :class="{ 'border-red-500': errors.location_from }"
        >
          <option value="" disabled>Select a city</option>
          <option v-for="city in CITIES" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
        <p
          v-if="errors.location_from"
          class="mt-2 text-sm text-red-600"
          data-test="location-from-error"
        >
          {{ errors.location_from }}
        </p>
      </div>
      <div class="flex-1">
        <FormLabel html-for="locationTo" text="Location To" />
        <select
          id="locationTo"
          v-model="form.location_to"
          class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block focus:bg-white w-full p-2.5"
          :class="{ 'border-red-500': errors.location_to }"
        >
          <option value="" disabled>Select a city</option>
          <option v-for="city in CITIES" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
        <p
          v-if="errors.location_to"
          class="mt-2 text-sm text-red-600"
          data-test="location-from-error"
        >
          {{ errors.location_to }}
        </p>
      </div>
    </div>

    <div>
      <FormLabel htmlFor="date" text="Date" />
      <FormInput type="date" id="date" v-model="form.date" :error="errors.date" />
    </div>

    <div>
      <FormLabel html-for="driver" text="Driver" />

      <select
        id="driver"
        v-model="form.driver"
        class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block focus:bg-white w-full p-2.5"
        :class="{ 'border-red-500': errors.driver }"
      >
        <option value="" disabled>Assign a driver</option>
        <option v-for="driver in drivers" :key="driver._id" :value="driver._id">
          {{ driver.name }} - {{ driver.location }}
        </option>
      </select>
      <p v-if="errors.driver" class="mt-2 text-sm text-red-600">{{ errors.driver }}</p>
    </div>

    <BaseButton class="w-full" type="submit" :disabled="isAddTourLoading || isUpdateTourLoading">
      {{ submitButtonText }}
    </BaseButton>
  </form>
</template>
