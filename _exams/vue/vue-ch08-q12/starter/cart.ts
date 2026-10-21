import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const items = ref<{ id: number; quantity: number }[]>([]);

  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  function addItem(id: number) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.quantity++;
    } else {
      items.value.push({ id, quantity: 1 });
    }
  }

  function clear() {
    items.value = [];
  }

  return { items, totalCount, addItem, clear };
});
