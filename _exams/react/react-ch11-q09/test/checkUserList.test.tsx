import { afterEach, expect, test } from "vitest";
import { cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";
import UserList from "./UserList.tsx";
import type { UserListProps } from "./UserList.tsx";
import { checkFailed, checkLoaded } from "./checkUserList.tsx";

afterEach(cleanup);

const fails = (check: typeof checkLoaded, C: typeof UserList) =>
  Promise.resolve().then(() => check(C));

// 共用的有 bug 版本：options 決定哪裡寫錯
function makeBuggy(opts: { loading?: string | null; errorText?: string; onlyFirst?: boolean; keepLoading?: boolean }) {
  return function Buggy({ loadUsers }: UserListProps) {
    const [users, setUsers] = useState<string[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      loadUsers()
        .then(setUsers)
        .catch(() => setError(opts.errorText ?? "載入失敗"));
    }, [loadUsers]);
    const loading = opts.loading === undefined ? "載入中…" : opts.loading;
    if (error !== null) return <p>{error}</p>;
    if (users === null) return loading === null ? null : <p>{loading}</p>;
    const shown = opts.onlyFirst ? users.slice(0, 1) : users;
    return (
      <div>
        {opts.keepLoading && <p>載入中…</p>}
        <ul>
          {shown.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </div>
    );
  };
}

test("正確的 UserList 要通過 checkLoaded", async () => {
  await checkLoaded(UserList);
});

test("正確的 UserList 要通過 checkFailed", async () => {
  await checkFailed(UserList);
});

test("沒有顯示「載入中…」的版本要被 checkLoaded 抓到", async () => {
  await expect(fails(checkLoaded, makeBuggy({ loading: null })), "一開始沒有「載入中…」時，checkLoaded 應該失敗").rejects.toThrow();
});

test("只列出第一個人的版本要被 checkLoaded 抓到", async () => {
  await expect(fails(checkLoaded, makeBuggy({ onlyFirst: true })), "只有 1 個 listitem 時，checkLoaded 應該失敗").rejects.toThrow();
});

test("載入完「載入中…」還在的版本要被 checkLoaded 抓到", async () => {
  await expect(fails(checkLoaded, makeBuggy({ keepLoading: true })), "載入完成後「載入中…」還在時，checkLoaded 應該失敗").rejects.toThrow();
});

test("錯誤訊息寫錯的版本要被 checkFailed 抓到", async () => {
  await expect(fails(checkFailed, makeBuggy({ errorText: "發生錯誤" })), "失敗時顯示的不是「載入失敗」時，checkFailed 應該失敗").rejects.toThrow();
});
