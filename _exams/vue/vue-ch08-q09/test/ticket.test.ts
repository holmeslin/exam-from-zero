import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";

beforeEach(() => {
  setActivePinia(createPinia());
});

// 等 Pinia 啟用之後才載入 ticket.ts，模擬真實 App 的執行順序
async function load() {
  const { useTicketStore } = await import("./ticket");
  const { useUserStore } = await import("./user");
  return { ticket: useTicketStore(), user: useUserStore() };
}

test("載入 ticket.ts 時不能在檔案最外層呼叫 useUserStore()", async () => {
  setActivePinia(undefined as never);
  let error: unknown = null;
  try {
    await import("./ticket");
  } catch (err) {
    error = err;
  }
  expect(error, "載入 ticket.ts 就出錯了：" + String(error)).toBeNull();
});

test("會員打八折，切換會員後 total 跟著變", async () => {
  const { ticket, user } = await load();
  expect(ticket.total).toBe(300);
  ticket.addOne();
  expect(ticket.total).toBe(600);
  user.toggleMember();
  expect(ticket.total).toBe(480);
});
