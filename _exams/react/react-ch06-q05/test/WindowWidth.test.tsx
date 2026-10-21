import { act, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { WindowWidth } from './WindowWidth.tsx'

function setWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', { value: px, configurable: true, writable: true })
}

test('視窗大小改變時更新寬度，元件消失時移除同一個監聽函式', () => {
  const add = vi.spyOn(window, 'addEventListener')
  const remove = vi.spyOn(window, 'removeEventListener')
  setWidth(800)
  const { unmount } = render(<WindowWidth />)
  expect(screen.getByText('視窗寬度：800 px')).toBeTruthy()

  setWidth(500)
  act(() => {
    window.dispatchEvent(new Event('resize'))
  })
  expect(screen.getByText('視窗寬度：500 px'), 'resize 之後應該顯示新的寬度').toBeTruthy()

  const handler = add.mock.calls.find(([type]) => type === 'resize')?.[1]
  expect(handler, '應該用 addEventListener 監聽 resize').toBeTypeOf('function')
  unmount()
  const removed = remove.mock.calls.some(([type, fn]) => type === 'resize' && fn === handler)
  expect(removed, '元件消失時要用 removeEventListener 移除「同一個」resize 監聽函式（清除函式）').toBe(true)
  add.mockRestore()
  remove.mockRestore()
})
