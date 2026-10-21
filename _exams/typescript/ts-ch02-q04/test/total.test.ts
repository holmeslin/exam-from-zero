import { expect, test } from 'vitest'
import { total } from './total.ts'

test('total 加總成績', () => {
  expect(total([90, 85, 77]), 'total([90, 85, 77]) 應該是 252').toBe(252)
  expect(total([5]), 'total([5]) 應該是 5').toBe(5)
})

test('空陣列回傳 0', () => {
  expect(() => total([]), 'total([]) 不應該丟出錯誤').not.toThrow()
  expect(total([]), 'total([]) 應該是 0').toBe(0)
})
