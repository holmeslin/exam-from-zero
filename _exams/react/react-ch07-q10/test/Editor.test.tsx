import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Editor, saveRenders } from './Editor.tsx'

afterEach(cleanup)

test('Editor 重新渲染時，SaveButton 不跟著渲染', () => {
  saveRenders.length = 0
  render(<Editor />)
  expect(saveRenders.length, '第一次應該渲染一次').toBe(1)
  fireEvent.click(screen.getByRole('button', { name: /點了/ }))
  fireEvent.click(screen.getByRole('button', { name: /點了/ }))
  expect(screen.getByRole('button', { name: /點了/ }).textContent).toBe('點了 2 次')
  expect(saveRenders.length, 'onSave 每次都是新函式，memo 就失效了；試試 useCallback').toBe(1)
})

test('按下儲存仍然有作用', () => {
  render(<Editor />)
  fireEvent.click(screen.getByRole('button', { name: '儲存' }))
  expect(screen.getByText('已儲存')).toBeTruthy()
})
