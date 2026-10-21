import { expect, test } from 'vitest'
import { repeat } from './repeat.ts'

test('repeat 字串', () => {
  expect(repeat('哈', 3), 'repeat("哈", 3) 應回傳三個「哈」').toEqual(['哈', '哈', '哈'])
})

test('repeat 數字與物件', () => {
  expect(repeat(7, 2), 'repeat(7, 2) 應回傳 [7, 7]').toEqual([7, 7])
  const obj = { id: 1 }
  const r = repeat(obj, 2)
  expect(r.length, 'repeat(obj, 2) 應有 2 個元素').toBe(2)
  expect(r[0], '元素應該就是傳進去的同一個物件').toBe(obj)
})

test('times 為 0 回傳空陣列', () => {
  expect(repeat('a', 0), 'repeat("a", 0) 應回傳 []').toEqual([])
})
