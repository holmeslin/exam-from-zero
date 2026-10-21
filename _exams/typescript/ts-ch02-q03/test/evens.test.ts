import { expect, test } from 'vitest'
import { evens } from './evens.ts'

test('evens 只留下偶數', () => {
  expect(evens([1, 2, 3, 4, 6]), 'evens([1, 2, 3, 4, 6]) 應該是 [2, 4, 6]').toEqual([2, 4, 6])
  expect(evens([1, 3]), '沒有偶數時應該回傳空陣列').toEqual([])
  expect(evens([]), '空陣列應該回傳空陣列').toEqual([])
})
