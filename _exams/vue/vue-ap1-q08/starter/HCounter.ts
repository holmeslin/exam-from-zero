import { defineComponent, h, ref } from "vue";

export default defineComponent(() => {
  const count = ref(0);
  const label = `點了 ${count.value} 次`;

  return () => h("button", { onClick: () => count.value++ }, label);
});
