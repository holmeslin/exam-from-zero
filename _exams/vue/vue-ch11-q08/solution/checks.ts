import { expect, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkUserList(UserList: Component) {
  const loadUsers = vi.fn().mockResolvedValue(["小明", "小華"]);
  const wrapper = mount(UserList, { props: { loadUsers } });
  expect(wrapper.text()).toBe("載入中…");

  await flushPromises();

  expect(loadUsers).toHaveBeenCalledTimes(1);
  expect(wrapper.findAll("li").map((li) => li.text())).toEqual(["小明", "小華"]);

  const loadFail = vi.fn().mockRejectedValue(new Error("網路斷線"));
  const failed = mount(UserList, { props: { loadUsers: loadFail } });
  await flushPromises();
  expect(failed.text()).toBe("載入失敗");
}
