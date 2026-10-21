import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Counter, counterReducer } from './Counter.tsx'

afterEach(cleanup)

test('counterReducer 依 action 算出新的 count', () => {
  expect(counterReducer(3, { type: 'incremented' }), 'incremented 要加 1').toBe(4)
  expect(counterReducer(3, { type: 'decremented' }), 'decremented 要減 1').toBe(2)
  expect(counterReducer(0, { type: 'decremented' }), 'decremented 不能小於 0').toBe(0)
  expect(counterReducer(3, { type: 'reset' }), 'reset 要回到 0').toBe(0)
})

test('按鈕透過 dispatch 更新畫面', () => {
  render(<Counter />)
  const text = () => screen.getByText(/目前：/).textContent
  fireEvent.click(screen.getByRole('button', { name: '+1' }))
  fireEvent.click(screen.getByRole('button', { name: '+1' }))
  expect(text(), '按兩次 +1 之後應該是 2').toBe('目前：2')
  fireEvent.click(screen.getByRole('button', { name: '-1' }))
  expect(text(), '再按 -1 應該是 1').toBe('目前：1')
  fireEvent.click(screen.getByRole('button', { name: '歸零' }))
  fireEvent.click(screen.getByRole('button', { name: '-1' }))
  expect(text(), '歸零後再按 -1，仍然是 0').toBe('目前：0')
})
