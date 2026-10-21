import { expect, test } from 'vitest'
import { isUser } from './user.ts'

test('合格的 User', () => {
  expect(isUser({ name: '小明', age: 20 })).toBe(true)
})

test('不合格的資料', () => {
  expect(isUser({ name: '小華', age: '二十' }), 'age 是字串時應該回傳 false').toBe(false)
  expect(isUser({ name: '小美' }), '少了 age 時應該回傳 false').toBe(false)
  expect(isUser({ name: 1, age: 20 }), 'name 不是字串時應該回傳 false').toBe(false)
  expect(isUser(null), 'null 應該回傳 false').toBe(false)
  expect(isUser('小明')).toBe(false)
})
