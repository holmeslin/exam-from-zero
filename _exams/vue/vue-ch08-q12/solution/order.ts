import { ref } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useOrderStore = defineStore("order", () => {
  const cart = useCartStore();

  // 每一筆訂單記下當時購物車的總件數
  const orders = ref<{ count: number }[]>([]);

  function checkout() {
    if (cart.totalCount === 0) return;
    orders.value.push({ count: cart.totalCount });
    cart.clear();
  }

  return { orders, checkout };
});
