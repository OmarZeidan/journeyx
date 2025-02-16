<script setup lang="ts">
import { useDriver } from "@/composables/useDriver";
import { useDriverMutation } from "@/composables/useDriverMutation";
import type { Doc } from "@cvx/_generated/dataModel";
import { computed, ref } from "vue";
import BaseAvatar from "./BaseAvatar.vue";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseDrawer from "./BaseDrawer.vue";
import DriverForm from "./DriverForm.vue";
import InputSearch from "./InputSearch.vue";
import ListCard from "./ListCard.vue";
import ListEmptyState from "./ListEmptyState.vue";
import { useToggle } from "@/composables/useToggle";

const { drivers, isDriversLoading, driversFetchError } = useDriver();
const { removeDriver } = useDriverMutation();
const selectedDriver = ref<Doc<"drivers">>({} as Doc<"drivers">);

const { isOpen: isDrawerOpen, toggle: toggleDrawer } = useToggle();
const { isOpen: isDialogOpen, toggle: toggleDialog } = useToggle();

const onAddNewButtonClick = () => {
  selectedDriver.value = {} as Doc<"drivers">;
  toggleDrawer();
};

const onEditButtonClick = (driverToEdit: Doc<"drivers">) => {
  selectedDriver.value = driverToEdit;
  toggleDrawer();
};

const onDeleteButtonClick = (drivetToDelete: Doc<"drivers">) => {
  selectedDriver.value = drivetToDelete;
  toggleDialog();
};

const searchQuery = ref("");
const filteredDrivers = computed(() => {
  return drivers.value.filter((driver) => {
    const matchesSearchQuery = driver.name.toLowerCase().includes(searchQuery.value.toLowerCase());

    return matchesSearchQuery;
  });
});
</script>

<template>
  <BaseDrawer v-model:isOpen="isDrawerOpen" position="right">
    <template #drawer-title> Manage Driver</template>
    <template #drawer-content>
      <DriverForm
        v-if="isDrawerOpen"
        :driver="selectedDriver"
        @close="toggleDrawer"
        :is-active="isDrawerOpen"
      />
    </template>
  </BaseDrawer>

  <BaseDialog
    v-if="isDialogOpen"
    :isOpen="isDialogOpen"
    title="Deleting a driver"
    description="Are you sure?"
    @close="toggleDialog"
    @confirm="
      {
        removeDriver({ id: selectedDriver._id });
        toggleDialog();
      }
    "
  />

  <ListCard title="Drivers List">
    <template #listCard-cta>
      <BaseButton variant="primary" @click="onAddNewButtonClick">+ Add New </BaseButton>
    </template>
    <template #search-input v-if="drivers?.length">
      <InputSearch v-model="searchQuery" />
    </template>

    <div role="status" class="mt-4 py-5 flex justify-center" v-if="isDriversLoading">
      <svg
        aria-hidden="true"
        class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>

    <ul v-else-if="filteredDrivers.length" role="list" class="divide-y divide-gray-200">
      <li v-for="driver in filteredDrivers" :key="driver._id" class="py-3 sm:py-4">
        <div class="flex items-center">
          <div class="shrink-0">
            <BaseAvatar :given-name="driver.name" />
          </div>
          <div class="flex-1 min-w-0 ms-4">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ driver.name }}
            </p>
            <p class="text-sm text-gray-500 truncate 0">
              {{ driver.location }}
            </p>
          </div>
          <div class="flex gap-1">
            <BaseButton size="sm" @click="onEditButtonClick(driver)"> Edit </BaseButton>
            <BaseButton size="sm" variant="danger" @click="onDeleteButtonClick(driver)">
              Delete
            </BaseButton>
          </div>
        </div>
      </li>
    </ul>

    <h4 v-else-if="driversFetchError" class="text-2xl text-center">Something went wrong!</h4>
    <ListEmptyState v-else @on-clear-search="searchQuery = ''" @on-add="onAddNewButtonClick">
      <template #empty-state-description>
        Make sure to clear search terms or add a new driver.
      </template>
      <template #clearSearchButton v-if="!!searchQuery" />
    </ListEmptyState>
  </ListCard>
</template>
