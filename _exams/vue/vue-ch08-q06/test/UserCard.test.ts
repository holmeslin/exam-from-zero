import { beforeEach, expect, test } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia, type Pinia } from "pinia";
import UserCard from "./UserCard.vue";

let pinia: Pinia;
beforeEach(() => {
  pinia = createPinia();
  setActivePinia(pinia);
});

test("一開始顯示「小明 有 100 點」", () => {
  const w = mount(UserCard, { global: { plugins: [pinia] } });
  expect(w.find("p").text()).toBe("小明 有 100 點");
});

test("按下按鈕後顯示 110 點", async () => {
  const w = mount(UserCard, { global: { plugins: [pinia] } });
  await w.find("button").trigger("click");
  expect(w.find("p").text()).toBe("小明 有 110 點");
});
