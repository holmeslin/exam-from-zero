import { defineComponent, h } from "vue";

// 只能在瀏覽器跑的元件：setup 一執行就讀 window
export default defineComponent({
  setup() {
    const width = window.innerWidth;
    return () => h("p", `寬度：${width}px`);
  },
});
