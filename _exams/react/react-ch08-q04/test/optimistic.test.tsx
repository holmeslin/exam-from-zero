import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'
import { Chat } from './Chat.tsx'

afterEach(cleanup)

function controlled() {
  let resolve: (v: string) => void = () => {}
  let reject: (e: Error) => void = () => {}
  const send = () => new Promise<string>((res, rej) => { resolve = res; reject = rej })
  return { send, resolve: (v: string) => resolve(v), reject: (e: Error) => reject(e) }
}

const items = () => screen.queryAllByRole('listitem').map((li) => li.textContent)

test('成功：訊息先帶「（傳送中……）」出現，伺服器確認後變成正常訊息', async () => {
  const server = controlled()
  const user = userEvent.setup()
  render(<Chat send={server.send} />)
  await user.type(screen.getByPlaceholderText('輸入訊息'), '早安')
  await user.click(screen.getByRole('button', { name: '傳送' }))
  await waitFor(() => {
    expect(items(), '伺服器還沒回應時，就該先樂觀地顯示「早安（傳送中……）」').toEqual(['你好', '早安（傳送中……）'])
  })
  await act(async () => server.resolve('早安'))
  await waitFor(() => {
    expect(items(), '伺服器確認後應該變成正常訊息').toEqual(['你好', '早安'])
  })
})

test('失敗：樂觀的訊息自動消失，顯示錯誤', async () => {
  const server = controlled()
  const user = userEvent.setup()
  render(<Chat send={server.send} />)
  await user.type(screen.getByPlaceholderText('輸入訊息'), '壞訊息')
  await user.click(screen.getByRole('button', { name: '傳送' }))
  await waitFor(() => {
    expect(items(), '伺服器還沒回應時，就該先樂觀地顯示「壞訊息（傳送中……）」').toEqual(['你好', '壞訊息（傳送中……）'])
  })
  await act(async () => server.reject(new Error('伺服器拒絕了這則訊息')))
  await waitFor(() => {
    expect(items(), '失敗後樂觀的那一筆應該消失').toEqual(['你好'])
    expect(screen.queryByRole('alert')?.textContent, '失敗後應該顯示錯誤訊息').toBe('伺服器拒絕了這則訊息')
  })
})
