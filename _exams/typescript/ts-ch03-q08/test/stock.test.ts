import { expect, test } from 'vitest'
import { countOf, restock } from './stock'

test('countOf 讀得到已存在的商品', () => {
  expect(countOf({ 鍵盤: 12, 滑鼠: 30 }, '滑鼠')).toBe(30)
  expect(countOf({ 鍵盤: 0 }, '鍵盤'), '庫存是 0 時要回傳 0').toBe(0)
})

test('countOf 遇到不存在的商品回傳 0', () => {
  expect(countOf({ 鍵盤: 12 }, '耳機'), '「耳機」不存在，應該回傳 0，不是 undefined').toBe(0)
})

test('restock 增加庫存', () => {
  const stock: Record<string, number> = { 鍵盤: 12 }
  restock(stock, '鍵盤', 3)
  expect(stock['鍵盤']).toBe(15)
  restock(stock, '螢幕', 5)
  expect(stock['螢幕'], '原本沒有「螢幕」，補 5 個之後應該是 5，不是 NaN').toBe(5)
  expect(stock).toEqual({ 鍵盤: 15, 螢幕: 5 })
})
