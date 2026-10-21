export type Pending = { status: 'pending' }
export type Shipped = { status: 'shipped'; trackingNumber: string }
export type Delivered = { status: 'delivered'; deliveredAt: Date }
export type Cancelled = { status: 'cancelled'; reason: string }
export type Order = Pending | Shipped | Delivered | Cancelled

export function describeOrder(order: Order): string {
  switch (order.status) {
    case 'pending':
      return '處理中'
    case 'shipped':
      return `已出貨，追蹤碼 ${order.trackingNumber}`
    case 'delivered':
      return `已送達（${order.deliveredAt.toLocaleDateString('zh-TW')}）`
    case 'cancelled':
      return `已取消：${order.reason}`
    default: {
      const unhandled: never = order
      return unhandled
    }
  }
}

export function isActive(order: Order): order is Pending | Shipped {
  return order.status === 'pending' || order.status === 'shipped'
}

export function countActive(orders: Order[]): number {
  return orders.filter(isActive).length
}
