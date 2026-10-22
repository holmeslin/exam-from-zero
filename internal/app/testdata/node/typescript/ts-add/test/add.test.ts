import { expect, test } from 'vitest'
import { add } from './add.ts'
import { five } from './numbers.ts'

test('adds', () => {
  expect(add(2, 3)).toBe(five)
})
