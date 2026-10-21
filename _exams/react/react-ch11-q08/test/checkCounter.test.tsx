import { afterEach, expect, test } from "vitest";
import { cleanup } from "@testing-library/react";
import { useState } from "react";
import Counter from "./Counter.tsx";
import { checkCounter } from "./checkCounter.tsx";

afterEach(cleanup);

test("正確的 Counter 要通過你的檢查", async () => {
  // 正確的版本不該讓檢查失敗
  await checkCounter(Counter);
});

test("一次加二的版本要被抓到", async () => {
  function Buggy() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>目前數字：{count}</p>
        <button onClick={() => setCount(count + 2)}>加一</button>
      </div>
    );
  }
  await expect(Promise.resolve().then(() => checkCounter(Buggy)), "按三下變成 6 時，檢查應該失敗").rejects.toThrow();
});

test("只會變成 1 的版本要被抓到", async () => {
  function Buggy() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>目前數字：{count}</p>
        <button onClick={() => setCount(1)}>加一</button>
      </div>
    );
  }
  await expect(Promise.resolve().then(() => checkCounter(Buggy)), "按三下還是 1 時，檢查應該失敗（要按三下再檢查）").rejects.toThrow();
});

test("從 1 開始的版本要被抓到", async () => {
  function Buggy() {
    const [count, setCount] = useState(1);
    return (
      <div>
        <p>目前數字：{count}</p>
        <button onClick={() => setCount(count + 1)}>加一</button>
      </div>
    );
  }
  await expect(Promise.resolve().then(() => checkCounter(Buggy)), "一開始不是 0 時，檢查應該失敗（要先檢查初始畫面）").rejects.toThrow();
});

test("一開始沒顯示 0 的版本要被抓到", async () => {
  function Buggy() {
    const [count, setCount] = useState(0);
    return (
      <div>
        <p>目前數字：{count === 0 ? "" : count}</p>
        <button onClick={() => setCount(count + 1)}>加一</button>
      </div>
    );
  }
  await expect(Promise.resolve().then(() => checkCounter(Buggy)), "一開始畫面是「目前數字：」而不是「目前數字：0」時，檢查應該失敗（要先檢查初始畫面）").rejects.toThrow();
});
