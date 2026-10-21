export function lastItem<T>(items: T[]): T | undefined {
  return items[items.length - 1]
}

export function stockOf(stock: Record<string, number>, name: string): number {
  return stock[name] ?? 0
}
