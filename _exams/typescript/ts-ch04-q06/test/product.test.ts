import { expect, test } from 'vitest'
import { describeProduct } from './product.ts'

test('有庫存', () => {
  expect(describeProduct({ title: '鉛筆', price: 10, stock: 30 })).toBe('鉛筆：10 元，庫存 30 個')
})

test('沒給 stock 時庫存是 0', () => {
  expect(describeProduct({ title: '橡皮擦', price: 15 }), 'stock 沒給時應該用預設值 0').toBe('橡皮擦：15 元，庫存 0 個')
})
