import { describe, expect, it } from "vitest";
import { canDelete } from "./canDelete";

describe("canDelete", () => {
  it("沒設定暗號、cookie 是空字串時，要拒絕", () => {
    expect(canDelete("", ""), "忘了設定 NUXT_ADMIN_TOKEN 時，空的 cookie 不應該通過").toBe(false);
  });
  it("沒設定暗號時，就算 cookie 有值也要拒絕", () => {
    expect(canDelete("", "demo-secret-token"), "沒設定暗號時，誰都不能刪").toBe(false);
  });
  it("沒設定暗號、也沒帶 cookie 時，要拒絕", () => {
    expect(canDelete("", undefined)).toBe(false);
  });
  it("有設定暗號、cookie 猜錯時，要拒絕", () => {
    expect(canDelete("demo-secret-token", "猜錯")).toBe(false);
  });
  it("有設定暗號、沒帶 cookie 時，要拒絕", () => {
    expect(canDelete("demo-secret-token", undefined)).toBe(false);
  });
  it("有設定暗號、cookie 正確時，要允許", () => {
    expect(canDelete("demo-secret-token", "demo-secret-token"), "暗號正確時應該可以刪除").toBe(true);
  });
});
