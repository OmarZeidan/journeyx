import { useTourForm } from "@/composables/useTourForm";
import type { Doc } from "@cvx/_generated/dataModel";
import { describe, expect, it } from "vitest";
import { reactive } from "vue";

describe("useTourForm", () => {
  const _mockedDrivers = reactive([
    { _id: "driver123", name: "John Doe", location: "Berlin" },
    { _id: "driver456", name: "Omar Zeidan", location: "Munich" },
  ]) as Array<Doc<"drivers">>;

  it("initialize form and errors correctly", () => {
    const { form, errors } = useTourForm(_mockedDrivers);
    expect(form.customerName).toBe("");
    expect(errors.customerName).toBe("");
  });

  it("should validate required fields", () => {
    const { form, errors, validateForm } = useTourForm(_mockedDrivers);

    form.customerName = "";
    form.location_from = "";
    form.location_to = "";
    form.date = "";
    form.driver = "";

    const isValid = validateForm();

    expect(isValid).toBe(false);
    expect(errors.customerName).toBeTruthy();
    expect(errors.location_from).toBeTruthy();
    expect(errors.location_to).toBeTruthy();
    expect(errors.date).toBeTruthy();
    expect(errors.driver).toBeTruthy();
  });

  it.todo("should validate location mismatch", () => {});
});
