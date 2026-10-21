import { expect, test } from 'vitest'
import { cartTotal, findById, hasExpensive } from './cart.js'

const cart = [
  { id: 1, name: '鍵盤', price: 1200, quantity: 1 },
  { id: 2, name: '滑鼠', price: 600, quantity: 2 },
  { id: 3, name: '螢幕', price: 5000, quantity: 1 },
]

test('findById 找到第一個符合的商品本身', () => {
  expect(findById(cart, 2), 'findById(cart, 2) 應是滑鼠那一筆').toBe(cart[1])
})

test('findById 找不到時回傳 undefined', () => {
  expect(findById(cart, 99), '找不到應回傳 undefined').toBeUndefined()
})

test('hasExpensive 判斷是否有任一項超過上限', () => {
  expect(hasExpensive(cart, 3000), '螢幕 5000 超過 3000').toBe(true)
  expect(hasExpensive(cart, 9000), '沒有超過 9000 的').toBe(false)
  expect(hasExpensive([], 0), '空陣列應為 false').toBe(false)
})

test('cartTotal 計算單價乘數量的總和', () => {
  expect(cartTotal(cart), '1200 + 600*2 + 5000 = 7400').toBe(7400)
  expect(cartTotal([]), '空購物車總額為 0').toBe(0)
})
