import { expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { Component } from "vue";
import { useCartStore } from "./cart";

export async function checkCartSummary(CartSummary: Component) {
  const wrapper = mount(CartSummary, {
    global: {
      plugins: [
        createTestingPinia({
          createSpy: vi.fn,
          initialState: {
            cart: { items: [{ name: "鍵盤", price: 1200, quantity: 2 }] },
          },
        }),
      ],
    },
  });
  const cart = useCartStore();

  expect(wrapper.get('[data-test="count"]').text()).toBe("購物車裡有 2 件商品");
  expect(wrapper.get('[data-test="total"]').text()).toBe("合計 NT$ 2,400");

  await wrapper.get("button").trigger("click");
  expect(cart.clear).toHaveBeenCalledTimes(1);
}
