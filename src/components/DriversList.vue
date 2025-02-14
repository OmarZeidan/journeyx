<script setup lang="ts">
import { useConvexMutation, useConvexQuery } from "@convex-vue/core";
import { api } from "@cvx/_generated/api";
import BaseAvatar from "./BaseAvatar.vue";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import ListCard from "./ListCard.vue";
import { useDialog } from "@/composables/useDialog";
import type { Doc } from "@cvx/_generated/dataModel";
import { reactive, ref } from "vue";
import BaseDrawer from "./BaseDrawer.vue";
import ListEmptyState from "./ListEmptyState.vue";
import ManageDriverForm from "./DriverForm.vue";

const { openDialog, closeDialog, handleConfirm, isDialogOpen } = useDialog();

const { data, isLoading, error } = useConvexQuery(api.drivers.get, {});
const { mutate: removeDriver } = useConvexMutation(api.drivers.deleteDriver);

let selectedDriver = reactive<Doc<"drivers">>({} as Doc<"drivers">);

const isDrawerOpen = ref(false);

const onToggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const onAddNewButtonClick = () => {
  selectedDriver = {} as Doc<"drivers">;
  onToggleDrawer();
};
const onEditButtonClick = (driverToEdit: Doc<"drivers">) => {
  selectedDriver = driverToEdit;
  onToggleDrawer();
};
const onDeleteButtonClick = (drivetToDelete: Doc<"drivers">) => {
  selectedDriver = drivetToDelete;
  openDialog();
};
</script>

<template>
  <BaseDrawer v-model:isOpen="isDrawerOpen" position="right">
    <template #drawer-title> Manage Driver</template>
    <template #drawer-content>
      <ManageDriverForm
        :driver="selectedDriver"
        @close="onToggleDrawer"
        :is-active="isDrawerOpen"
      />
    </template>
  </BaseDrawer>

  <BaseDialog
    :isOpen="isDialogOpen"
    title="Deleting a driver"
    description="Are you sure?"
    @close="closeDialog"
    @confirm="
      {
        removeDriver({ id: selectedDriver._id });
        handleConfirm();
      }
    "
  />

  <ListCard title="Driver's List">
    <template #listCard-cta>
      <BaseButton variant="primary" @click="onAddNewButtonClick">+ Add New </BaseButton>
    </template>
    <p v-if="isLoading">Loading ...</p>

    <ul v-else-if="data.length" role="list" class="divide-y divide-gray-200">
      <li v-for="driver in data" :key="driver._id" class="py-3 sm:py-4">
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

    <h4 v-else-if="error" class="text-2xl text-center">Something went wrong!</h4>
    <ListEmptyState v-else>
      <template #empty-state-description>
        Make sure to clear search terms or add a new driver.
      </template>
    </ListEmptyState>
  </ListCard>
</template>
