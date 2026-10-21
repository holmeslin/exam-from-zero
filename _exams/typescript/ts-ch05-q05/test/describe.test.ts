import { expect, test } from 'vitest'
import { describe as describeItem } from './describe.ts'

test('書：印出頁數', () => {
  expect(describeItem({ title: '小王子', pages: 96 })).toBe('小王子，共 96 頁')
})

test('Podcast：印出分鐘數', () => {
  expect(describeItem({ title: '科技早餐', minutes: 42 })).toBe('科技早餐，長 42 分鐘')
})

test('頁數是 0 的書也要當成書', () => {
  expect(describeItem({ title: '空白筆記', pages: 0 }), '用 in 檢查屬性存不存在，不要看值是不是真值').toBe('空白筆記，共 0 頁')
})
