import { expect, test } from 'vitest'
import { formatId } from './format-id.ts'

test('字串編號轉成大寫', () => {
  expect(formatId('a01'), "formatId('a01') 應該回傳 'A01'").toBe('A01')
  expect(formatId('b2c'), "formatId('b2c') 應該回傳 'B2C'").toBe('B2C')
})

test('數字編號補零成 4 位數', () => {
  expect(formatId(7), "formatId(7) 應該回傳 '0007'").toBe('0007')
  expect(formatId(123), "formatId(123) 應該回傳 '0123'").toBe('0123')
  expect(formatId(4567), "formatId(4567) 應該回傳 '4567'").toBe('4567')
})
