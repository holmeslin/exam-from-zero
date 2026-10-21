import { expect, test } from 'vitest'
import { availableLabels } from './products.js'

const products = [
  { name: '鍵盤', price: 1200, inStock: true },
  { name: '滑鼠', price: 600, inStock: false },
  { name: '螢幕', price: 5000, inStock: true },
]

test('只留下有庫存的，並轉成「名稱：價格 元」', () => {
  expect(availableLabels(products), '應只剩鍵盤和螢幕，格式為「名稱：價格 元」').toEqual(['鍵盤：1200 元', '螢幕：5000 元'])
})

test('全部沒庫存時得到空陣列', () => {
  expect(availableLabels([{ name: '耳機', price: 900, inStock: false }]), '沒有任何商品有庫存時應回傳 []').toEqual([])
})

test('不改動原本的陣列', () => {
  const copy = products.map((p) => ({ ...p }))
  availableLabels(products)
  expect(products, 'products 不該被改動').toEqual(copy)
})
