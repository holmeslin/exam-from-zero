import { expect } from "vitest";

// parseQuantity 從參數傳進來，評分時會換成正確或有 bug 的版本
export function checkParseQuantity(parseQuantity: (text: string) => number) {
  // TODO：
  // 1. "3" 會得到數字 3
  // 2. "0" 會丟出錯誤，訊息是「數量必須是正整數」
  // 3. "abc" 會丟出錯誤
  throw new Error("TODO：還沒寫檢查");
}
