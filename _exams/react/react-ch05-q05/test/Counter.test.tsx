import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { Counter } from './Counter.tsx'

test('每點一次「加三」，count 加 3', async () => {
  const user = userEvent.setup({ delay: null })
  const { container } = render(<Counter />)
  const p = () => container.querySelector('p')?.textContent
  expect(p(), '一開始應顯示 count：0').toBe('count：0')
  await user.click(screen.getByRole('button', { name: '加三' }))
  expect(p(), '點一次「加三」後應顯示 count：3').toBe('count：3')
  await user.click(screen.getByRole('button', { name: '加三' }))
  expect(p(), '點兩次「加三」後應顯示 count：6').toBe('count：6')
})
