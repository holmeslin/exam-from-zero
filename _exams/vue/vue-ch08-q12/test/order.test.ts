import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "./cart";
import { useOrderStore } from "./order";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("checkout 記下總件數並清空購物車", () => {
  const cart = useCartStore();
  const order = useOrderStore();
  cart.addItem(1);
  cart.addItem(1);
  cart.addItem(2);
  order.checkout();
  expect(order.orders).toEqual([{ count: 3 }]);
  expect(cart.items, "結帳後購物車要被清空").toEqual([]);
});

test("購物車是空的，checkout 不新增訂單", () => {
  const order = useOrderStore();
  order.checkout();
  expect(order.orders).toEqual([]);
});

test("可以連續結帳好幾次", () => {
  const cart = useCartStore();
  const order = useOrderStore();
  cart.addItem(3);
  order.checkout();
  cart.addItem(1);
  cart.addItem(2);
  order.checkout();
  expect(order.orders).toEqual([{ count: 1 }, { count: 2 }]);
});
