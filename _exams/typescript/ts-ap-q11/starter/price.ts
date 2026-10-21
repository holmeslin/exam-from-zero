export function addTax(price: number): number {
  return Math.round(price * 1.5)
}

export function parsePrice(text: string): number | null {
  return Number(text)
}
