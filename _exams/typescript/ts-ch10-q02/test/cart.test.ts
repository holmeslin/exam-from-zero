import { expect, test } from 'vitest'
import { totalPrice } from './cart.ts'

test('totalPrice 回傳數字合計', async () => {
  const total = await totalPrice(['pen', 'book'])
  expect(typeof total, 'totalPrice 應該回傳數字，不是字串；是不是少寫了 await？').toBe('number')
  expect(total).toBe(60)
})

test('totalPrice 其他情況', async () => {
  expect(await totalPrice([])).toBe(0)
  expect(await totalPrice(['eraser', 'eraser', 'pen'])).toBe(35)
})
