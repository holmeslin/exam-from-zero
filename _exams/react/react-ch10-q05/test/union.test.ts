import { expect, test } from 'vitest'
import { greet, show } from './union.ts'

test('show：數字取兩位小數', () => {
  expect(show(3), 'show(3)').toBe('3.00')
  expect(show(2.5), 'show(2.5)').toBe('2.50')
})

test('show：字串轉大寫', () => {
  expect(show('abc'), "show('abc')").toBe('ABC')
})

test('greet：有使用者時打招呼', () => {
  expect(greet({ name: '小明' }), "greet({ name: '小明' })").toBe('你好，小明')
})

test('greet：null 時請對方先登入', () => {
  expect(greet(null), 'greet(null)').toBe('請先登入')
})
