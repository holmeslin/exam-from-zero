import { expect, test } from 'vitest'
import { convert } from './convert.ts'

test('傳字串回傳數字', () => {
  expect(convert('42'), 'convert("42") 應該回傳數字 42').toBe(42)
  expect(convert('3.5'), 'convert("3.5") 應該回傳數字 3.5').toBe(3.5)
})

test('傳數字回傳字串', () => {
  expect(convert(42), 'convert(42) 應該回傳字串 "42"').toBe('42')
  expect(convert(0), 'convert(0) 應該回傳字串 "0"').toBe('0')
})
