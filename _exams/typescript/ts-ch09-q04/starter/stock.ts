// 打開 noUncheckedIndexedAccess 之後，用 [] 讀出來的值都可能是 undefined
export function lastItem<T>(items: T[]): T | undefined {
  return items[items.length]
}

export function stockOf(stock: Record<string, number>, name: string): number {
  return stock[name]
}
