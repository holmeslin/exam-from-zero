export function addTax(price: number): number {
  return Math.round(price * 1.05)
}

export function parsePrice(text: string): number | null {
  const value = Number(text)
  return Number.isNaN(value) ? null : value
}
