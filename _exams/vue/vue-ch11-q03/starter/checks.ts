import { expect } from "vitest";

type CartFns = {
  applyDiscount: (total: number) => number;
  parseQuantity: (text: string) => number;
};

export async function checkCart({ applyDiscount, parseQuantity }: CartFns) {
  // TODO：用 expect 檢查 applyDiscount 的邊界（3000、2999），
  // 以及 parseQuantity 的正常值與丟出錯誤的情況
}
