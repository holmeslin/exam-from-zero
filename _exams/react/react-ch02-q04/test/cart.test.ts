import { expect, test } from 'vitest'
import { allInStock, cartTotal } from './cart.js'

const cart = [
  { name: '鍵盤', price: 1200, quantity: 1, stock: 3 },
  { name: '滑鼠', price: 600, quantity: 2, stock: 0 },
]

test('cartTotal 算出 price × quantity 的總和', () => {
  expect(cartTotal(cart), '1200×1 + 600×2 應為 2400').toBe(2400)
})

test('cartTotal 空購物車是 0', () => {
  expect(cartTotal([]), '空陣列應回傳 0（reduce 要給起始值）').toBe(0)
})

test('allInStock 要每一項都有庫存才是 true', () => {
  expect(allInStock(cart), '滑鼠 stock 是 0，應回傳 false').toBe(false)
  expect(allInStock([cart[0]]), '只有鍵盤時應回傳 true').toBe(true)
})

test('allInStock 空購物車是 true', () => {
  expect(allInStock([]), '[].every(...) 一定是 true').toBe(true)
})
