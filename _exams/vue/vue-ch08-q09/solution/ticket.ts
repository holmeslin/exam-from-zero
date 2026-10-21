import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";

const ticketPrice = 300;

export const useTicketStore = defineStore("ticket", () => {
  const user = useUserStore();

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
