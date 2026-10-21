import { expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import type { useCounter as UseCounter } from "./useCounter.ts";

// useCounter 從參數傳進來，評分時會換成正確或有 bug 的版本
export function checkUseCounter(useCounter: typeof UseCounter) {
  // TODO：
  // 1. 不給參數時，count 一開始是 0
  // 2. useCounter(10)：increment 之後 count 是 11，再 reset 之後回到 10
  throw new Error("TODO：還沒寫檢查");
}
