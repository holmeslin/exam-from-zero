import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useProductStore } from "./products";

type CartItem = { id: number; quantity: number };

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore();

  // 只記商品的 id 和數量，名稱和價格去商品 store 查
  const items = ref<CartItem[]>([]);

  const totalCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      const product = productStore.products.find((p) => p.id === item.id);
      return sum + (product ? product.price : 0) * item.quantity;
    }, 0);
  });

  function addItem(id: number) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.quantity++;
    } else {
      items.value.push({ id, quantity: 1 });
    }
  }

  function removeItem(id: number) {
    const item = items.value.find((item) => item.id === id);
    if (!item) return;
    item.quantity--;
    if (item.quantity === 0) {
      items.value = items.value.filter((item) => item.id !== id);
    }
  }

  function clear() {
    items.value = [];
  }

  return { items, totalCount, totalPrice, addItem, removeItem, clear };
});
