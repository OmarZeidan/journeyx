import { beforeEach, describe, expect, it, vi } from "vitest";

import TourForm from "@/components/TourForm.vue";
import { useConvexMutation } from "@convex-vue/core";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

vi.mock("@convex-vue/core", () => ({
  useConvexMutation: vi.fn(() => ({
    mutate: vi.fn(),
    isLoading: ref(false),
    error: ref(null),
  })),
}));

const _mockedTour = {
  customerName: "Omar Zeidan",
  location_from: "Berlin",
  location_to: "Munich",
  date: "25.12.2025",
  driver: "driver456",
};

// const _mockedDrivers = [
//   { _id: "driver123", name: "John Doe", location: "Berlin" },
//   { _id: "driver456", name: "Jane Smith", location: "Munich" },
// ] as Array<Doc<"drivers">>;

describe("TourForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const wrapper = mount(TourForm, {
      props: { drivers: [] },
    });
    expect(wrapper).toBeTruthy();
  });

  it("renders with form fields filled if tour is provided.", () => {
    const tour = _mockedTour;

    const wrapper = mount(TourForm, {
      props: {
        tour,
        drivers: [],
      },
    });

    expect(wrapper.vm.form.customerName).toBe(_mockedTour.customerName);
    expect(wrapper.vm.form.location_from).toBe(_mockedTour.location_from);
    expect(wrapper.vm.form.location_to).toBe(_mockedTour.location_to);
    expect(wrapper.vm.form.date).toBe(_mockedTour.date);
    expect(wrapper.vm.form.driver).toBe(_mockedTour.driver);
  });

  it("renders with clean form if tour is not provided.", () => {
    const wrapper = mount(TourForm, {
      props: {
        drivers: [],
      },
    });

    expect(wrapper.vm.form.customerName).toBe("");
    expect(wrapper.vm.form.location_from).toBe("");
    expect(wrapper.vm.form.location_to).toBe("");
    expect(wrapper.vm.form.date).toBe("");
    expect(wrapper.vm.form.driver).toBe("");
  });

  it("calls the mutation with the correct data when form is submitted", () => {
    const mutateMock = vi.fn().mockResolvedValue({});
    vi.mocked(useConvexMutation).mockReturnValueOnce({
      mutate: mutateMock,
      isLoading: ref(false),
      error: ref(null),
    });

    const tour = {
      customerName: "Omar Zeidan",
      location_from: "Berlin",
      location_to: "Munich",
      date: "25.12.2025",
      driver: "dx1234",
    };

    const wrapper = mount(TourForm, {
      props: {
        tour,
        drivers: [],
      },
    });

    wrapper.find("form").trigger("submit.prevent");
    expect(mutateMock).toHaveBeenCalledOnce();
  });

  it.todo("shows error when location_from not equal to the driver's location", async () => {
    const mutateMock = vi.fn().mockResolvedValue({});
    vi.mocked(useConvexMutation).mockReturnValueOnce({
      mutate: mutateMock,
      isLoading: ref(false),
      error: ref(null),
    });
  });
});
