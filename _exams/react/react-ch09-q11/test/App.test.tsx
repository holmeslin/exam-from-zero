import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import App from './App.tsx'

afterEach(cleanup)

function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )
}

test('不存在的網址顯示找不到這一頁，導覽列還在', () => {
  renderAt('/xyz')
  expect(screen.queryByRole('heading')?.textContent, '/xyz 應該顯示「找不到這一頁」').toBe('找不到這一頁')
  expect(screen.queryByRole('navigation'), '找不到頁面時導覽列也要在，NotFound 要放在 Layout 裡面').not.toBeNull()
})

test('很深的不存在網址也接得住', () => {
  renderAt('/a/b/c')
  expect(screen.queryByRole('heading')?.textContent, '/a/b/c 也應該顯示「找不到這一頁」').toBe('找不到這一頁')
})

test('存在的網址不會被搶走', () => {
  renderAt('/about')
  expect(screen.queryByRole('heading')?.textContent, '/about 還是要顯示「關於我們」').toBe('關於我們')
})
