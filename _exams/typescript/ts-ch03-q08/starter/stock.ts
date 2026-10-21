export type Stock = Record<string, number>;

// 回傳某個商品的庫存；商品不存在時回傳 0
export function countOf(stock: Stock, name: string): number {
  return stock[name];
}

// 把 amount 加到某個商品的庫存上（直接修改 stock）；商品原本不存在時當作 0
export function restock(stock: Stock, name: string, amount: number): void {
  stock[name] = stock[name] + amount;
}
