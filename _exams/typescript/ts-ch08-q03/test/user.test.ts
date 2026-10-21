import { expect, test } from 'vitest'
import { toPublicUser, updateUser } from './user.ts'

const make = () => ({ id: 1, name: '小明', email: 'ming@example.com', password: '123456' })

test('updateUser 回傳套用修改後的使用者', () => {
  const user = make()
  expect(updateUser(user, { email: 'ming@example.tw' })).toEqual({
    id: 1, name: '小明', email: 'ming@example.tw', password: '123456',
  })
})

test('updateUser 不可以修改原本的物件', () => {
  const user = make()
  const updated = updateUser(user, { name: '小華' })
  expect(user.name, '原本的 user.name 被改掉了，應該回傳新物件').toBe('小明')
  expect(updated, 'updateUser 應該回傳新物件，而不是原本的 user').not.toBe(user)
})

test('toPublicUser 真的拿掉 password', () => {
  const shown = toPublicUser(make())
  expect('password' in shown, 'Omit 只影響型別，執行時物件裡仍有 password').toBe(false)
  expect(shown).toEqual({ id: 1, name: '小明', email: 'ming@example.com' })
})
