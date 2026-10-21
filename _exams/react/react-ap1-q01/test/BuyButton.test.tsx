import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { BuyButton } from './BuyButton.tsx'

afterEach(cleanup)

test('active 時用 bg-blue-600', () => {
  render(<BuyButton active />)
  const btn = screen.getByRole('button', { name: '買書' })
  expect(btn.classList.contains('bg-blue-600'), `className 是 "${btn.className}"，應該包含 bg-blue-600`).toBe(true)
  expect(btn.classList.contains('bg-gray-400'), 'active 時不應該有 bg-gray-400').toBe(false)
})

test('非 active 時用 bg-gray-400', () => {
  render(<BuyButton active={false} />)
  const btn = screen.getByRole('button', { name: '買書' })
  expect(btn.classList.contains('bg-gray-400'), `className 是 "${btn.className}"，應該包含 bg-gray-400`).toBe(true)
  expect(btn.classList.contains('bg-blue-600'), '非 active 時不應該有 bg-blue-600').toBe(false)
})

test('保留共用的類別', () => {
  render(<BuyButton active />)
  const btn = screen.getByRole('button', { name: '買書' })
  for (const c of ['rounded', 'px-4', 'py-2', 'text-white']) {
    expect(btn.classList.contains(c), `應該保留 ${c}`).toBe(true)
  }
})
