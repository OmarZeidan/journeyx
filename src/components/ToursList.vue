<script setup lang="ts">
import { useDialog } from "@/composables/useDialog";
import { useDriver } from "@/composables/useDriver";
import { useConvexMutation, useConvexQuery } from "@convex-vue/core";
import { api } from "@cvx/_generated/api";
import type { Doc } from "@cvx/_generated/dataModel";
import { computed, reactive, ref } from "vue";
import BaseAvatar from "./BaseAvatar.vue";
import BaseButton from "./BaseButton.vue";
import BaseDialog from "./BaseDialog.vue";
import BaseDrawer from "./BaseDrawer.vue";
import InputSearch from "./InputSearch.vue";
import ListCard from "./ListCard.vue";
import ListEmptyState from "./ListEmptyState.vue";
import TourForm from "./TourForm.vue";

const { openDialog, closeDialog, handleConfirm, isDialogOpen } = useDialog();

const { data, isLoading, error } = useConvexQuery(api.tours.get, {});
const { mutate: removeTour } = useConvexMutation(api.tours.deleteTour);
const { drivers } = useDriver();

let selectedTour = reactive<Doc<"tours">>({} as Doc<"tours">);

const isDrawerOpen = ref(false);

const onToggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const onAddNewButtonClick = () => {
  selectedTour = {} as Doc<"tours">;
  onToggleDrawer();
};
const onEditButtonClick = (tourToEdit: Doc<"tours">) => {
  selectedTour = tourToEdit;
  onToggleDrawer();
};
const onDeleteButtonClick = (tourToDelete: Doc<"tours">) => {
  selectedTour = tourToDelete;
  openDialog();
};

const searchQuery = ref("");
const filteredTours = computed(() => {
  return data.value.filter((tour) => {
    const matchesSearchQuery = tour.customerName
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    return matchesSearchQuery;
  });
});
</script>

<template>
  <BaseDrawer v-model:isOpen="isDrawerOpen" position="right">
    <template #drawer-title> Manage Tour </template>
    <template #drawer-content>
      <TourForm
        v-if="isDrawerOpen"
        :drivers="drivers"
        :tour="selectedTour"
        @close="onToggleDrawer"
      />
    </template>
  </BaseDrawer>

  <BaseDialog
    :isOpen="isDialogOpen"
    title="Deleting a tour"
    description="Are you sure?"
    @close="closeDialog"
    @confirm="
      {
        removeTour({ id: selectedTour._id });
        handleConfirm();
      }
    "
  />

  <ListCard title="Tours List">
    <template #listCard-cta>
      <BaseButton variant="primary" @click="onAddNewButtonClick">+ Add New </BaseButton>
    </template>
    <template #search-input>
      <InputSearch fieldId="search-tours" v-model="searchQuery" />
    </template>
    <p v-if="isLoading">Loading ...</p>

    <ul v-else-if="filteredTours.length" role="list" class="divide-y divide-gray-200">
      <li v-for="tour in filteredTours" :key="tour._id" class="py-3 sm:py-4">
        <div class="flex items-center">
          <div class="shrink-0">
            <BaseAvatar :given-name="tour.customerName" />
          </div>
          <div class="flex-1 min-w-0 ms-4">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ tour.customerName }}
            </p>
            <p class="text-sm text-gray-500 truncate 0">
              {{ tour.location_from }}
            </p>
          </div>
          <div class="flex gap-1">
            <BaseButton size="sm" @click="onEditButtonClick(tour)"> Edit </BaseButton>
            <BaseButton size="sm" variant="danger" @click="onDeleteButtonClick(tour)">
              Delete
            </BaseButton>
          </div>
        </div>
      </li>
    </ul>

    <h4 v-else-if="error" class="text-2xl text-center">Something went wrong!</h4>
    <ListEmptyState v-else @on-clear-search="searchQuery = ''" @on-add="onToggleDrawer">
      <template #empty-state-description>
        Make sure to clear search terms or add a new tour.
      </template>
    </ListEmptyState>
  </ListCard>
</template>
