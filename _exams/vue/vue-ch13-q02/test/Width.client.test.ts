import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { expect, test } from "vitest";
import Width from "./Width.vue";

test("在瀏覽器掛載後顯示真正的寬度", async () => {
  const w = mount(Width);
  await nextTick();
  expect(w.text(), "掛載之後應該換成 window.innerWidth").toBe(`視窗寬度：${window.innerWidth}px`);
});
