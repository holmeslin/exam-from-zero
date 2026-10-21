import { mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import ProductCard from './ProductCard.vue'

afterEach(() => vi.restoreAllMocks())

function warnings() {
  const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  return () => spy.mock.calls.map((c) => String(c[0]))
}

test('沒傳 price 時顯示 0 元', () => {
  const w = mount(ProductCard, { props: { name: '試用品' } })
  expect(w.find('p').text(), '沒傳 price 時應該用預設值 0').toBe('0 元')
})

test('只寫 isNew（值是空字串）就等於 true', () => {
  const w = mount(ProductCard, { props: { name: '機械鍵盤', price: 1200, isNew: '' } })
  expect(w.find('h2').text(), 'isNew 宣告成 Boolean 時，只寫名字就該顯示（新品）').toBe('機械鍵盤（新品）')
})

test('沒寫 isNew 就不是新品', () => {
  const w = mount(ProductCard, { props: { name: '無線滑鼠', price: 600 } })
  expect(w.find('h2').text()).toBe('無線滑鼠')
  expect(w.find('p').text()).toBe('600 元')
})

test('漏傳 name 時 Vue 會警告必填', () => {
  const calls = warnings()
  mount(ProductCard, { props: { price: 1200 } })
  expect(calls().some((m) => m.includes('Missing required prop')), 'name 應該設成 required: true').toBe(true)
})

test('price 傳成字串時 Vue 會警告型別不對', () => {
  const calls = warnings()
  mount(ProductCard, { props: { name: '機械鍵盤', price: '1200' } })
  expect(calls().some((m) => m.includes('Invalid prop')), 'price 應該宣告成 Number').toBe(true)
})
