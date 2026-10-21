import { expect, test } from 'vitest'
import { findById } from './find.ts'

const users = [
  { id: 1, name: '小明' },
  { id: 2, name: '小華' },
]

test('找得到', () => {
  expect(findById(users, 2), 'findById(users, 2) 應回傳小華那個物件').toBe(users[1])
  expect(findById(users, 2)?.name, '回傳的物件要保留 name').toBe('小華')
})

test('找不到回傳 undefined', () => {
  expect(findById(users, 9), '找不到時應回傳 undefined').toBeUndefined()
  expect(findById([], 1), '空陣列應回傳 undefined').toBeUndefined()
})
