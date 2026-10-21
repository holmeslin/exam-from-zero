import { expect, test } from 'vitest'
import { itemNames, orderTotal } from './order'

const order = {
  id: 1,
  items: [
    { name: '鍵盤', price: 1200, quantity: 1 },
    { name: '滑鼠', price: 600, quantity: 2 },
  ],
}

test('itemNames 回傳所有商品名稱', () => {
  expect(itemNames(order)).toEqual(['鍵盤', '滑鼠'])
  expect(itemNames({ id: 2, items: [] })).toEqual([])
})

test('orderTotal 計算 price × quantity 的總和', () => {
  expect(orderTotal(order), '1200×1 + 600×2 應該是 2400').toBe(2400)
  expect(orderTotal({ id: 2, items: [] }), '沒有商品時總金額是 0').toBe(0)
})
