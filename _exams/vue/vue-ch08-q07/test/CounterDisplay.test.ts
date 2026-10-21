import { beforeEach, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import CounterDisplay from "./CounterDisplay.vue";
import { useCounterStore } from "./counter";

let pinia: Pinia;
beforeEach(() => {
  pinia = createPinia();
  setActivePinia(pinia);
});

test("按「加一」後畫面跟著更新", async () => {
  const w = mount(CounterDisplay, { global: { plugins: [pinia] } });
  expect(w.find("p").text()).toBe("目前是 0，兩倍是 0");
  await w.find("button").trigger("click");
  expect(useCounterStore().count, "store 的 count 沒有加一").toBe(1);
  expect(w.find("p").text(), "store 變了但畫面沒更新").toBe("目前是 1，兩倍是 2");
});

test("別處改了 store，畫面也要跟著更新", async () => {
  const w = mount(CounterDisplay, { global: { plugins: [pinia] } });
  useCounterStore().count = 5;
  await w.vm.$nextTick();
  expect(w.find("p").text()).toBe("目前是 5，兩倍是 10");
});
