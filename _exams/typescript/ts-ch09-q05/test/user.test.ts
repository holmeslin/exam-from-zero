import { expect, test } from 'vitest'
import { makeUser } from './user.ts'

test('有 email 時帶上 email 屬性', () => {
  const u = makeUser('小明', 'ming@example.com')
  expect(u.name, 'name 應該是 小明').toBe('小明')
  expect(u.email, 'email 應該是 ming@example.com').toBe('ming@example.com')
})

test('沒有 email 時，物件根本不該有 email 這個屬性', () => {
  const u = makeUser('小華')
  expect(u.name, 'name 應該是 小華').toBe('小華')
  expect('email' in u, "makeUser('小華') 的結果不該有 email 屬性（'email' in u 應該是 false）").toBe(false)
})

test('明確傳入 undefined 也一樣不放 email', () => {
  const u = makeUser('小美', undefined)
  expect('email' in u, "makeUser('小美', undefined) 的結果不該有 email 屬性").toBe(false)
})
