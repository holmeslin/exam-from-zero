import { act, renderHook } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { useOnlineStatus } from './useOnlineStatus.ts'

test('跟著 online / offline 事件更新，卸載時移除監聽', () => {
  const remove = vi.spyOn(window, 'removeEventListener')
  const { result, unmount } = renderHook(() => useOnlineStatus())
  expect(result.current, '一開始應該是 navigator.onLine').toBe(navigator.onLine)

  act(() => {
    window.dispatchEvent(new Event('offline'))
  })
  expect(result.current, '收到 offline 事件後應該回傳 false').toBe(false)

  act(() => {
    window.dispatchEvent(new Event('online'))
  })
  expect(result.current, '收到 online 事件後應該回傳 true').toBe(true)

  unmount()
  const types = remove.mock.calls.map(([type]) => type)
  expect(types, '卸載時要在清除函式裡移除 online 與 offline 監聽').toEqual(
    expect.arrayContaining(['online', 'offline']),
  )
  remove.mockRestore()
})
