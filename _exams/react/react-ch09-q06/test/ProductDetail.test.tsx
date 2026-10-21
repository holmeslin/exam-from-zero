import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import ProductDetail from './ProductDetail.tsx'

afterEach(cleanup)

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="products/:id" element={<ProductDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

test('/products/2 顯示無線滑鼠', () => {
  renderAt('/products/2')
  expect(screen.queryByRole('heading')?.textContent, '/products/2 的標題應該是「無線滑鼠」；網址上的 id 是什麼型別？').toBe('無線滑鼠')
  expect(screen.queryByText('售價 890 元'), '應該顯示「售價 890 元」').not.toBeNull()
})

test('/products/99 顯示找不到商品', () => {
  renderAt('/products/99')
  expect(screen.queryByText('找不到商品 99'), '找不到時應該顯示「找不到商品 99」，而不是讓畫面壞掉').not.toBeNull()
})
