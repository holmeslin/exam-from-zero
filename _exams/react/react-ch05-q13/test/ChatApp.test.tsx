import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { ChatApp } from './ChatApp.tsx'

test('切換聯絡人時，草稿要清空', async () => {
  const user = userEvent.setup({ delay: null })
  render(<ChatApp />)
  await user.type(screen.getByRole('textbox'), '晚上吃什麼')
  expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('晚上吃什麼')

  await user.click(screen.getByRole('button', { name: '小華' }))
  expect(screen.getByRole('heading').textContent, '標題應變成「和 小華 聊天」').toBe('和 小華 聊天')
  expect(
    (screen.getByRole('textbox') as HTMLInputElement).value,
    '寫給小明的草稿不應該留在小華的輸入框：要讓 React 把它當成新的 Chat',
  ).toBe('')

  await user.type(screen.getByRole('textbox'), '好')
  await user.click(screen.getByRole('button', { name: '小華' }))
  expect((screen.getByRole('textbox') as HTMLInputElement).value, '點同一個聯絡人時，草稿應保留').toBe('好')
})
