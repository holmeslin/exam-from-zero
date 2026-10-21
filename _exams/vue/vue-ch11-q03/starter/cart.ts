export function applyDiscount(total: number): number {
  return total >= 3000 ? total * 0.9 : total;
}

export function parseQuantity(text: string): number {
  const quantity = Number(text);
  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("數量必須是正整數");
  }
  return quantity;
}
