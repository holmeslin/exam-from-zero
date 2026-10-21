import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { CartSummary } from './CartSummary.tsx'

test('有商品時顯示數量', () => {
  const { container } = render(<CartSummary count={3} />)
  expect(container.textContent).toBe('購物車裡有 3 件商品')
})

test('count 為 0 時不顯示任何字', () => {
  const { container } = render(<CartSummary count={0} />)
  expect(container.textContent, '畫面上出現了「0」：&& 左邊要是真正的布林值').toBe('')
})

test('disabled 時整個元件什麼都不畫', () => {
  const { container } = render(<CartSummary count={3} disabled />)
  expect(container.innerHTML, 'disabled 時元件要回傳 null，連外層 <div> 都不要畫').toBe('')
})
