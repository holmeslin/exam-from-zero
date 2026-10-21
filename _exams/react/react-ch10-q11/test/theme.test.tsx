import { cleanup, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { ThemeButton, ThemeProvider, useTheme } from './theme.tsx'

afterEach(cleanup)

test('按鈕在 light 與 dark 之間切換', () => {
  render(
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>,
  )
  const button = screen.getByRole('button')
  expect(button.textContent, '一開始是 light').toBe('目前是 light')
  fireEvent.click(button)
  expect(button.textContent, '按一下變 dark').toBe('目前是 dark')
  fireEvent.click(button)
  expect(button.textContent, '再按一下回到 light').toBe('目前是 light')
})

test('沒有 ThemeProvider 時 useTheme 丟出清楚的錯誤', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
  try {
    expect(() => renderHook(() => useTheme()), '沒包 ThemeProvider 時要丟出「useTheme 必須在 ThemeProvider 裡面使用」').toThrow(
      'useTheme 必須在 ThemeProvider 裡面使用',
    )
  } finally {
    spy.mockRestore()
  }
})
