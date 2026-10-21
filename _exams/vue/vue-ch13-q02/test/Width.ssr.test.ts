// @vitest-environment node
import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { expect, test } from "vitest";
import Width from "./Width.vue";

test("在伺服器上渲染（沒有 window）", async () => {
  expect(typeof window, "這個測試模擬伺服器，應該沒有 window").toBe("undefined");
  let html = "";
  try {
    html = await renderToString(createSSRApp(Width));
  } catch (e) {
    throw new Error(`伺服器渲染時出錯了，setup 裡是不是直接讀了 window？（${e}）`);
  }
  expect(html, "伺服器產生的 HTML 應該先顯示 0px").toContain("視窗寬度：0px");
});
