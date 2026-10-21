export type Pending = { status: 'pending' }
export type Shipped = { status: 'shipped'; trackingNumber: string }
export type Delivered = { status: 'delivered'; deliveredAt: Date }
export type Cancelled = { status: 'cancelled'; reason: string }
export type Order = Pending | Shipped | Delivered | Cancelled

export function describeOrder(order: Order): string {
  // TODO: 用 switch (order.status) 回傳說明，並在 default 加上窮舉檢查
  throw new Error('TODO: 還沒實作 describeOrder')
}

export function isActive(order: Order): order is Pending | Shipped {
  // TODO: 處理中和已出貨算進行中
  return false
}

export function countActive(orders: Order[]): number {
  // TODO: 用 filter 搭配 isActive
  return 0
}
