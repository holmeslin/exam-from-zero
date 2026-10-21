import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App.tsx'

test('App 組合 Header、內容與 Footer', () => {
  const { container } = render(<App />)
  expect(container.querySelector('header h1')?.textContent, 'Header 要畫出 <header><h1>我的小商店</h1></header>').toBe('我的小商店')
  expect(screen.getByText('歡迎光臨！')).toBeTruthy()
  expect(container.querySelector('footer p')?.textContent, 'Footer 要畫出 <footer><p>© 2026 我的小商店</p></footer>').toBe('© 2026 我的小商店')
})
