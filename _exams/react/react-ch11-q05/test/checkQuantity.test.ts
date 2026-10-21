import { expect, test } from "vitest";
import { checkParseQuantity } from "./checkQuantity.ts";
import { parseQuantity } from "./quantity.ts";

test("正確的 parseQuantity 要通過你的檢查", () => {
  expect(() => checkParseQuantity(parseQuantity), "正確的版本不該讓檢查失敗").not.toThrow();
});

test("0 不會丟錯誤的版本要被抓到", () => {
  const buggy = (text: string) => {
    const quantity = Number(text);
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error("數量必須是正整數");
    }
    return quantity;
  };
  expect(() => checkParseQuantity(buggy), "parseQuantity(\"0\") 回傳 0 時，檢查應該失敗").toThrow();
});

test("abc 不會丟錯誤的版本要被抓到", () => {
  const buggy = (text: string) => {
    const quantity = Number(text);
    if (quantity < 1) {
      throw new Error("數量必須是正整數");
    }
    return quantity;
  };
  expect(() => checkParseQuantity(buggy), "parseQuantity(\"abc\") 回傳 NaN 時，檢查應該失敗").toThrow();
});

test("錯誤訊息寫錯的版本要被抓到", () => {
  const buggy = (text: string) => {
    const quantity = Number(text);
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("數量錯誤");
    }
    return quantity;
  };
  expect(() => checkParseQuantity(buggy), "錯誤訊息不是「數量必須是正整數」時，檢查應該失敗").toThrow();
});

test("回傳字串的版本要被抓到", () => {
  const buggy = ((text: string) => {
    if (!/^[1-9]\d*$/.test(text)) {
      throw new Error("數量必須是正整數");
    }
    return text;
  }) as unknown as (text: string) => number;
  expect(() => checkParseQuantity(buggy), "parseQuantity(\"3\") 回傳字串 \"3\" 時，檢查應該失敗").toThrow();
});
