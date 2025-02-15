import { describe, expect, it, vi } from "vitest";

import BaseDrawer from "@/components/BaseDrawer.vue";
import { mount } from "@vue/test-utils";

describe("BaseDrawer", () => {
  it("renders with default props", () => {
    const wrapper = mount(BaseDrawer, {
      props: { isOpen: true },
    });

    expect(wrapper.props("position")).toBe("left");
    expect(wrapper.props("width")).toBe(420);
    expect(wrapper.find("[data-test='drawer-overlay']").exists()).toBe(true);
  });

  it("emits update:isOpen event when closed", async () => {
    const wrapper = mount(BaseDrawer, {
      props: { isOpen: true },
    });

    await wrapper.find('[data-test="button-close-drawer"]').trigger("click");
    expect(wrapper.emitted("update:isOpen")).toBeTruthy();
    expect(wrapper.emitted("update:isOpen")?.[0]).toEqual([false]);
  });

  it("closes the drawer when pressing the Escape key", async () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        isOpen: true,
      },
    });

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(wrapper.emitted("update:isOpen")).toBeTruthy();
    expect(wrapper.emitted("update:isOpen")?.[0]).toEqual([false]);
  });

  it("closes on overlay click", async () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        isOpen: true,
      },
    });

    await wrapper.find("[data-test='drawer-overlay']").trigger("click");
    expect(wrapper.emitted("update:isOpen")).toBeTruthy();
    expect(wrapper.emitted("update:isOpen")?.[0]).toEqual([false]);
  });

  it("renders slot content", () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        isOpen: true,
      },
      slots: {
        "drawer-title": "Hello Title",
        "drawer-content": "<div> Placeholder custom content </div>",
      },
    });

    expect(wrapper.text()).toContain("Hello Title");
    expect(wrapper.html()).toContain("<div> Placeholder custom content </div>");
  });

  it("removes event listener on unmount", () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        isOpen: true,
      },
    });

    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    wrapper.unmount();
    // assertion with the expected keydown and just any function
    // to make sure the removeEventListener has been called.
    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});
