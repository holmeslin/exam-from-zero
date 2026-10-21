import { expect, test } from 'vitest'
import { countActive, describeOrder, isActive, type Order } from './orders.ts'

const orders: Order[] = [
  { status: 'pending' },
  { status: 'shipped', trackingNumber: 'TW123456' },
  { status: 'delivered', deliveredAt: new Date(2026, 9, 18) },
  { status: 'cancelled', reason: '缺貨' },
]

test('describeOrder 依狀態回傳說明', () => {
  expect(describeOrder(orders[0])).toBe('處理中')
  expect(describeOrder(orders[1])).toBe('已出貨，追蹤碼 TW123456')
  expect(describeOrder(orders[2]), '日期用 toLocaleDateString("zh-TW")').toBe('已送達（2026/10/18）')
  expect(describeOrder(orders[3])).toBe('已取消：缺貨')
})

test('isActive：處理中和已出貨才算進行中', () => {
  expect(orders.map(isActive)).toEqual([true, true, false, false])
})

test('countActive 算出進行中的訂單筆數', () => {
  expect(countActive(orders), '四筆裡有兩筆進行中').toBe(2)
  expect(countActive([{ status: 'cancelled', reason: '重複下單' }])).toBe(0)
})
