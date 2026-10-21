import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const name = ref("小明");
  const points = ref(100);

  function addPoints(n: number) {
    points.value += n;
  }

  return { name, points, addPoints };
});
