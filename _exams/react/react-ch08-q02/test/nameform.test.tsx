import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { NameForm } from './NameForm.tsx'

afterEach(cleanup)

test('名字留白送出：顯示錯誤訊息', async () => {
  const user = userEvent.setup()
  render(<NameForm />)
  await user.click(screen.getByRole('button', { name: '儲存' }))
  await waitFor(() => {
    expect(screen.queryByRole('alert')?.textContent, '留白送出後應該出現 role="alert" 的「名字不能是空的」').toBe('名字不能是空的')
  })
})

test('輸入名字送出：顯示已儲存的名字，沒有錯誤訊息', async () => {
  const user = userEvent.setup()
  render(<NameForm />)
  await user.type(screen.getByPlaceholderText('名字'), '  小明 ')
  await user.click(screen.getByRole('button', { name: '儲存' }))
  await waitFor(() => {
    expect(screen.queryByText('已儲存的名字：小明'), '送出後應該顯示「已儲存的名字：小明」（頭尾空白要去掉）').not.toBeNull()
  })
  expect(screen.queryByRole('alert'), '成功時不該有錯誤訊息').toBeNull()
})
