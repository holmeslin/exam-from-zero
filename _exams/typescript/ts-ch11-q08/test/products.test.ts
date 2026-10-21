import { expect, test } from 'vitest'
import { isProduct, parseProducts } from './products.ts'

test('isProduct 判斷正確的物件', () => {
  expect(isProduct({ name: '筆記本', price: 45 })).toBe(true)
})

test('isProduct 擋下格式不對的值', () => {
  expect(isProduct({ name: '筆記本', price: '45' }), 'price 是字串時應該是 false').toBe(false)
  expect(isProduct({ price: 45 }), '少了 name 應該是 false').toBe(false)
  expect(isProduct(null), 'null 應該是 false').toBe(false)
  expect(isProduct('筆記本'), '字串應該是 false').toBe(false)
})

test('parseProducts 回傳通過驗證的陣列', () => {
  const data = [{ name: '筆記本', price: 45 }, { name: '原子筆', price: 15 }]
  expect(parseProducts(data)).toEqual(data)
})

test('parseProducts 格式不對要丟出「資料格式不對」', () => {
  expect(() => parseProducts({ name: '筆記本', price: 45 }), '不是陣列應該 throw').toThrow('資料格式不對')
  expect(() => parseProducts([{ name: '筆記本', price: '45' }]), '有元素格式不對應該 throw').toThrow('資料格式不對')
})
