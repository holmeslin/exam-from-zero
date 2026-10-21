import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import type { UserListProps } from "./UserList.tsx";

// UserList 從參數傳進來，評分時會換成正確或有 bug 的版本

export async function checkLoaded(UserList: ComponentType<UserListProps>) {
  // TODO：
  // 1. 傳入一個馬上成功、回傳 ["小明", "小華"] 的 loadUsers 並渲染
  // 2. 一開始畫面上有「載入中…」
  // 3. 等「小明」出現；之後要有 2 個 listitem，而且「載入中…」不見了
  throw new Error("TODO：還沒寫 checkLoaded");
}

export async function checkFailed(UserList: ComponentType<UserListProps>) {
  // TODO：傳入一個馬上失敗的 loadUsers，等「載入失敗」出現
  throw new Error("TODO：還沒寫 checkFailed");
}
