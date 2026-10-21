import { expect, test } from 'vitest'
import { Wallet } from './wallet.ts'

test('存款後 getBalance 回傳餘額', () => {
  const w = new Wallet('小明')
  w.deposit(500)
  w.deposit(300)
  expect(w.getBalance()).toBe(800)
})

test('小於等於 0 的金額不會改變餘額', () => {
  const w = new Wallet('小明')
  w.deposit(100)
  w.deposit(0)
  w.deposit(-50)
  expect(w.getBalance(), 'deposit(0) 和 deposit(-50) 應該被忽略').toBe(100)
})

test('餘額在執行時也拿不到', () => {
  const w = new Wallet('小明')
  w.deposit(100)
  expect(Object.keys(w), '執行時物件上只能看到 owner，餘額要用 # 私有欄位藏起來').toEqual(['owner'])
})
