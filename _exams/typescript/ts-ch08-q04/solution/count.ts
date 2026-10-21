export const STATUSES = ['pending', 'shipped', 'cancelled'] as const
export type Status = (typeof STATUSES)[number]

// 計算每種狀態各有幾張訂單；STATUSES 裡的每一種狀態都要出現，沒有訂單就是 0
export function countByStatus(orders: { status: Status }[]): Record<Status, number> {
  const result = {} as Record<Status, number>
  for (const status of STATUSES) {
    result[status] = 0
  }
  for (const order of orders) {
    result[order.status] += 1
  }
  return result
}
