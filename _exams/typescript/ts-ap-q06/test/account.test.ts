import { expect, test } from 'vitest'
import { Account } from './account.ts'

test('建構子要設定 owner', () => {
  const account = new Account('小明', 100)
  expect(account.owner, '建構子裡要寫 this.owner = owner').toBe('小明')
})

test('deposit 累加並回傳餘額', () => {
  const account = new Account('小明', 100)
  expect(account.deposit(50), '建構子裡要寫 this.balance = balance，deposit 回傳新餘額').toBe(150)
  expect(account.deposit(20)).toBe(170)
})

test('每個帳戶的餘額各自獨立', () => {
  const a = new Account('小明', 100)
  const b = new Account('小華', 0)
  a.deposit(10)
  expect(b.deposit(5)).toBe(5)
})
