// useDriverForm.spec.ts
import { useDriverForm } from "@/composables/useDriverForm"; // Adjust the path as needed
import { ERROR_LOCATION_NUMBERS, REQUIRED_ERROR_TEMPLATE } from "@/constants";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";

const ERROR_NAME_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Driver's Name");
const ERROR_LOCATION_REQUIRED = REQUIRED_ERROR_TEMPLATE.replace("{field}", "Location");

vi.mock("@/composables/useUtils", () => ({
  useUtils: () => ({
    resetObject: vi.fn((obj) => {
      for (const key in obj) {
        obj[key] = "";
      }
    }),
  }),
}));

describe("useDriverForm", () => {
  let driverForm: ReturnType<typeof useDriverForm>;

  beforeEach(() => {
    driverForm = useDriverForm();
  });

  it("init form and errors with empty values", () => {
    expect(driverForm.form).toEqual({
      name: "",
      location: "",
    });

    expect(driverForm.errors).toEqual({
      name: "",
      location: "",
    });
  });

  it("shows error when location contains number", async () => {
    driverForm.form.location = "Berlin 123";
    await nextTick(); // Interesting: this awaiys for watcher to trigger.
    expect(driverForm.errors.location).toBe(ERROR_LOCATION_NUMBERS);

    driverForm.form.location = "Berlin";
    await nextTick();

    expect(driverForm.errors.location).toBe("");
  });

  it("removes errors after true validation", () => {
    driverForm.form.name = "";
    driverForm.form.location = "";

    const isValid = driverForm.validateForm();

    expect(isValid).toBe(false);
    expect(driverForm.errors.name).toBe(ERROR_NAME_REQUIRED);
    expect(driverForm.errors.location).toBe(ERROR_LOCATION_REQUIRED);
  });

  it("returns true if form is valid", () => {
    driverForm.form.name = "Omar Zeidan";
    driverForm.form.location = "Berlin";

    const isValid = driverForm.validateForm();

    expect(isValid).toBe(true);
    expect(driverForm.errors.name).toBe("");
    expect(driverForm.errors.location).toBe("");
  });
});
