import { expect, test } from 'vitest'
import { introduce, minMax, swap } from './tools.js'

test('introduce 使用 name 與 age', () => {
  expect(introduce({ name: '小明', age: 20, city: '台北' })).toBe('小明，20 歲')
})

test('introduce 沒有 age 時預設 18', () => {
  expect(introduce({ name: '小華' }), '缺少 age 應當作 18').toBe('小華，18 歲')
})

test('minMax 回傳 [最小, 最大]', () => {
  const [min, max] = minMax([3, 1, 4, 1, 5])
  expect(min, '最小值應為 1').toBe(1)
  expect(max, '最大值應為 5').toBe(5)
  expect(minMax([7]), '只有一個數時兩者相同').toEqual([7, 7])
})

test('swap 交換順序', () => {
  expect(swap(1, 2)).toEqual([2, 1])
  expect(swap('紅', '藍')).toEqual(['藍', '紅'])
})
