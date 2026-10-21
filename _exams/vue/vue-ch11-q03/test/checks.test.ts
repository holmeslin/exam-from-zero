import { expect, test } from "vitest";
import { applyDiscount, parseQuantity } from "./cart";
import { checkCart } from "./checks";

const strictParse = parseQuantity;
const sloppyParse = (text: string) => {
  const quantity = Number(text);
  if (Number.isNaN(quantity) || quantity < 0) throw new Error("數量必須是正整數");
  return quantity;
};

test("正確的 cart.ts 要通過你的檢查", async () => {
  await checkCart({ applyDiscount, parseQuantity });
});

test("applyDiscount 用了 >（剛好 3000 不打折），你的檢查要抓到", async () => {
  const bad = (total: number) => (total > 3000 ? total * 0.9 : total);
  await expect(checkCart({ applyDiscount: bad, parseQuantity: strictParse })).rejects.toThrow();
});

test("applyDiscount 連 2999 都打折，你的檢查要抓到", async () => {
  const bad = (total: number) => (total >= 2000 ? total * 0.9 : total);
  await expect(checkCart({ applyDiscount: bad, parseQuantity: strictParse })).rejects.toThrow();
});

test("parseQuantity 收下了 \"0\"，你的檢查要抓到", async () => {
  await expect(checkCart({ applyDiscount, parseQuantity: sloppyParse })).rejects.toThrow();
});
