import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import StockList from './StockList.vue'

const products = [
  { id: 1, name: '機械鍵盤', inStock: true },
  { id: 2, name: '無線滑鼠', inStock: false },
  { id: 3, name: '螢幕', inStock: true },
  { id: 4, name: '耳機', inStock: true },
]

test('只列出有現貨的商品', () => {
  const w = mount(StockList, { props: { products } })
  expect(w.find('h2').text()).toBe('現貨商品（3 項）')
  expect(w.findAll('li').map((li) => li.text()), '應該依原本順序列出有現貨的商品').toEqual(['機械鍵盤', '螢幕', '耳機'])
  expect(w.text(), '有現貨時不該顯示「目前沒有現貨。」').not.toContain('目前沒有現貨。')
})

test('全部缺貨時顯示提示，不畫清單', () => {
  const w = mount(StockList, { props: { products: [{ id: 9, name: '無線滑鼠', inStock: false }] } })
  expect(w.find('h2').text()).toBe('現貨商品（0 項）')
  expect(w.text(), '沒有現貨時應該顯示「目前沒有現貨。」').toContain('目前沒有現貨。')
  expect(w.find('ul').exists(), '沒有現貨時不該出現 <ul>').toBe(false)
})
