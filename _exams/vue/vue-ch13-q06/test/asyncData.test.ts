import { expect, test, vi } from "vitest";
import { useAsyncData } from "./asyncData";

test("伺服器第一次執行：呼叫 fn 並把結果放進 payload", async () => {
  const payload: Record<string, unknown> = {};
  const fn = vi.fn(async () => ({ title: "hello" }));
  const data = await useAsyncData(payload, "post-1", fn);
  expect(data).toEqual({ title: "hello" });
  expect(fn, "payload 裡沒有這個 key 時，fn 要執行一次").toHaveBeenCalledTimes(1);
  expect(payload["post-1"], "結果要用 key 存進 payload").toEqual({ title: "hello" });
});

test("瀏覽器 hydration：payload 裡已經有 key，就不再執行 fn", async () => {
  const payload: Record<string, unknown> = { "post-1": { title: "伺服器抓的" } };
  const fn = vi.fn(async () => ({ title: "瀏覽器又抓一次" }));
  const data = await useAsyncData(payload, "post-1", fn);
  expect(fn, "payload 已經有這個 key，不應該再執行 fn").not.toHaveBeenCalled();
  expect(data).toEqual({ title: "伺服器抓的" });
});

test("存的值是 0 或空字串也要直接拿來用", async () => {
  const payload: Record<string, unknown> = { count: 0, name: "" };
  const fn = vi.fn(async () => 99);
  expect(await useAsyncData(payload, "count", fn)).toBe(0);
  expect(await useAsyncData(payload, "name", fn)).toBe("");
  expect(fn, "判斷 key 有沒有存在，不要用值是不是 truthy 判斷").not.toHaveBeenCalled();
});

test("不同的 key 是不同的資料", async () => {
  const payload: Record<string, unknown> = { "post-1": "第一篇" };
  const fn = vi.fn(async () => "第二篇");
  expect(await useAsyncData(payload, "post-2", fn)).toBe("第二篇");
  expect(fn).toHaveBeenCalledTimes(1);
  expect(payload).toEqual({ "post-1": "第一篇", "post-2": "第二篇" });
});
