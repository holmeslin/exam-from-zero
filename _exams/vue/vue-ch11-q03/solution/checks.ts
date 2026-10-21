import { expect } from "vitest";

type CartFns = {
  applyDiscount: (total: number) => number;
  parseQuantity: (text: string) => number;
};

export async function checkCart({ applyDiscount, parseQuantity }: CartFns) {
  expect(applyDiscount(3000)).toBe(2700);
  expect(applyDiscount(2999)).toBe(2999);

  expect(parseQuantity("3")).toBe(3);
  expect(() => parseQuantity("0")).toThrow("數量必須是正整數");
  expect(() => parseQuantity("abc")).toThrow();
}
