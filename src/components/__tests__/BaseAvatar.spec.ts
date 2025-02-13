import { describe, expect, it } from "vitest";

import { mount } from "@vue/test-utils";
import BaseAvatar from "../BaseAvatar.vue";

const _fallBackInitials = "NA";

describe("BaseAvatar", () => {
  it("should return 'NA' if givenName is empty", () => {
    const _givenName = "";
    const wrapper = mount(BaseAvatar, {
      props: { givenName: _givenName },
    });
    expect(wrapper.find("span").text()).toBe(_fallBackInitials);
  });

  it("should return initials for a single name", () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        givenName: "Zeidan",
      },
    });

    expect(wrapper.find("span").text()).toBe("Z");
  });

  it("should render initials for a full name", () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        givenName: "Omar Zeidan",
      },
    });

    expect(wrapper.find("span").text()).toBe("OZ");
  });

  it("should handle multiple spaces in the name", () => {
    const wrapper = mount(BaseAvatar, {
      props: {
        givenName: "Omar  A  Zeidan",
      },
    });
    expect(wrapper.find("span").text()).toBe("OAZ");
  });
});
