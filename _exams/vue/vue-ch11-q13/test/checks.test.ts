import { expect, test } from "vitest";
import { checkCartSummary } from "./checks";
import CartSummary from "./CartSummary.vue";
import BadSummaryNoClear from "./BadSummaryNoClear.vue";
import BadSummaryRows from "./BadSummaryRows.vue";
import BadSummaryTotal from "./BadSummaryTotal.vue";

test("正確的 CartSummary 要通過你的檢查（記得 createSpy: vi.fn）", async () => {
  await checkCartSummary(CartSummary);
});

test("按「清空」沒有呼叫 clear 的元件，你的檢查要抓到", async () => {
  await expect(checkCartSummary(BadSummaryNoClear)).rejects.toThrow();
});

test("件數顯示成筆數的元件，你的檢查要抓到", async () => {
  await expect(checkCartSummary(BadSummaryRows)).rejects.toThrow();
});

test("合計沒有千分位的元件，你的檢查要抓到", async () => {
  await expect(checkCartSummary(BadSummaryTotal)).rejects.toThrow();
});
