import { defineComponent, h, ref } from "vue";

export default defineComponent(() => {
  const count = ref(0);

  return () => h("button", { onClick: () => count.value++ }, `點了 ${count.value} 次`);
});
