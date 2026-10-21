import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import OrderLine from './OrderLine.vue'

test('小計 = 單價 × 數量', () => {
  const w = mount(OrderLine, { props: { name: '機械鍵盤', price: 1200, quantity: 3 } })
  expect(w.find('.subtotal').text(), '單價 1200、數量 3 時，小計應該顯示 3600').toBe('小計：3600 元')
})

test('換一組數字也要算對', () => {
  const w = mount(OrderLine, { props: { name: '無線滑鼠', price: 50, quantity: 4 } })
  expect(w.find('.subtotal').text(), '單價 50、數量 4 時，小計應該顯示 200').toBe('小計：200 元')
})
