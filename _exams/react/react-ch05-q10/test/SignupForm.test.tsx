import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { SignupForm } from './SignupForm.tsx'

test('每個欄位寫回對應屬性，送出後重設表單', async () => {
  const user = userEvent.setup({ delay: null })
  const onSubmit = vi.fn()
  render(<SignupForm onSubmit={onSubmit} />)
  const name = screen.getByLabelText('姓名') as HTMLInputElement
  const email = screen.getByLabelText('信箱') as HTMLInputElement
  const plan = screen.getByLabelText('方案') as HTMLSelectElement
  const agreed = screen.getByLabelText('我同意使用條款') as HTMLInputElement
  const submit = screen.getByRole('button', { name: '註冊' }) as HTMLButtonElement

  await user.type(name, '小明')
  await user.type(email, 'ming@example.com')
  expect(name.value, '姓名欄應顯示「小明」').toBe('小明')
  expect(email.value, '信箱欄應顯示輸入的信箱；是不是所有欄位都寫進了同一個屬性？').toBe('ming@example.com')
  await user.selectOptions(plan, 'pro')
  expect(plan.value, '方案應能切換成 pro').toBe('pro')
  expect(submit.disabled, '還沒勾選條款，註冊按鈕應該停用').toBe(true)
  await user.click(agreed)
  expect(agreed.checked, '核取方塊應被勾選：核取方塊要取 checked，不是 value').toBe(true)
  expect(submit.disabled, '勾選條款後註冊按鈕應該啟用').toBe(false)

  await user.click(submit)
  expect(onSubmit, '按「註冊」應呼叫 onSubmit 一次').toHaveBeenCalledTimes(1)
  expect(onSubmit, 'onSubmit 應收到整份表單內容').toHaveBeenCalledWith({
    name: '小明',
    email: 'ming@example.com',
    plan: 'pro',
    agreed: true,
  })
  expect(name.value, '送出後姓名欄應重設為空').toBe('')
  expect(email.value, '送出後信箱欄應重設為空').toBe('')
  expect(plan.value, '送出後方案應重設為 free').toBe('free')
  expect(agreed.checked, '送出後核取方塊應取消勾選').toBe(false)
})
