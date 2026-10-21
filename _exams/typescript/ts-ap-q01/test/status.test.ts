import { expect, test } from 'vitest'
import { Status, describe } from './status.ts'

test('Status 物件的值', () => {
  expect(Status, 'Status 應該是 { Active: "active", Inactive: "inactive" }').toEqual({ Active: 'active', Inactive: 'inactive' })
})

test('describe 用 Status 成員呼叫', () => {
  expect(describe(Status.Active)).toBe('使用中')
  expect(describe(Status.Inactive)).toBe('已停用')
})

test('describe 也能直接傳字串', () => {
  expect(describe('active')).toBe('使用中')
  expect(describe('inactive')).toBe('已停用')
})
