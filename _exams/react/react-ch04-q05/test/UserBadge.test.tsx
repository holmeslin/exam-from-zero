import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { UserBadge } from './UserBadge.tsx'

test('顯示名字和年齡，並套上樣式', () => {
  const { container } = render(<UserBadge />)
  const p = container.querySelector('p')
  expect(p, '要回傳一個 <p>').not.toBeNull()
  expect(p!.textContent, '文字要是「小明，20 歲」').toBe('小明，20 歲')
  expect(p!.style.color, 'style 的 color 要是 crimson').toBe('crimson')
  expect(p!.style.fontSize, 'style 的 fontSize 要是 24（會變成 24px）').toBe('24px')
})
