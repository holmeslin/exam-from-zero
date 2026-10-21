import { expect, test } from 'vitest'
import { minMax } from './minMax.ts'

test('minMax 回傳 [最小值, 最大值]', () => {
  const [min, max] = minMax([3, 9, -2, 5])
  expect(min, '第一個位置應該是最小值 -2').toBe(-2)
  expect(max, '第二個位置應該是最大值 9').toBe(9)
  expect(minMax([7]), 'minMax([7]) 應該是 [7, 7]').toEqual([7, 7])
  expect(minMax([4, 1]).length, '元組應該剛好兩個元素').toBe(2)
})
