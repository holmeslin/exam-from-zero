import { expect, test } from 'vitest'
import { describeError } from './describe-error.ts'

test('Error 物件讀出 message', () => {
  expect(describeError(new Error('伺服器回應 404'))).toBe('伺服器回應 404')
  expect(describeError(new TypeError('壞掉了'))).toBe('壞掉了')
})

test('不是 Error 的值轉成文字', () => {
  expect(describeError('出事了'), 'throw 字串時應該回傳該字串').toBe('出事了')
  expect(describeError(42)).toBe('42')
  expect(describeError(null), 'null 也不能讓程式當掉').toBe('null')
})
