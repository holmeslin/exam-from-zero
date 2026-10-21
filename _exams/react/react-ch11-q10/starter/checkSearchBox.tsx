import { expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import type { SearchBoxProps } from "./SearchBox.tsx";

// SearchBox 從參數傳進來，評分時會換成正確或有 bug 的版本
export async function checkSearchBox(SearchBox: ComponentType<SearchBoxProps>) {
  // TODO：
  // 1. 用 vi.fn() 做一個假的 onSearch，傳給 SearchBox 並渲染
  // 2. 在「搜尋」輸入框打「滑鼠」，這時 onSearch 還不能被呼叫
  // 3. 按「送出」，onSearch 剛好被呼叫 1 次，參數是 "滑鼠"
  throw new Error("TODO：還沒寫檢查");
}
