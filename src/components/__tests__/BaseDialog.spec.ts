import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseButton from "../BaseButton.vue";
import BaseDialog from "../BaseDialog.vue";

const _testTitle = "My Dialog";

describe("BaseDialog", () => {
  it("renders the dialog when isOpen is true and with the right given title", () => {
    const wrapper = mount(BaseDialog, {
      props: {
        isOpen: true,
        title: _testTitle,
      },
    });
    expect(wrapper.find("[data-test='dialog-wrapper']").exists()).toBe(true);
    expect(wrapper.find("[data-test='dialog-title']").text()).toBe(_testTitle);
  });

  it('emits "confirm" event when the confirm button is clicked', () => {
    const wrapper = mount(BaseDialog, {
      props: {
        isOpen: true,
        title: _testTitle,
      },
    });

    wrapper.findAllComponents(BaseButton)[0].trigger("click");
    expect(wrapper.emitted("confirm")).toBeTruthy();
  });
});
