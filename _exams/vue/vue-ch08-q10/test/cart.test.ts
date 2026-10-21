import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCartStore } from "./cart";
import { useProductStore } from "./products";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("加入一個鍵盤、兩個滑鼠：3 件、2400 元", () => {
  const cart = useCartStore();
  cart.addItem(1);
  cart.addItem(2);
  cart.addItem(2);
  expect(cart.items).toEqual([
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
  ]);
  expect(cart.totalCount).toBe(3);
  expect(cart.totalPrice).toBe(2400);
});

test("removeItem 減一，減到 0 就從購物車移除", () => {
  const cart = useCartStore();
  cart.addItem(3);
  cart.addItem(2);
  cart.addItem(2);
  cart.removeItem(2);
  expect(cart.items).toEqual([
    { id: 3, quantity: 1 },
    { id: 2, quantity: 1 },
  ]);
  cart.removeItem(3);
  expect(cart.items, "數量減到 0 的商品要被移除").toEqual([{ id: 2, quantity: 1 }]);
  expect(cart.totalPrice).toBe(600);
});

test("clear 清空購物車", () => {
  const cart = useCartStore();
  cart.addItem(1);
  cart.clear();
  expect(cart.items).toEqual([]);
  expect(cart.totalCount).toBe(0);
});

test("商品改價錢，總金額自動用新價格", () => {
  const cart = useCartStore();
  cart.addItem(2);
  cart.addItem(2);
  useProductStore().products[1].price = 500;
  expect(cart.totalPrice, "總金額要從 useProductStore 查價格").toBe(1000);
});
