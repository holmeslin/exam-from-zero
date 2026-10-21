import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import PriceTag from './PriceTag.vue'

test('要用 <script setup>，不是 Options API', () => {
  const c = PriceTag as Record<string, unknown>
  expect(c.data, '元件不應該有 data 選項，請改用 ref').toBeUndefined()
  expect(c.methods, '元件不應該有 methods 選項，請改用一般函式').toBeUndefined()
  expect(typeof c.setup, '找不到 setup，請用 <script setup>').toBe('function')
})

test('預設 price 是 100', async () => {
  const w = mount(PriceTag)
  expect(w.find('p').text(), '一開始應該是 1 本、100 元').toBe('1 本，共 100 元')
  await w.find('button').trigger('click')
  expect(w.find('p').text(), '按一下之後應該是 2 本、200 元').toBe('2 本，共 200 元')
})

test('price 從 props 來', async () => {
  const w = mount(PriceTag, { props: { price: 250 } })
  await w.find('button').trigger('click')
  await w.find('button').trigger('click')
  expect(w.find('p').text(), 'price 是 250、按兩下之後應該是 3 本、750 元').toBe('3 本，共 750 元')
})
