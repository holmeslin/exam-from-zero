import { expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import type { UserListProps } from "./UserList.tsx";

export async function checkLoaded(UserList: ComponentType<UserListProps>) {
  const loadUsers = () => Promise.resolve(["小明", "小華"]);
  render(<UserList loadUsers={loadUsers} />);

  screen.getByText("載入中…");

  await screen.findByText("小明");
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
  expect(screen.queryByText("載入中…")).toBeNull();
}

export async function checkFailed(UserList: ComponentType<UserListProps>) {
  const loadFail = () => Promise.reject(new Error("網路斷線"));
  render(<UserList loadUsers={loadFail} />);

  await screen.findByText("載入失敗");
}
