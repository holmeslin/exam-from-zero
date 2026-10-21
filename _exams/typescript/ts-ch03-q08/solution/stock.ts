export type Stock = Record<string, number>;

export function countOf(stock: Stock, name: string): number {
  return stock[name] ?? 0;
}

export function restock(stock: Stock, name: string, amount: number): void {
  stock[name] = (stock[name] ?? 0) + amount;
}
