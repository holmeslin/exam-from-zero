import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ProductLink from './ProductLink.vue'

test('href 和 title 由資料算出來', () => {
  const w = mount(ProductLink, { props: { id: 7, name: '機械鍵盤', isSoldOut: false } })
  const a = w.find('a')
  expect(a.attributes('href'), 'href 應該是 /products/7').toBe('/products/7')
  expect(a.attributes('title'), 'title 應該是「查看 機械鍵盤」').toBe('查看 機械鍵盤')
})

test('isSoldOut 為 false 時，按鈕沒有 disabled 屬性', () => {
  const w = mount(ProductLink, { props: { id: 7, name: '機械鍵盤', isSoldOut: false } })
  expect(w.find('button').attributes('disabled'), '沒售完時 disabled 屬性應該整個不存在').toBeUndefined()
})

test('isSoldOut 為 true 時，按鈕被停用', () => {
  const w = mount(ProductLink, { props: { id: 3, name: '螢幕', isSoldOut: true } })
  expect(w.find('a').attributes('href'), 'href 應該是 /products/3').toBe('/products/3')
  expect(w.find('button').attributes('disabled'), '售完時按鈕應該有 disabled 屬性').toBeDefined()
})
