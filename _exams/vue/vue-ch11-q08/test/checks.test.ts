import { expect, test } from "vitest";
import { checkUserList } from "./checks";
import UserList from "./UserList.vue";
import BadUsersTwice from "./BadUsersTwice.vue";
import BadUsersNoLoading from "./BadUsersNoLoading.vue";
import BadUsersNoError from "./BadUsersNoError.vue";

test("正確的 UserList 要通過你的檢查（記得 await flushPromises()）", async () => {
  await checkUserList(UserList);
});

test("呼叫了兩次 loadUsers 的元件，你的檢查要抓到", async () => {
  await expect(checkUserList(BadUsersTwice)).rejects.toThrow();
});

test("一開始沒有顯示「載入中…」的元件，你的檢查要抓到", async () => {
  await expect(checkUserList(BadUsersNoLoading)).rejects.toThrow();
});

test("載入失敗時沒有顯示「載入失敗」的元件，你的檢查要抓到", async () => {
  await expect(checkUserList(BadUsersNoError)).rejects.toThrow();
});
