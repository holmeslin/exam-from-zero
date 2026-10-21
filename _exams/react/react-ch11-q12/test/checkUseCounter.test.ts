import { afterEach, expect, test } from "vitest";
import { cleanup } from "@testing-library/react";
import { useState } from "react";
import { checkUseCounter } from "./checkUseCounter.ts";
import { useCounter } from "./useCounter.ts";

afterEach(cleanup);

function makeBuggy(opts: { defaultInitial?: number; resetTo?: number; step?: number; ignoreInitial?: boolean }) {
  return function useBuggy(initial = opts.defaultInitial ?? 0) {
    const start = opts.ignoreInitial ? 0 : initial;
    const [count, setCount] = useState(start);
    return {
      count,
      increment: () => setCount((c) => c + (opts.step ?? 1)),
      reset: () => setCount(opts.resetTo ?? start),
    };
  };
}

test("正確的 useCounter 要通過你的檢查", () => {
  checkUseCounter(useCounter);
});

test("預設值是 1 的版本要被抓到", () => {
  expect(() => checkUseCounter(makeBuggy({ defaultInitial: 1 })), "不給參數時 count 是 1，檢查應該失敗").toThrow();
});

test("reset 回到 0 的版本要被抓到", () => {
  expect(() => checkUseCounter(makeBuggy({ resetTo: 0 })), "useCounter(10) reset 後變成 0 時，檢查應該失敗").toThrow();
});

test("一次加二的版本要被抓到", () => {
  expect(() => checkUseCounter(makeBuggy({ step: 2 })), "increment 後變成 12 時，檢查應該失敗").toThrow();
});

test("忽略初始值的版本要被抓到", () => {
  expect(() => checkUseCounter(makeBuggy({ ignoreInitial: true })), "useCounter(10) 從 0 開始時，檢查應該失敗").toThrow();
});
