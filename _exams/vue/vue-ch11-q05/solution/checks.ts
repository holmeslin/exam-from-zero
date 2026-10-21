import { expect } from "vitest";
import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkProductCard(ProductCard: Component) {
  const wrapper = mount(ProductCard, {
    props: { name: "機械鍵盤", price: 2490 },
  });
  expect(wrapper.get("h2").text()).toBe("機械鍵盤");
  expect(wrapper.get(".price").text()).toBe("NT$ 2,490");
  expect(wrapper.find(".sold-out").exists()).toBe(false);

  const soldOut = mount(ProductCard, {
    props: { name: "機械鍵盤", price: 2490, soldOut: true },
  });
  expect(soldOut.find(".sold-out").exists()).toBe(true);
}
