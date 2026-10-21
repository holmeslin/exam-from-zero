import { readFileSync } from 'node:fs'

const OrderStatus = {
  Pending: 'pending',
  Shipped: 'shipped',
  Cancelled: 'cancelled',
} as const

type OrderStatusKey = keyof typeof OrderStatus
type OrderStatus = (typeof OrderStatus)[OrderStatusKey]

// key 是 OrderStatus 的屬性名稱時，回傳對應的狀態值；否則回傳 undefined
function lookup(key: string): OrderStatus | undefined {
  if (Object.keys(OrderStatus).includes(key)) {
    return OrderStatus[key as OrderStatusKey]
  }
  return undefined
}

const lines = readFileSync(0, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line !== '')

for (const line of lines) {
  const status = lookup(line)
  console.log(status === undefined ? `${line} → 未知狀態` : `${line} → ${status}`)
}
