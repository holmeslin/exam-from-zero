import { cleanup, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import Layout from './Layout.tsx'

afterEach(cleanup)

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<h1>首頁內容</h1>} />
          <Route path="about" element={<h1>關於我們</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

test('在 / 時，<main> 裡顯示首頁內容', () => {
  renderAt('/')
  expect(screen.getByRole('navigation'), '導覽列應該還在').toBeTruthy()
  const main = screen.getByRole('main')
  expect(within(main).queryByText('首頁內容'), '<main> 裡應該渲染內層路由（首頁內容），用 <Outlet />').not.toBeNull()
})

test('在 /about 時，<main> 裡顯示關於我們', () => {
  renderAt('/about')
  const main = screen.getByRole('main')
  expect(within(main).queryByText('關於我們'), '<main> 裡應該渲染內層路由（關於我們）').not.toBeNull()
})
