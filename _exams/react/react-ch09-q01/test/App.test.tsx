import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { afterEach, expect, test } from 'vitest'
import App from './App.tsx'

afterEach(cleanup)

function renderAt(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )
}

test('網址 / 顯示首頁', () => {
  renderAt('/')
  expect(screen.getByRole('heading').textContent, '/ 應該顯示「首頁」').toBe('首頁')
})

test('網址 /about 顯示關於我們', () => {
  renderAt('/about')
  expect(screen.queryByRole('heading')?.textContent, '/about 應該顯示「關於我們」，請加一個 path="about" 的 Route').toBe('關於我們')
})
