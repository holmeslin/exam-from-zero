// @vitest-environment node
import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";
import { expect, test } from "vitest";
import ClientOnly from "./ClientOnly.vue";
import BrowserOnly from "./BrowserOnly";

test("伺服器上只渲染 fallback，不執行裡面的元件", async () => {
  expect(typeof window, "這個測試模擬伺服器，應該沒有 window").toBe("undefined");
  const app = createSSRApp({
    render: () =>
      h(ClientOnly, null, {
        default: () => h(BrowserOnly),
        fallback: () => h("p", "量測中……"),
      }),
  });
  let html = "";
  try {
    html = await renderToString(app);
  } catch (e) {
    throw new Error(`伺服器渲染時執行了裡面的元件（${e}）`);
  }
  expect(html, "伺服器的 HTML 應該只有 fallback 的內容").toContain("量測中……");
  expect(html).not.toContain("寬度");
});
