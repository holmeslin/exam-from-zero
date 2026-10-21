import { expect } from "vitest";

// applyDiscount 從參數傳進來，評分時會換成正確或有 bug 的版本
export function checkApplyDiscount(applyDiscount: (total: number) => number) {
  // TODO：檢查邊界兩側：3000 要打九折、2999 不打折
  throw new Error("TODO：還沒寫檢查");
}
