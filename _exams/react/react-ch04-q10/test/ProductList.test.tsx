import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { ProductList } from './ProductList.tsx'

const products = [
  { id: 1, name: '機械鍵盤', inStock: true },
  { id: 2, name: '無線滑鼠', inStock: false },
  { id: 3, name: '螢幕', inStock: true },
]

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test('只列出有現貨的商品', () => {
  render(<ProductList products={products} />)
  const items = screen.queryAllByRole('listitem').map((li) => li.textContent)
  expect(items, '要先用 filter 挑出 inStock 的商品，再用 map 畫成 <li>').toEqual(['機械鍵盤', '螢幕'])
})

test('每個項目都有 key', () => {
  const error = vi.spyOn(console, 'error').mockImplementation(() => {})
  render(<ProductList products={[{ id: 7, name: '耳機', inStock: true }, { id: 8, name: '喇叭', inStock: true }]} />)
  const keyWarning = error.mock.calls.some((args) => String(args[0]).includes('key'))
  expect(keyWarning, 'React 警告列表項目缺少 key：在 map 回傳的 <li> 加上 key={product.id}').toBe(false)
})

test('沒有現貨時顯示提示', () => {
  const { container } = render(<ProductList products={[{ id: 2, name: '無線滑鼠', inStock: false }]} />)
  expect(container.querySelector('ul'), '沒有現貨時不要畫 <ul>').toBeNull()
  expect(container.textContent).toBe('目前沒有商品。')
})
