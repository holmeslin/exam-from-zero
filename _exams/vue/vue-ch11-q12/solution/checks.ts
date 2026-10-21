import { expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";

export async function checkCartStore(useCartStore: () => any) {
  setActivePinia(createPinia());
  const cart = useCartStore();
  expect(cart.items).toEqual([]);
  expect(cart.count).toBe(0);
  expect(cart.total).toBe(0);

  cart.addItem("鍵盤", 1200);
  cart.addItem("鍵盤", 1200);
  cart.addItem("滑鼠", 600);
  expect(cart.items).toEqual([
    { name: "鍵盤", price: 1200, quantity: 2 },
    { name: "滑鼠", price: 600, quantity: 1 },
  ]);
  expect(cart.count).toBe(3);
  expect(cart.total).toBe(3000);

  cart.clear();
  expect(cart.items).toEqual([]);
}
