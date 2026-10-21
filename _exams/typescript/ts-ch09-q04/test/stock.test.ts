import { expect, test } from 'vitest'
import { lastItem, stockOf } from './stock.ts'

test('lastItem 回傳最後一個元素', () => {
  expect(lastItem([90, 85, 77]), 'lastItem([90, 85, 77]) 應該是 77').toBe(77)
  expect(lastItem(['買牛奶']), "lastItem(['買牛奶']) 應該是 '買牛奶'").toBe('買牛奶')
})

test('lastItem 遇到空陣列回傳 undefined', () => {
  expect(lastItem([]), 'lastItem([]) 應該是 undefined').toBeUndefined()
})

test('stockOf 查得到就回傳數量', () => {
  expect(stockOf({ 鍵盤: 12, 滑鼠: 0 }, '鍵盤'), "stockOf(..., '鍵盤') 應該是 12").toBe(12)
  expect(stockOf({ 鍵盤: 12, 滑鼠: 0 }, '滑鼠'), "庫存是 0 時要回傳 0").toBe(0)
})

test('stockOf 查不到就回傳 0', () => {
  expect(stockOf({ 鍵盤: 12 }, '耳機'), "stockOf({ 鍵盤: 12 }, '耳機') 應該是 0，不是 undefined").toBe(0)
})
