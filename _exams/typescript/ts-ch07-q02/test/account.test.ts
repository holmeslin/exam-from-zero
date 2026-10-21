import { expect, test } from 'vitest'
import { Account } from './account.ts'

test('deposit 會增加餘額', () => {
  const a = new Account('小明')
  a.deposit(500)
  a.deposit(300)
  expect(a.balance, '存了 500 和 300，餘額應該是 800').toBe(800)
})

test('withdraw 餘額夠時扣款並回傳 true', () => {
  const a = new Account('小明')
  a.deposit(500)
  expect(a.withdraw(200), '餘額足夠時應回傳 true').toBe(true)
  expect(a.balance).toBe(300)
})

test('withdraw 餘額不足時不扣款並回傳 false', () => {
  const a = new Account('小明')
  a.deposit(100)
  expect(a.withdraw(150), '餘額不足時應回傳 false').toBe(false)
  expect(a.balance, '餘額不足時不能扣款').toBe(100)
})

test('describe 回傳指定格式', () => {
  const a = new Account('小華')
  a.deposit(800)
  expect(a.describe()).toBe('小華 的餘額：800 元')
})
