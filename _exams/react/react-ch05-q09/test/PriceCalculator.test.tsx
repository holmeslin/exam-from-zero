import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { PriceCalculator } from './PriceCalculator.tsx'

test('輸入單價後顯示三個的總價，清除會清空輸入框', async () => {
  const user = userEvent.setup({ delay: null })
  const { container } = render(<PriceCalculator />)
  const input = screen.getByLabelText('單價') as HTMLInputElement
  const p = () => container.querySelector('p')?.textContent
  await user.type(input, '120')
  expect(input.value, '輸入框應該打得進字：要用 onChange 把輸入寫回 state').toBe('120')
  expect(p(), '單價 120 時應顯示「三個一共 360 元」（記得用 Number 轉換）').toBe('三個一共 360 元')
  await user.click(screen.getByRole('button', { name: '清除' }))
  expect(input.value, '按「清除」後輸入框應該是空的').toBe('')
  expect(p(), '清除後總價應回到 0').toBe('三個一共 0 元')
})
