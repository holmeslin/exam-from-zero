import { expect } from "vitest";

export function checkApplyDiscount(applyDiscount: (total: number) => number) {
  expect(applyDiscount(3000)).toBe(2700);
  expect(applyDiscount(2999)).toBe(2999);
}
