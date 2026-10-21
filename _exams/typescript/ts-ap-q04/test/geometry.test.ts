import { expect, test } from 'vitest'
import * as Geometry from './geometry.ts'

test('PI 要 export，值是 3.14', () => {
  expect(Geometry.PI, 'geometry.ts 要 export const PI = 3.14').toBe(3.14)
})

test('circleArea 用 PI 計算圓面積', () => {
  expect(Geometry.circleArea(2)).toBeCloseTo(12.56)
  expect(Geometry.circleArea(10)).toBeCloseTo(314)
  expect(Geometry.circleArea(0)).toBe(0)
})
