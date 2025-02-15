import {
  ERROR_DRIVER_REQUIRED,
  ERROR_LOCATION_MISMATCH,
  ERROR_LOCATION_NUMBERS,
  ERROR_REQUIRED_DATE,
  REQUIRED_ERROR_TEMPLATE,
} from "@/constants";
import { computed, reactive, watch } from "vue";
import { useUtils } from "./useUtils";
import type { Doc } from "@cvx/_generated/dataModel";

export function useTourForm(drivers: Array<Doc<"drivers">>) {
  const { resetObject } = useUtils();

  const ERROR_NAME_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Customer Name");
  const ERROR_LOCATION_FROM_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Location From");
  const ERROR_LOCATION_TO_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Location To");

  const form = reactive({
    name: "",
    location_from: "",
    location_to: "",
    date: "",
    driver: "",
  });

  const errors = reactive({
    name: "",
    location_from: "",
    location_to: "",
    date: "",
    driver: "",
  });

  const driver = computed(() => drivers.filter((driver) => driver._id === form.driver));

  watch(
    () => [form.location_from, form.location_to],
    ([newLocationFrom, newLocationTo]) => {
      if (driver.value.length > 0) {
        if (driver.value[0].location !== form.location_from) {
          errors.location_from = ERROR_LOCATION_MISMATCH;
          return;
        }
      }

      if (/\d/.test(newLocationFrom.trim())) {
        errors.location_from = ERROR_LOCATION_NUMBERS;
        return;
      }

      if (/\d/.test(newLocationTo.trim())) {
        errors.location_to = ERROR_LOCATION_NUMBERS;
        return;
      }

      errors.location_from = "";
      errors.location_to = "";
      errors.driver = "";
    },
  );

  watch(
    () => form.driver,
    () => {
      if (
        form.location_from &&
        driver.value?.[0]?.location &&
        driver.value?.[0]?.location !== form.location_from
      ) {
        errors.location_from = ERROR_LOCATION_MISMATCH;
      } else {
        errors.location_from = "";
      }
    },
  );

  const validateForm = () => {
    resetObject(errors);

    if (!form.name.trim()) {
      errors.name = ERROR_NAME_REQUIRED;
    }

    if (!form.location_from.trim()) {
      errors.location_from = ERROR_LOCATION_FROM_REQUIRED;
    }

    if (!form.location_to.trim()) {
      errors.location_to = ERROR_LOCATION_TO_REQUIRED;
    }

    if (!form.date.trim()) {
      errors.date = ERROR_REQUIRED_DATE;
    }

    if (!form.driver.trim()) {
      errors.driver = ERROR_DRIVER_REQUIRED;
    }

    return Object.values(errors).every((error) => !error);
  };

  return { form, errors, validateForm };
}
