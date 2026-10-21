export type Product = {
  name: string
  price: number
}

export function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number'
  )
}

export function parseProducts(data: unknown): Product[] {
  if (!Array.isArray(data) || !data.every(isProduct)) {
    throw new Error('資料格式不對')
  }
  return data
}
