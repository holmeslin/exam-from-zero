import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { OnlineStatus, subscribe } from './OnlineStatus.tsx'

afterEach(cleanup)

afterEach(() => vi.restoreAllMocks())

test('網路狀態改變時畫面跟著更新', () => {
  const onLine = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true)
  render(<OnlineStatus />)
  expect(screen.getByText('有網路')).toBeTruthy()

  onLine.mockReturnValue(false)
  act(() => {
    window.dispatchEvent(new Event('offline'))
  })
  expect(screen.queryByText('沒有網路'), '觸發 offline 事件後應該顯示「沒有網路」').not.toBeNull()

  onLine.mockReturnValue(true)
  act(() => {
    window.dispatchEvent(new Event('online'))
  })
  expect(screen.queryByText('有網路'), '觸發 online 事件後應該顯示「有網路」').not.toBeNull()
})

test('subscribe 回傳的清除函式會移除監聽', () => {
  const cb = vi.fn()
  const unsubscribe = subscribe(cb)
  window.dispatchEvent(new Event('offline'))
  window.dispatchEvent(new Event('online'))
  expect(cb, 'online 和 offline 事件都應該呼叫 callback').toHaveBeenCalledTimes(2)
  unsubscribe()
  window.dispatchEvent(new Event('offline'))
  expect(cb, '清除之後就不應該再呼叫 callback').toHaveBeenCalledTimes(2)
})
