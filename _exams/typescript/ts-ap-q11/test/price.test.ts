import { describe, expect, test } from 'vitest'
import { addTax, parsePrice } from './price.ts'

describe('addTax', () => {
  test('加上 5% 的稅並四捨五入', () => {
    expect(addTax(100)).toBe(105)
    expect(addTax(99)).toBe(104)
    expect(addTax(0)).toBe(0)
  })
})

describe('parsePrice', () => {
  test('看得懂數字就回傳數字', () => {
    expect(parsePrice('120')).toBe(120)
    expect(parsePrice('3.5')).toBe(3.5)
  })

  test('看不懂就回傳 null', () => {
    expect(parsePrice('一百')).toBeNull()
    expect(parsePrice('abc')).toBeNull()
  })
})
