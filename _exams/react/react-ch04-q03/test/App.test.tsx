import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from './App.tsx'

test('App 有標題和兩段歡迎詞', () => {
  render(<App />)
  expect(screen.getByRole('heading', { level: 1 }).textContent, '要有 <h1>哈囉，React！</h1>').toBe('哈囉，React！')
  const greetings = screen.queryAllByText('歡迎來到我的第一個 React 網頁。')
  expect(greetings.length, '歡迎詞要出現剛好兩次（用 <Greeting /> 兩次）').toBe(2)
  for (const p of greetings) expect(p.tagName, '歡迎詞要放在 <p> 裡').toBe('P')
})
