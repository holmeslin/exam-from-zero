import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { expect, test } from "vitest";
import ClientOnly from "./ClientOnly.vue";
import BrowserOnly from "./BrowserOnly";

test("掛載之後換成裡面真正的元件", async () => {
  const w = mount(ClientOnly, {
    slots: { default: BrowserOnly, fallback: "<p>量測中……</p>" },
  });
  await nextTick();
  expect(w.text(), "掛載之後應該顯示預設 slot 的內容").toBe(`寬度：${window.innerWidth}px`);
});

test("沒有給 fallback 也不會出錯", async () => {
  const w = mount(ClientOnly, { slots: { default: "<span>hi</span>" } });
  await nextTick();
  expect(w.text()).toBe("hi");
});
