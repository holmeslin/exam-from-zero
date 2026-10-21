import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const name = ref("小明");
  const isMember = ref(false);

  function toggleMember() {
    isMember.value = !isMember.value;
  }

  return { name, isMember, toggleMember };
});
