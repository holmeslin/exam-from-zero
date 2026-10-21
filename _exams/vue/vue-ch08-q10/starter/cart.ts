import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useProductStore } from "./products";

type CartItem = { id: number; quantity: number };

export const useCartStore = defineStore("cart", () => {
  const productStore = useProductStore();

  // 只記商品的 id 和數量，名稱和價格去商品 store 查
  const items = ref<CartItem[]>([]);

  const totalCount = computed(() => {
    // TODO: 所有商品數量的加總
    return 0;
  });

  const totalPrice = computed(() => {
    // TODO: 用 productStore.products 查價格，算出總金額
    return 0;
  });

  function addItem(id: number) {
    // TODO: 已在購物車就數量加一，不在就 push { id, quantity: 1 }
  }

  function removeItem(id: number) {
    // TODO: 數量減一，減到 0 就從 items 移除
  }

  function clear() {
    // TODO: 清空購物車
  }

  return { items, totalCount, totalPrice, addItem, removeItem, clear };
});
