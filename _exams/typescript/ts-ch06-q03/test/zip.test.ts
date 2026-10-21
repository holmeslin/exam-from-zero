import { expect, test } from 'vitest'
import { zip } from './zip.ts'

test('一樣長的陣列', () => {
  expect(zip(['小明', '小華'], [90, 85]), 'zip(["小明","小華"], [90, 85]) 結果不對').toEqual([
    ['小明', 90],
    ['小華', 85],
  ])
})

test('長度以較短的為準', () => {
  expect(zip([1, 2, 3], ['a']), 'zip([1,2,3], ["a"]) 應只有一組').toEqual([[1, 'a']])
  expect(zip([true], [1, 2, 3]), 'zip([true], [1,2,3]) 應只有一組').toEqual([[true, 1]])
})

test('空陣列', () => {
  expect(zip([], [1, 2]), '有一邊是空陣列時應回傳 []').toEqual([])
})
