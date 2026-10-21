import { expect } from "vitest";

export function checkParseQuantity(parseQuantity: (text: string) => number) {
  expect(parseQuantity("3")).toBe(3);
  expect(() => parseQuantity("0")).toThrow("數量必須是正整數");
  expect(() => parseQuantity("abc")).toThrow();
}
