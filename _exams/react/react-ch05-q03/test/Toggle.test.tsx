import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { Toggle } from './Toggle.tsx'

test('點按鈕切換內容的顯示與隱藏', async () => {
  const user = userEvent.setup({ delay: null })
  render(<Toggle />)
  expect(screen.queryByText('這是被藏起來的內容。'), '一開始內容應該是隱藏的').toBeNull()
  await user.click(screen.getByRole('button'))
  expect(screen.queryByText('這是被藏起來的內容。'), '點一下之後內容應該出現').not.toBeNull()
  expect(screen.getByRole('button').textContent, '展開後按鈕文字應變成「收起」').toBe('收起')
  await user.click(screen.getByRole('button'))
  expect(screen.queryByText('這是被藏起來的內容。'), '再點一下內容應該收起來').toBeNull()
  expect(screen.getByRole('button').textContent, '收起後按鈕文字應變回「展開」').toBe('展開')
})

test('兩個 Toggle 各自有自己的 state', async () => {
  const user = userEvent.setup({ delay: null })
  render(<><Toggle /><Toggle /></>)
  await user.click(screen.getAllByRole('button')[0])
  expect(screen.getAllByText('這是被藏起來的內容。').length, '只點第一個，應該只有一段內容出現').toBe(1)
})
