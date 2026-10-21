import { expect, test } from "vitest";
import { checkFormatPrice } from "./checkPrice.ts";
import { formatPrice } from "./price.ts";

test("正確的 formatPrice 要通過你的檢查", () => {
  expect(() => checkFormatPrice(formatPrice), "正確的版本不該讓檢查失敗").not.toThrow();
});

test("少了千分位的版本要被你的檢查抓到", () => {
  const buggy = (price: number) => `NT$ ${price}`;
  expect(() => checkFormatPrice(buggy), "formatPrice(1200) 回傳 'NT$ 1200' 時，檢查應該失敗").toThrow();
});

test("少了 NT$ 的版本要被你的檢查抓到", () => {
  const buggy = (price: number) => price.toLocaleString("zh-TW");
  expect(() => checkFormatPrice(buggy), "formatPrice(1200) 回傳 '1,200' 時，檢查應該失敗").toThrow();
});
