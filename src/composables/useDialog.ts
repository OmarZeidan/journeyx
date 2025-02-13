import { ref } from "vue";

export function useDialog() {
  const isDialogOpen = ref(false);

  const openDialog = () => {
    isDialogOpen.value = true;
  };

  const closeDialog = () => {
    isDialogOpen.value = false;
  };
  const handleConfirm = () => {
    closeDialog();
  };

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
    handleConfirm,
  };
}
