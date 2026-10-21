import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { ProductCard } from './ProductCard.tsx'

test('顯示傳進來的名稱與價格', () => {
  const { container } = render(<ProductCard name="機械鍵盤" price={1200} />)
  expect(container.querySelector('h2')?.textContent, '沒傳 isNew 時，<h2> 只顯示名稱').toBe('機械鍵盤')
  expect(container.querySelector('p')?.textContent, '<p> 要顯示「價格 元」').toBe('1200 元')
})

test('isNew 為 true 時加上（新品）', () => {
  const { container } = render(<ProductCard name="螢幕" price={5000} isNew />)
  expect(container.querySelector('h2')?.textContent).toBe('螢幕（新品）')
  expect(container.querySelector('p')?.textContent).toBe('5000 元')
})
