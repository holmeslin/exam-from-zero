import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import Products from './Products.tsx'

afterEach(cleanup)

function Search() {
  return <output data-testid="search">{useLocation().search}</output>
}

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route
          path="products"
          element={
            <>
              <Products />
              <Search />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  )
}

const names = () => screen.getAllByRole('listitem').map((li) => li.textContent)

test('網址上的 category 決定列出哪些商品', () => {
  renderAt('/products?category=keyboard')
  expect(names(), '?category=keyboard 應該只列出兩個鍵盤').toEqual(['機械鍵盤', '60% 小鍵盤'])
})

test('沒有 category 時列出全部', () => {
  renderAt('/products')
  expect(names(), '沒有 category 時應該列出全部 4 個商品').toHaveLength(4)
})

test('按 mouse 只剩滑鼠，而且保留其他查詢參數', () => {
  renderAt('/products?sort=price')
  fireEvent.click(screen.getByRole('button', { name: 'mouse' }))
  expect(names(), '按 mouse 之後應該只列出兩支滑鼠').toEqual(['無線滑鼠', '人體工學滑鼠'])
  const params = new URLSearchParams(screen.getByTestId('search').textContent ?? '')
  expect(params.get('category'), '網址應該有 category=mouse').toBe('mouse')
  expect(params.get('sort'), '原本的 sort=price 不該被洗掉').toBe('price')
})
