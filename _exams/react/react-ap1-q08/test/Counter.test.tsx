import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Counter } from './Counter.tsx'

afterEach(cleanup)

test('每按一次加一', () => {
  render(<Counter label="按讚" />)
  const btn = screen.getByRole('button')
  expect(btn.textContent).toBe('按讚：0')
  let error: unknown = null
  const onError = (e: ErrorEvent) => {
    error = e.error
    e.preventDefault()
  }
  window.addEventListener('error', onError)
  try {
    fireEvent.click(btn)
    fireEvent.click(btn)
  } finally {
    window.removeEventListener('error', onError)
  }
  expect(error, `按下按鈕時丟出錯誤：${String(error)}（this 是不是丟失了？）`).toBeNull()
  expect(btn.textContent, '按兩次之後應該是「按讚：2」').toBe('按讚：2')
})
