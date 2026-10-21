import { afterEach, expect, test } from "vitest";
import { cleanup } from "@testing-library/react";
import { useState } from "react";
import type { FormEvent } from "react";
import SearchBox from "./SearchBox.tsx";
import type { SearchBoxProps } from "./SearchBox.tsx";
import { checkSearchBox } from "./checkSearchBox.tsx";

afterEach(cleanup);

type Bug = "eachKey" | "empty" | "twice" | "never";

function makeBuggy(bug: Bug) {
  return function Buggy({ onSearch }: SearchBoxProps) {
    const [keyword, setKeyword] = useState("");
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (bug === "never") return;
      onSearch(bug === "empty" ? "" : keyword);
      if (bug === "twice") onSearch(keyword);
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>
          搜尋
          <input
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              if (bug === "eachKey") onSearch(e.target.value);
            }}
          />
        </label>
        <button>送出</button>
      </form>
    );
  };
}

const run = (bug: Bug) => Promise.resolve().then(() => checkSearchBox(makeBuggy(bug)));

test("正確的 SearchBox 要通過你的檢查", async () => {
  await checkSearchBox(SearchBox);
});

test("打字時就呼叫 onSearch 的版本要被抓到", async () => {
  await expect(run("eachKey"), "還沒送出就呼叫 onSearch 時，檢查應該失敗").rejects.toThrow();
});

test("用空字串呼叫的版本要被抓到", async () => {
  await expect(run("empty"), "onSearch 收到 \"\" 而不是 \"滑鼠\" 時，檢查應該失敗").rejects.toThrow();
});

test("送出時呼叫兩次的版本要被抓到", async () => {
  await expect(run("twice"), "onSearch 被呼叫 2 次時，檢查應該失敗").rejects.toThrow();
});

test("送出時沒有呼叫的版本要被抓到", async () => {
  await expect(run("never"), "onSearch 完全沒被呼叫時，檢查應該失敗").rejects.toThrow();
});
