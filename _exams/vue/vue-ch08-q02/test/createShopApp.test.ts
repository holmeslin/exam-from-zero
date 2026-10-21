import { expect, test } from "vitest";
import { defineComponent, h, ref } from "vue";
import { defineStore } from "pinia";
import { createShopApp } from "./createShopApp";

const useShopStore = defineStore("shop", () => {
  const name = ref("小明商店");
  return { name };
});

const Root = defineComponent({
  setup() {
    const shop = useShopStore();
    return () => h("h1", shop.name);
  },
});

test("回傳的 App 已經啟用 Pinia，元件可以使用 store", () => {
  const el = document.createElement("div");
  const app = createShopApp(Root);
  let error: unknown = null;
  app.config.errorHandler = (err) => {
    error = err;
  };
  app.mount(el);
  expect(error, "掛載時發生錯誤（是不是沒有 app.use(createPinia())？）：" + String(error)).toBeNull();
  expect(el.textContent).toBe("小明商店");
  app.unmount();
});
