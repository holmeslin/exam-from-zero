import { expect, test } from 'vitest'
import { describeError } from './describe-error.ts'

test('Error 物件：讀它的 message', () => {
  expect(describeError(new Error('找不到檔案'))).toBe('錯誤：找不到檔案')
  expect(describeError(new TypeError('型別不對')), 'TypeError 也是一種 Error').toBe('錯誤：型別不對')
})

test('字串：直接接在後面', () => {
  expect(describeError('網路斷線')).toBe('錯誤：網路斷線')
})

test('null：沒有錯誤', () => {
  expect(describeError(null)).toBe('沒有錯誤')
})
