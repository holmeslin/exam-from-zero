import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Counter } from './Counter.tsx'

test('分頁標題跟著 count 走', () => {
  document.title = ''
  render(<Counter />)
  expect(document.title, '一開始標題應該是「你點了 0 次」').toBe('你點了 0 次')
  const button = screen.getByRole('button')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(document.title, '點兩次後標題應該是「你點了 2 次」').toBe('你點了 2 次')
})
