import { ref } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);

  // TODO: 寫 increment，讓 count 加一

  return { count };
});
