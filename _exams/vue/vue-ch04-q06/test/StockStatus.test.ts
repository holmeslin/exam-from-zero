import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import StockStatus from './StockStatus.vue'

const cases: [number, string][] = [
  [0, '已售完'],
  [3, '剩最後 3 件！'],
  [4, '剩最後 4 件！'],
  [5, '現貨供應中'],
  [10, '現貨供應中'],
]

test.each(cases)('stock = %i 時顯示「%s」', (stock, expected) => {
  const w = mount(StockStatus, { props: { stock } })
  const ps = w.findAll('p')
  expect(ps.length, '每次只能出現一個 <p>').toBe(1)
  expect(ps[0].text()).toBe(expected)
})
