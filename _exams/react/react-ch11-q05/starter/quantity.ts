// 要測的函式（不用改）
export function parseQuantity(text: string): number {
  const quantity = Number(text);
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("數量必須是正整數");
  }
  return quantity;
}
