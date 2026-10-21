import { expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { checkCartStore } from "./checks";
import { useCartStore } from "./cart";
import { useAlwaysPushStore, useNoClearStore, useWrongCountStore } from "./badStores";

test("正確的購物車 store 要通過你的檢查（記得先 setActivePinia）", async () => {
  await checkCartStore(useCartStore);
});

test("每次呼叫都要用新的 Pinia：外面已經有一台裝了東西的購物車，也要通過", async () => {
  setActivePinia(createPinia());
  useCartStore().addItem("鍵盤", 1200);
  await checkCartStore(useCartStore);
});

test("同一個商品加兩次變成兩筆的 store，你的檢查要抓到", async () => {
  await expect(checkCartStore(useAlwaysPushStore)).rejects.toThrow();
});

test("count 算錯的 store，你的檢查要抓到", async () => {
  await expect(checkCartStore(useWrongCountStore)).rejects.toThrow();
});

test("clear 沒有清空的 store，你的檢查要抓到", async () => {
  await expect(checkCartStore(useNoClearStore)).rejects.toThrow();
});
