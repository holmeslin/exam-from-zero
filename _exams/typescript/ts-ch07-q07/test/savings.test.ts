import { expect, test } from 'vitest'
import { Account, SavingsAccount } from './savings.ts'

test('SavingsAccount 繼承了 deposit，describe 加上年利率', () => {
  const s = new SavingsAccount('小明', 0.02)
  s.deposit(1000)
  expect(s.describe()).toBe('小明：1000 元（年利率 2%）')
})

test('addInterest 會把利息加進餘額', () => {
  const s = new SavingsAccount('小明', 0.02)
  s.deposit(1000)
  s.addInterest()
  expect(s.describe(), '1000 元加上 2% 利息應該是 1020 元').toBe('小明：1020 元（年利率 2%）')
})

test('describe 要用 super.describe() 沿用父類別的格式', () => {
  const s = new SavingsAccount('小華', 0.05)
  s.deposit(200)
  expect(s.describe()).toBe(`${Account.prototype.describe.call(s)}（年利率 5%）`)
})

test('父類別 Account 的 describe 不受影響', () => {
  const a = new Account('小美')
  a.deposit(300)
  expect(a.describe()).toBe('小美：300 元')
})

test('SavingsAccount 的實例也是 Account', () => {
  expect(new SavingsAccount('x', 0.01)).toBeInstanceOf(Account)
})
