import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";

// CategoryBar 從參數傳進來，評分時會換成正確或有 bug 的版本
export function checkCategoryBar(CategoryBar: ComponentType<{ current: string }>) {
  render(<CategoryBar current="mouse" />);

  // TODO：
  // 1. 有一個名稱是「商品」的標題
  // 2. 名稱是 mouse 的按鈕不能按（disabled）
  // 3. 名稱是 all 的按鈕可以按
  throw new Error("TODO：還沒寫檢查");
}
