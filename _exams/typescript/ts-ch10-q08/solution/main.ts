import { readFileSync } from 'node:fs'

type Product = { id: number; name: string; price: number }

function isProduct(value: unknown): value is Product {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'price' in value &&
    typeof value.price === 'number'
  )
}

const data: unknown = JSON.parse(readFileSync(0, 'utf8'))

if (!Array.isArray(data)) {
  console.log('資料不是陣列')
} else {
  const products = data.filter(isProduct)
  const skipped = data.length - products.length
  if (skipped > 0) {
    console.log(`略過 ${skipped} 筆格式不對的資料`)
  }
  let total = 0
  for (const product of products) {
    console.log(`${product.name}：${product.price} 元`)
    total += product.price
  }
  console.log(`合計：${total} 元`)
}
