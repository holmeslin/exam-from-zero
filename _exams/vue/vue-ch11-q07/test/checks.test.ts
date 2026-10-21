import { expect, test } from "vitest";
import { checkSearchBox } from "./checks";
import SearchBox from "./SearchBox.vue";
import BadSearchNoTrim from "./BadSearchNoTrim.vue";
import BadSearchEmitsEmpty from "./BadSearchEmitsEmpty.vue";
import BadSearchPlaceholder from "./BadSearchPlaceholder.vue";

test("正確的 SearchBox 要通過你的檢查", async () => {
  await checkSearchBox(SearchBox);
});

test("沒有去掉空白就發出事件的元件，你的檢查要抓到", async () => {
  await expect(checkSearchBox(BadSearchNoTrim)).rejects.toThrow();
});

test("只輸入空白也發出 search 的元件，你的檢查要抓到", async () => {
  await expect(checkSearchBox(BadSearchEmitsEmpty)).rejects.toThrow();
});

test("沒有用 props 的 placeholder 的元件，你的檢查要抓到", async () => {
  await expect(checkSearchBox(BadSearchPlaceholder)).rejects.toThrow();
});
