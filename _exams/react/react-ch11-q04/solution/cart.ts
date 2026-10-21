// 要測的函式（不用改）：滿 3000 元打九折
export function applyDiscount(total: number): number {
  return total >= 3000 ? total * 0.9 : total;
}
