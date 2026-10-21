import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { CartItem } from "./cart";

// 同一個商品加兩次會變成兩筆
export const useAlwaysPushStore = defineStore("cart-bad-push", () => {
  const items = ref<CartItem[]>([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0));
  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
  function addItem(name: string, price: number) {
    items.value.push({ name, price, quantity: 1 });
  }
  function clear() {
    items.value = [];
  }
  return { items, total, count, addItem, clear };
});

// count 算的是筆數，不是件數
export const useWrongCountStore = defineStore("cart-bad-count", () => {
  const items = ref<CartItem[]>([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0));
  const count = computed(() => items.value.length);
  function addItem(name: string, price: number) {
    const found = items.value.find((i) => i.name === name);
    if (found) found.quantity++;
    else items.value.push({ name, price, quantity: 1 });
  }
  function clear() {
    items.value = [];
  }
  return { items, total, count, addItem, clear };
});

// clear 什麼都沒做
export const useNoClearStore = defineStore("cart-bad-clear", () => {
  const items = ref<CartItem[]>([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.price * i.quantity, 0));
  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0));
  function addItem(name: string, price: number) {
    const found = items.value.find((i) => i.name === name);
    if (found) found.quantity++;
    else items.value.push({ name, price, quantity: 1 });
  }
  function clear() {}
  return { items, total, count, addItem, clear };
});
