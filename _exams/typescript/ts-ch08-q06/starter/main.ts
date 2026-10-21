const DRINKS = ['紅茶', '綠茶', '奶茶'] as const
const SIZES = ['中', '大'] as const

type Drink = (typeof DRINKS)[number]
type Size = (typeof SIZES)[number]

const basePrices: Record<Drink, number> = {
  '紅茶': 30,
  '綠茶': 30,
  '奶茶': 45,
}

const sizeExtra = {
  '中': 0,
  '大': 10,
} satisfies Record<Size, number>

type Order = {
  id: number
  drink: Drink
  size: Size
  note: string
}

let nextId = 1

// TODO：自動編號（從 1 開始），回傳完整的 Order
function createOrder(input: Omit<Order, 'id'>): Order {
  throw new Error('TODO: createOrder')
}

// TODO：回傳套用 changes 之後的新訂單，id 不變
function updateOrder(order: Order, changes: Partial<Omit<Order, 'id'>>): Order {
  throw new Error('TODO: updateOrder')
}

// TODO：基本價格加上尺寸加價
function priceOf(item: Pick<Order, 'drink' | 'size'>): number {
  throw new Error('TODO: priceOf')
}

const order = createOrder({ drink: '奶茶', size: '中', note: '少冰' })
console.log(order, priceOf(order))

const bigger = updateOrder(order, { size: '大' })
console.log(bigger, priceOf(bigger))

for (const drink of DRINKS) {
  console.log(`${drink}（大）：${priceOf({ drink, size: '大' })} 元`)
}
