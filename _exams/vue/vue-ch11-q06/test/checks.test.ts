import { expect, test } from "vitest";
import { checkNameInput } from "./checks";
import NameInput from "./NameInput.vue";
import BadNameNoGreeting from "./BadNameNoGreeting.vue";
import BadNameAlwaysEnabled from "./BadNameAlwaysEnabled.vue";
import BadNameNeverEnabled from "./BadNameNeverEnabled.vue";

test("正確的 NameInput 要通過你的檢查（別忘了 await）", async () => {
  await checkNameInput(NameInput);
});

test("招呼語沒有名字的元件，你的檢查要抓到", async () => {
  await expect(checkNameInput(BadNameNoGreeting)).rejects.toThrow();
});

test("沒勾同意也能按送出的元件，你的檢查要抓到", async () => {
  await expect(checkNameInput(BadNameAlwaysEnabled)).rejects.toThrow();
});

test("勾了同意還是不能按送出的元件，你的檢查要抓到", async () => {
  await expect(checkNameInput(BadNameNeverEnabled)).rejects.toThrow();
});
