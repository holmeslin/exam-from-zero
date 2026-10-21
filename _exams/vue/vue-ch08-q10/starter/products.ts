import { ref } from "vue";
import { defineStore } from "pinia";

export const useProductStore = defineStore("products", () => {
  const products = ref([
    { id: 1, name: "鍵盤", price: 1200 },
    { id: 2, name: "滑鼠", price: 600 },
    { id: 3, name: "螢幕", price: 5000 },
  ]);

  return { products };
});
