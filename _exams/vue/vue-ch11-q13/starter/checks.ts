import { expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import type { Component } from "vue";
import { useCartStore } from "./cart";

export async function checkCartSummary(CartSummary: Component) {
  // TODO：用 createTestingPinia 掛載 CartSummary，
  // 檢查件數、合計，以及按「清空」會呼叫 clear
}
