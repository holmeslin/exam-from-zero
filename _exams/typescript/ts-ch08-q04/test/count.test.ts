import { expect, test } from 'vitest'
import { countByStatus } from './count.ts'

test('每種狀態都有計數', () => {
  const orders = [
    { status: 'pending' as const },
    { status: 'shipped' as const },
    { status: 'pending' as const },
  ]
  expect(countByStatus(orders), '沒有訂單的 cancelled 也要出現，值是 0').toEqual({
    pending: 2, shipped: 1, cancelled: 0,
  })
})

test('沒有訂單時全部是 0', () => {
  expect(countByStatus([]), 'Record<Status, number> 要求每個狀態都有值').toEqual({
    pending: 0, shipped: 0, cancelled: 0,
  })
})
