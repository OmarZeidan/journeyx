import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import BaseButton from "../BaseButton.vue"

describe("BaseButton", () => {
  it("should render with the slot passed", () => {
    const _text = "Click Me"
    const wrapper = mount(BaseButton, {
      slots: {
        default: _text,
      },
    })
    expect(wrapper.props().variant).toBe("primary")
    expect(wrapper.text()).toBe(_text)
  })

  it("should by default have primary variant", () => {
    const _text = "Click Me"
    const wrapper = mount(BaseButton, {
      slots: {
        default: _text,
      },
    })
    expect(wrapper.props().variant).toBe("primary")
  })

  it("should render with 'secondary' variant when passed as a prop", () => {
    const wrapper = mount(BaseButton, {
      props: { variant: "secondary" },
    })
    expect(wrapper.props().variant).toBe("secondary")
  })

  it("should render with a CSS curosr pointer when asLink passed as a prop", () => {
    const wrapper = mount(BaseButton, { props: { asLink: true } })
    expect(wrapper.props().asLink).toBe(true)
    expect(wrapper.classes()).toContain("cursor-pointer")
  })

  it("should render with the right size", () => {
    const wrapper = mount(BaseButton, { props: { size: "lg" } })
    expect(wrapper.props().size).toBe("lg")
  })

  it("should render with size 'base' as default", () => {
    const wrapper = mount(BaseButton)
    expect(wrapper.props().size).toBe("base")
  })
})
