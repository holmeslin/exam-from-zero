import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { MessageBoard } from './MessageBoard.tsx'

test('送出表單後訊息出現在清單，輸入框被清空', async () => {
  const user = userEvent.setup()
  render(<MessageBoard />)
  const input = screen.getByPlaceholderText('說點什麼') as HTMLInputElement
  await user.type(input, '早安')
  await user.click(screen.getByRole('button', { name: '送出' }))
  await waitFor(() => {
    expect(screen.queryAllByRole('listitem').map((li) => li.textContent), '送出後清單裡應該要有「早安」').toEqual(['早安'])
  })
  await waitFor(() => expect(input.value, '送出後輸入框應該自動清空').toBe(''))
})
