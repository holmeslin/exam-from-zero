import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import { SubmitButton } from './SubmitButton.tsx'

test('表單送出中，按鈕停用並顯示「送出中……」；結束後恢復', async () => {
  let finish = () => {}
  const submit = () => new Promise<void>((resolve) => { finish = resolve })
  const user = userEvent.setup()
  render(
    <form action={submit}>
      <SubmitButton />
    </form>,
  )
  await user.click(screen.getByRole('button', { name: '送出' }))
  await waitFor(() => {
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.textContent, '送出中按鈕文字應該是「送出中……」').toBe('送出中……')
    expect(button.disabled, '送出中按鈕應該停用').toBe(true)
  })
  await act(async () => finish())
  await waitFor(() => {
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button.textContent, '送出結束後按鈕文字應該回到「送出」').toBe('送出')
    expect(button.disabled, '送出結束後按鈕應該可以再按').toBe(false)
  })
})
