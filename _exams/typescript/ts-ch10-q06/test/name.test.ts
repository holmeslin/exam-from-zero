import { expect, test } from 'vitest'
import { getName } from './name.ts'

test('合格的物件回傳 name', () => {
  expect(getName(JSON.parse('{ "name": "小明" }'))).toBe('小明')
})

test('null 不能讓程式當掉', () => {
  expect(() => getName(null), 'typeof null 也是 "object"，記得排除 null').not.toThrow()
  expect(getName(null)).toBeUndefined()
})

test('name 不是字串、沒有 name、不是物件都回傳 undefined', () => {
  expect(getName({ name: 20 }), 'name 是數字時應該回傳 undefined').toBeUndefined()
  expect(getName({ age: 20 })).toBeUndefined()
  expect(getName('小明')).toBeUndefined()
  expect(getName(42)).toBeUndefined()
})
