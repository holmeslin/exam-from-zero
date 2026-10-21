import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, expect, test } from 'vitest'
import { useCartStore } from './cart'

beforeEach(() => setActivePinia(createPinia()))

test('add 會把商品加進 items', () => {
  const cart = useCartStore()
  cart.add('鍵盤')
  cart.add('滑鼠')
  expect(cart.items, 'items 應該依序有兩件商品').toEqual(['鍵盤', '滑鼠'])
})

test('count 會跟著 items 變', () => {
  const cart = useCartStore()
  expect(cart.count, '一開始應該是 0 件').toBe(0)
  cart.add('鍵盤')
  expect(cart.count, '加入一件後 count 應該是 1').toBe(1)
})

test('兩個地方呼叫 useCartStore 拿到同一個 store', () => {
  useCartStore().add('鍵盤')
  expect(useCartStore().count, '另一處呼叫應該看到同一份資料').toBe(1)
})
