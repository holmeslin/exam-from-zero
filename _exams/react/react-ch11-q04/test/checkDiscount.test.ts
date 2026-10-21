import { expect, test } from "vitest";
import { applyDiscount } from "./cart.ts";
import { checkApplyDiscount } from "./checkDiscount.ts";

test("正確的 applyDiscount 要通過你的檢查", () => {
  expect(() => checkApplyDiscount(applyDiscount), "正確的版本不該讓檢查失敗").not.toThrow();
});

test("把 >= 寫成 > 的版本要被抓到", () => {
  const buggy = (total: number) => (total > 3000 ? total * 0.9 : total);
  expect(() => checkApplyDiscount(buggy), "剛好 3000 元沒打折時，檢查應該失敗").toThrow();
});

test("門檻寫錯成 2000 的版本要被抓到", () => {
  const buggy = (total: number) => (total >= 2000 ? total * 0.9 : total);
  expect(() => checkApplyDiscount(buggy), "2999 元也被打折時，檢查應該失敗").toThrow();
});

test("打成八折的版本要被抓到", () => {
  const buggy = (total: number) => (total >= 3000 ? total * 0.8 : total);
  expect(() => checkApplyDiscount(buggy), "3000 元變成 2400 時，檢查應該失敗").toThrow();
});
