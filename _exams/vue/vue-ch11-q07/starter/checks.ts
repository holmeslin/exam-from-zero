import { expect } from "vitest";
import { mount } from "@vue/test-utils";
import type { Component } from "vue";

export async function checkSearchBox(SearchBox: Component) {
  // TODO：檢查 placeholder、送出時的 search 事件，以及空白送出不發事件
}
