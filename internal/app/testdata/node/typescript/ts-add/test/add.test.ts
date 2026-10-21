import { expect, test } from 'vitest'
import { add } from './add.ts'

test('adds', () => {
  expect(add(2, 3)).toBe(5)
})
