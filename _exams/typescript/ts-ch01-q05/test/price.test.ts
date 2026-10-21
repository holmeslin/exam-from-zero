import { expect, test } from 'vitest'
import { formatPrice, subtotal } from './price.ts'

test('subtotal 是單價乘數量', () => {
  expect(subtotal(45, 3), 'subtotal(45, 3)').toBe(135)
  expect(subtotal(15, 10), 'subtotal(15, 10)').toBe(150)
})

test('formatPrice 四捨五入到整數並加上「 元」', () => {
  expect(formatPrice(235), 'formatPrice(235)').toBe('235 元')
  expect(formatPrice(99.6), 'formatPrice(99.6)').toBe('100 元')
  expect(formatPrice(12.3), 'formatPrice(12.3)').toBe('12 元')
})
