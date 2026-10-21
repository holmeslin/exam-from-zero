import { expect, test } from 'vitest'
import { inStockLabels } from './products.js'

const make = () => [
  { name: '鍵盤', price: 1200, inStock: true },
  { name: '滑鼠', price: 600, inStock: false },
  { name: '螢幕', price: 5000, inStock: true },
]

test('只留下有庫存的商品並轉成文字', () => {
  expect(inStockLabels(make())).toEqual(['鍵盤：1200 元', '螢幕：5000 元'])
})

test('全部缺貨時得到空陣列', () => {
  expect(inStockLabels([{ name: '耳機', price: 900, inStock: false }]), '沒有符合的應回傳 []').toEqual([])
})

test('不改動原本的陣列', () => {
  const products = make()
  const before = JSON.stringify(products)
  inStockLabels(products)
  expect(JSON.stringify(products), '原本的 products 被改到了').toBe(before)
})
