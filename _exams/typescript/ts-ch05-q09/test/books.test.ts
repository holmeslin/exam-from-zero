import { expect, test } from 'vitest'
import { isBook, totalPages } from './books.ts'

test('isBook 分得出書和 Podcast', () => {
  expect(isBook({ title: '小王子', pages: 96 }), '有 pages 的是書').toBe(true)
  expect(isBook({ title: '科技早餐', minutes: 42 }), 'Podcast 不是書，isBook 應該回傳 false').toBe(false)
})

test('totalPages 只加總書的頁數', () => {
  const items = [
    { title: '小王子', pages: 96 },
    { title: '科技早餐', minutes: 42 },
    { title: '夜行列車', pages: 200 },
  ]
  expect(totalPages(items), '96 + 200 = 296，Podcast 不算').toBe(296)
  expect(totalPages([]), '空陣列的總頁數是 0').toBe(0)
})
