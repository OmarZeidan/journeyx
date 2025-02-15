import { describe, expect, it, vi } from "vitest";

import DriverForm from "@/components/DriverForm.vue";
import { mount } from "@vue/test-utils";
import { ref } from "vue";
import { ERROR_LOCATION_NUMBERS } from "@/constants";
import { useConvexMutation } from "@convex-vue/core";

vi.mock("@convex-vue/core", () => ({
  useConvexMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isLoading: ref(false),
    error: ref(null),
  })),
}));

describe("DriverForm", () => {
  it("renders correctly", () => {
    const wrapper = mount(DriverForm);
    expect(wrapper).toBeTruthy();
  });

  it("displays an error when location contains numbers", async () => {
    const wrapper = mount(DriverForm);

    const locationInput = wrapper.find("#location");
    await locationInput.setValue("Berlin123");

    expect(
      wrapper.find("[data-test='location-input']").find("[data-test='input-error']").exists(),
    ).toBeTruthy();

    expect(
      wrapper.find("[data-test='location-input']").find("[data-test='input-error']").text(),
    ).toBe(ERROR_LOCATION_NUMBERS);
  });

  it("calls the mutation with the correct data when form is submitted", async () => {
    const mutateMock = vi.fn().mockResolvedValue({});
    vi.mocked(useConvexMutation).mockReturnValueOnce({
      mutate: mutateMock,
      isLoading: ref(false),
      error: ref(null),
    });

    const wrapper = mount(DriverForm);

    await wrapper.find("#fullName").setValue("Omar Zeidan");
    await wrapper.find("#location").setValue("Berlin");

    await wrapper.find("form").trigger("submit.prevent");

    expect(mutateMock).toHaveBeenCalledWith({
      name: "Omar Zeidan",
      location: "Berlin",
    });
  });

  it.todo("shows errors when fullName and location are not filled");
  it.todo("clear errors when onBeforeUnmount");
});
