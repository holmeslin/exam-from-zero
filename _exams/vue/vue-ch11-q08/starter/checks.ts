import { expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkUserList(UserList: Component) {
  // TODO：用 vi.fn 做出假的 loadUsers，檢查載入中、載入完成、載入失敗
}
