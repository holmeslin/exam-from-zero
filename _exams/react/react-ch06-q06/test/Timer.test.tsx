import { act, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { expect, test, vi } from 'vitest'
import { Timer } from './Timer.tsx'

test('在 StrictMode 下也是每秒加 1，元件消失後計時器要被清掉', async () => {
  vi.useFakeTimers()
  try {
    const { unmount } = render(
      <StrictMode>
        <Timer />
      </StrictMode>,
    )
    expect(screen.getByText('0 秒')).toBeTruthy()
    await act(async () => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.queryByText('1 秒'), '過了 1 秒應該顯示「1 秒」；如果變成 2，表示有兩個計時器同時在跑').not.toBeNull()
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })
    expect(screen.queryByText('3 秒'), '過了 3 秒應該顯示「3 秒」').not.toBeNull()
    unmount()
    expect(vi.getTimerCount(), '元件消失後不該留下還在跑的計時器').toBe(0)
  } finally {
    vi.useRealTimers()
  }
})
