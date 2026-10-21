import { afterEach, expect, test } from "vitest";
import { cleanup } from "@testing-library/react";
import CategoryBar from "./CategoryBar.tsx";
import { checkCategoryBar } from "./checkCategoryBar.tsx";

afterEach(cleanup);

const categories = ["all", "keyboard", "mouse"];

test("正確的 CategoryBar 要通過你的檢查", () => {
  expect(() => checkCategoryBar(CategoryBar), "正確的版本不該讓檢查失敗").not.toThrow();
});

test("標題寫錯的版本要被抓到", () => {
  function Buggy({ current }: { current: string }) {
    return (
      <div>
        <h1>產品</h1>
        {categories.map((c) => (
          <button key={c} disabled={c === current}>{c}</button>
        ))}
      </div>
    );
  }
  expect(() => checkCategoryBar(Buggy), "標題是「產品」不是「商品」時，檢查應該失敗").toThrow();
});

test("標題不是 heading 的版本要被抓到", () => {
  function Buggy({ current }: { current: string }) {
    return (
      <div>
        <p>商品</p>
        {categories.map((c) => (
          <button key={c} disabled={c === current}>{c}</button>
        ))}
      </div>
    );
  }
  expect(() => checkCategoryBar(Buggy), "「商品」只是 <p> 不是標題時，檢查應該失敗（請用 getByRole(\"heading\", ...)）").toThrow();
});

test("永遠停用 all 的版本要被抓到", () => {
  function Buggy() {
    return (
      <div>
        <h1>商品</h1>
        {categories.map((c) => (
          <button key={c} disabled={c === "all"}>{c}</button>
        ))}
      </div>
    );
  }
  expect(() => checkCategoryBar(Buggy), "current=\"mouse\" 卻停用 all 時，檢查應該失敗").toThrow();
});

test("全部按鈕都停用的版本要被抓到", () => {
  function Buggy() {
    return (
      <div>
        <h1>商品</h1>
        {categories.map((c) => (
          <button key={c} disabled>{c}</button>
        ))}
      </div>
    );
  }
  expect(() => checkCategoryBar(Buggy), "all 也被停用時，檢查應該失敗").toThrow();
});
