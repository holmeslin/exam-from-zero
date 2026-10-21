import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { Mailbox } from './Mailbox.tsx'

test('切到收件匣再切回草稿，剛打的內容還在', async () => {
  const user = userEvent.setup()
  render(<Mailbox />)
  await user.type(screen.getByPlaceholderText('寫點東西'), '寫到一半')
  await user.click(screen.getByRole('button', { name: '收件匣' }))
  expect(screen.queryByText('你沒有新信件'), '切到收件匣後應該看得到「你沒有新信件」').not.toBeNull()
  await user.click(screen.getByRole('button', { name: '草稿' }))
  const textarea = screen.getByPlaceholderText('寫點東西') as HTMLTextAreaElement
  expect(textarea.value, '切回草稿後，剛才打的內容應該還在').toBe('寫到一半')
})
