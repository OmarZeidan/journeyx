import { ERROR_LOCATION_NUMBERS, REQUIRED_ERROR_TEMPLATE } from "@/constants";
import { reactive, watch } from "vue";
import { useUtils } from "./useUtils";

export function useDriverForm() {
  const ERROR_NAME_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Driver's Name");
  const ERROR_LOCATION_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Location");
  const { resetObject } = useUtils();

  const form = reactive({
    name: "",
    location: "",
  });

  const errors = reactive({
    name: "",
    location: "",
  });

  watch(
    () => form.location,
    (newLocation) => {
      if (/\d/.test(newLocation.trim())) {
        errors.location = ERROR_LOCATION_NUMBERS;
      } else {
        errors.location = "";
      }
    },
  );

  const validateForm = () => {
    resetObject(errors);

    if (!form.name.trim()) {
      errors.name = ERROR_NAME_REQUIRED;
    }

    if (!form.location.trim()) {
      errors.location = ERROR_LOCATION_REQUIRED;
    } else if (/\d/.test(form.location)) {
      errors.location = ERROR_LOCATION_NUMBERS;
    }

    return !errors.name && !errors.location;
  };

  return { form, errors, validateForm };
}
