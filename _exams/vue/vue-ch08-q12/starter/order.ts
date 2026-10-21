import { ref } from "vue";
import { defineStore } from "pinia";

export const useOrderStore = defineStore("order", () => {
  // 每一筆訂單記下當時購物車的總件數
  const orders = ref<{ count: number }[]>([]);

  function checkout() {
    // TODO: 購物車是空的就什麼都不做；
    // 否則在 orders 加一筆 { count: 購物車總件數 }，再清空購物車
  }

  return { orders, checkout };
});
