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
    customerName: "",
    location_from: "",
    location_to: "",
    date: "",
    driver: "",
  });

  const errors = reactive({
    customerName: "",
    location_from: "",
    location_to: "",
    date: "",
    driver: "",
  });

  const driver = computed(() => drivers.filter((driver) => driver._id === form.driver));
  const setError = (field: keyof typeof errors, message: string) => {
    errors[field] = message;
  };

  watch(
    () => [form.location_from, form.location_to],
    ([newLocationFrom, newLocationTo]) => {
      setError("location_from", "");
      setError("location_to", "");
      setError("driver", "");

      if (driver.value.length > 0) {
        if (driver.value[0].location !== form.location_from) {
          setError("location_from", ERROR_LOCATION_MISMATCH);
          return;
        }
      }

      if (/\d/.test(newLocationFrom?.trim())) {
        setError("location_from", ERROR_LOCATION_NUMBERS);
        return;
      }

      if (/\d/.test(newLocationTo?.trim())) {
        setError("location_to", ERROR_LOCATION_NUMBERS);
        return;
      }
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
        setError("location_from", ERROR_LOCATION_MISMATCH);
      } else {
        setError("location_from", "");
      }
    },
  );

  const validateForm = () => {
    if (errors.location_from) return;
    resetObject(errors);

    if (!form.customerName.trim()) {
      setError("customerName", ERROR_NAME_REQUIRED);
    }

    if (!form.location_from.trim()) {
      setError("location_from", ERROR_LOCATION_FROM_REQUIRED);
    }

    if (!form.location_to.trim()) {
      setError("location_to", ERROR_LOCATION_TO_REQUIRED);
    }

    if (!form.date.trim()) {
      setError("date", ERROR_REQUIRED_DATE);
    }

    if (!form.driver.trim()) {
      setError("driver", ERROR_DRIVER_REQUIRED);
    }
    return Object.values(errors).every((error) => !error);
  };

  return { form, errors, validateForm };
}
