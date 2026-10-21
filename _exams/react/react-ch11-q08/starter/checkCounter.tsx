import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";

// Counter 從參數傳進來，評分時會換成正確或有 bug 的版本
export async function checkCounter(Counter: ComponentType) {
  render(<Counter />);

  // TODO：
  // 1. 一開始畫面上有「目前數字：0」
  // 2. 用 user-event 按「加一」按鈕三下
  // 3. 畫面上變成「目前數字：3」
  throw new Error("TODO：還沒寫檢查");
}
