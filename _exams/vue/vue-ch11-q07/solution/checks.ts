import { expect } from "vitest";
import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkSearchBox(SearchBox: Component) {
  const wrapper = mount(SearchBox, { props: { placeholder: "找商品" } });
  expect(wrapper.get("input").attributes("placeholder")).toBe("找商品");

  await wrapper.get("input").setValue("  滑鼠 ");
  await wrapper.get("form").trigger("submit");
  expect(wrapper.emitted("search")).toEqual([["滑鼠"]]);

  const empty = mount(SearchBox, { props: { placeholder: "找商品" } });
  await empty.get("input").setValue("   ");
  await empty.get("form").trigger("submit");
  expect(empty.emitted("search")).toBeUndefined();
}
