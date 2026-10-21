import { expect, test } from 'vitest'
import { describe as describeValue } from './describe.ts'

test('字串轉大寫', () => {
  expect(describeValue('abc'), "describe('abc') 應該是 'ABC'").toBe('ABC')
})

test('數字取一位小數', () => {
  expect(describeValue(3), "describe(3) 應該是 '3.0'").toBe('3.0')
  expect(describeValue(2.46), "describe(2.46) 應該是 '2.5'").toBe('2.5')
})

test('其他型別回傳「不支援」', () => {
  expect(describeValue(true), "describe(true) 應該是 '不支援'").toBe('不支援')
  expect(describeValue(null), "describe(null) 應該是 '不支援'").toBe('不支援')
})
