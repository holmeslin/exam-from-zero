import { beforeEach, expect, test } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCounterStore } from "./counter";

beforeEach(() => {
  setActivePinia(createPinia());
});

test("store 的名字是 counter，count 從 0 開始", () => {
  const counter = useCounterStore();
  expect(counter.$id).toBe("counter");
  expect(counter.count).toBe(0);
});

test("increment 讓 count 加一", () => {
  const counter = useCounterStore();
  expect(typeof counter.increment, "store 沒有回傳 increment 函式").toBe("function");
  counter.increment();
  counter.increment();
  expect(counter.count).toBe(2);
});

test("呼叫兩次 useCounterStore() 拿到同一個 store", () => {
  const a = useCounterStore();
  const b = useCounterStore();
  a.increment();
  expect(b.count).toBe(1);
});
