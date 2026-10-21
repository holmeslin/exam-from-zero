import { expect, test } from 'vitest'
import { area } from './area.ts'

test('area', () => {
  expect(area(3, 4)).toBe(12)
  expect(area(0, 5)).toBe(0)
})
