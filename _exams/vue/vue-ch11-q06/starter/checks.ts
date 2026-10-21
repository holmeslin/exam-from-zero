import { expect } from "vitest";
import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkNameInput(NameInput: Component) {
  const wrapper = mount(NameInput);
  // TODO：模擬打字與勾選，檢查招呼語和送出按鈕
}
