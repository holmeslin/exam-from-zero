import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Tabs } from './Tabs.tsx'

test('切換分頁時保留舊內容、顯示「切換中……」，不退回載入中', async () => {
  const finish = new Map<string, (v: string) => void>()
  const promises = new Map<string, Promise<string>>()
  promises.set('首頁', Promise.resolve('首頁的內容'))
  const loadTab = (name: string) => {
    if (!promises.has(name)) promises.set(name, new Promise((resolve) => finish.set(name, resolve)))
    return promises.get(name)!
  }
  await act(async () => {
    render(<Tabs loadTab={loadTab} />)
  })
  await screen.findByText('首頁的內容')

  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: '動態' }))
  })
  await waitFor(() => {
    expect(screen.queryByText('切換中……'), '切換進行中應該顯示「切換中……」').not.toBeNull()
  })
  expect(screen.queryByText('載入中……'), '切換時不該把舊內容換成 Suspense 的「載入中……」').toBeNull()

  await act(async () => finish.get('動態')!('動態的內容'))
  await waitFor(() => {
    expect(screen.queryByText('動態的內容'), '載入完成後應該顯示「動態的內容」').not.toBeNull()
  })
  expect(screen.queryByText('切換中……'), '切換完成後「切換中……」應該消失').toBeNull()
})
