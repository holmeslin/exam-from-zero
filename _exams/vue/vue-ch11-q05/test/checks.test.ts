import { expect, test } from "vitest";
import { checkProductCard } from "./checks";
import ProductCard from "./ProductCard.vue";
import BadCardAlwaysSoldOut from "./BadCardAlwaysSoldOut.vue";
import BadCardNoComma from "./BadCardNoComma.vue";
import BadCardNeverSoldOut from "./BadCardNeverSoldOut.vue";

test("正確的 ProductCard 要通過你的檢查", async () => {
  await checkProductCard(ProductCard);
});

test("沒售完也顯示「已售完」的元件，你的檢查要抓到", async () => {
  await expect(checkProductCard(BadCardAlwaysSoldOut)).rejects.toThrow();
});

test("價格沒有千分位的元件，你的檢查要抓到", async () => {
  await expect(checkProductCard(BadCardNoComma)).rejects.toThrow();
});

test("售完也不顯示「已售完」的元件，你的檢查要抓到", async () => {
  await expect(checkProductCard(BadCardNeverSoldOut)).rejects.toThrow();
});
