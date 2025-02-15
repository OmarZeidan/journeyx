import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ListCard from "@/components/ListCard.vue";

const _testTitle = "List Card XO";
describe("ListCard", () => {
  it("renders correctly with the right title", () => {
    const wrapper = mount(ListCard, {
      props: {
        title: _testTitle,
      },
    });
    expect(wrapper).toBeTruthy();
    expect(wrapper.find("[data-test='listCard-title']").text()).toBe(_testTitle);
  });
  it("renders slot content", () => {
    const wrapper = mount(ListCard, {
      props: {
        title: _testTitle,
      },
      slots: {
        "listCard-cta": "<button>CTA</button>",
        "search-input": "Search input goes here",
      },
    });

    expect(wrapper.find("[data-test='listCard-cta']").html()).toContain("<button>CTA</button>");
    expect(wrapper.find("[data-test='search-input']").text()).toBe("Search input goes here");
  });
});
