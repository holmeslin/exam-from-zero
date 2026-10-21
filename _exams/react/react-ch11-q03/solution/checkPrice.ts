import { expect } from "vitest";

export function checkFormatPrice(formatPrice: (price: number) => string) {
  expect(formatPrice(1200)).toBe("NT$ 1,200");
}
