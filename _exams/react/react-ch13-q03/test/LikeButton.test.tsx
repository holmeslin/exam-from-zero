import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import LikeButton from './LikeButton.tsx'
import src from './LikeButton.tsx?raw'

test('第一行是 "use client" 指令', () => {
  const first = src.split('\n').map((l) => l.trim()).find((l) => l !== '' && !l.startsWith('//'))
  expect(first, '"use client" 要寫在檔案最上面、所有 import 之前').toMatch(/^["']use client["'];?$/)
})

test('從 initialLikes 開始，每點一下加一', async () => {
  render(<LikeButton initialLikes={12} />)
  const button = screen.getByRole('button')
  expect(button.textContent, '一開始要顯示 initialLikes').toContain('12')
  await userEvent.click(button)
  expect(button.textContent, '點一下應該變成 13').toContain('13')
  await userEvent.click(button)
  expect(button.textContent, '再點一下應該變成 14').toContain('14')
})
