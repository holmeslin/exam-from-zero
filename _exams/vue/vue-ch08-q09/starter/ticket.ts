import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

const ticketPrice = 300;
const user = useUserStore();

export const useTicketStore = defineStore("ticket", () => {
  const quantity = ref(1);

  const total = computed(() => {
    const subtotal = ticketPrice * quantity.value;
    return user.isMember ? subtotal * 0.8 : subtotal;
  });

  function addOne() {
    quantity.value++;
  }

  return { quantity, total, addOne };
});
