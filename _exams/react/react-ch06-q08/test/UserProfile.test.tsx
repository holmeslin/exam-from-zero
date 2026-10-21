import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { fetchUser, type User } from './api.ts'
import { UserProfile } from './UserProfile.tsx'

vi.mock('./api.ts', () => ({ fetchUser: vi.fn() }))

type Pending = { resolve: (u: User) => void; reject: (e: Error) => void }
let pending: Record<number, Pending> = {}

function mockRequests() {
  pending = {}
  vi.mocked(fetchUser).mockImplementation(
    (id: number) =>
      new Promise<User>((resolve, reject) => {
        pending[id] = { resolve, reject }
      }),
  )
}

afterEach(() => {
  cleanup()
  vi.mocked(fetchUser).mockReset()
})

const text = () => document.body.textContent

test('先發出的請求後回來，不能蓋掉新的結果（競態）', async () => {
  mockRequests()
  const { rerender } = render(<UserProfile id={1} />)
  expect(text()).toBe('載入中……')
  rerender(<UserProfile id={2} />)
  await act(async () => pending[2].resolve({ id: 2, name: '小華' }))
  expect(text()).toBe('使用者：小華')
  await act(async () => pending[1].resolve({ id: 1, name: '小明' }))
  expect(text(), '1 號的請求比較晚回來，應該被丟掉，畫面要維持「使用者：小華」').toBe('使用者：小華')
})

test('切換 id 的瞬間，不能顯示上一位使用者的資料', async () => {
  mockRequests()
  const { rerender } = render(<UserProfile id={1} />)
  await act(async () => pending[1].resolve({ id: 1, name: '小明' }))
  expect(text()).toBe('使用者：小明')
  rerender(<UserProfile id={2} />)
  expect(text(), '換成 2 號但結果還沒回來時，應該顯示「載入中……」').toBe('載入中……')
})

test('請求失敗時顯示錯誤訊息', async () => {
  mockRequests()
  render(<UserProfile id={1} />)
  await act(async () => pending[1].reject(new Error('HTTP 500')))
  expect(text(), '失敗時應該顯示「出錯了：錯誤訊息」').toBe('出錯了：HTTP 500')
})
