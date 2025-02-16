import { ref } from "vue";

export function useToggle(value = false) {
  const isOpen = ref(value);
  const toggle = () => (isOpen.value = !isOpen.value);
  return { isOpen, toggle };
}
