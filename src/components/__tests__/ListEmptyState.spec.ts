import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ListEmptyState from "../ListEmptyState.vue";
import BaseButton from "../BaseButton.vue";

describe("ListEmptyState", () => {
  it("renders the ListEmptyState and with the right title", () => {
    const wrapper = mount(ListEmptyState, {});
    expect(wrapper.find("[data-test='title']").exists()).toBe(true);
    expect(wrapper.find("[data-test='title']").text()).toBe("Nothing found!");
  });

  it('emits "onClearSearch" event when the clear button is clicked', () => {
    const wrapper = mount(ListEmptyState, {});

    wrapper.findAllComponents(BaseButton)[0].trigger("click");
    expect(wrapper.emitted("onClearSearch")).toBeTruthy();
  });
});
