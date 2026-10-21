const prices: Record<string, number> = { pen: 15, book: 45, eraser: 10 }

export async function getPrice(item: string): Promise<number> {
  return prices[item] ?? 0
}

export async function totalPrice(items: string[]): Promise<number> {
  let total = 0
  for (const item of items) {
    const price = await getPrice(item)
    total += price
  }
  return total
}
