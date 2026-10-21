import { expect, test } from 'vitest'
import { area } from './area.ts'

test('圓形', () => {
  expect(area({ kind: 'circle', radius: 1 })).toBeCloseTo(Math.PI)
})

test('長方形：寬 × 高', () => {
  expect(area({ kind: 'rectangle', width: 3, height: 4 }), '寬 3、高 4 的長方形面積是 12').toBe(12)
})

test('三角形：底 × 高 ÷ 2', () => {
  expect(area({ kind: 'triangle', base: 3, height: 4 }), '底 3、高 4 的三角形面積是 6').toBe(6)
})
