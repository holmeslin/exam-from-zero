import { computed, ref } from "vue";
import { defineStore } from "pinia";

export type CartItem = { name: string; price: number; quantity: number };

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([]);
  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );
  const count = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  function addItem(name: string, price: number) {
    const found = items.value.find((item) => item.name === name);
    if (found) {
      found.quantity++;
    } else {
      items.value.push({ name, price, quantity: 1 });
    }
  }

  function clear() {
    items.value = [];
  }

  return { items, total, count, addItem, clear };
});
