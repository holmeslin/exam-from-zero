import { expect } from "vitest";
import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkNameInput(NameInput: Component) {
  const wrapper = mount(NameInput);

  await wrapper.get('input[type="text"]').setValue("小明");
  expect(wrapper.get("p").text()).toBe("哈囉，小明！");

  const button = wrapper.get("button");
  expect(button.attributes("disabled")).toBeDefined();

  await wrapper.get('input[type="checkbox"]').setValue(true);
  expect(button.attributes("disabled")).toBeUndefined();
}
