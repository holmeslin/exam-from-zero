import { readFileSync } from 'node:fs'

type Product = { id: number; name: string; price: number }

function isProduct(value: unknown): value is Product {
  // TODO: 檢查 id、name、price 三個屬性
  return typeof value === 'object' && value !== null
}

const data: unknown = JSON.parse(readFileSync(0, 'utf8'))

if (!Array.isArray(data)) {
  console.log('資料不是陣列')
} else {
  const products = data
  let total = 0
  for (const product of products) {
    console.log(`${product.name}：${product.price} 元`)
    total += product.price
  }
  console.log(`合計：${total} 元`)
}
