import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { SearchBox } from './SearchBox.tsx'

test('按下「聚焦輸入框」後，輸入框要取得游標', () => {
  render(<SearchBox />)
  const input = screen.getByPlaceholderText('搜尋')
  expect(document.activeElement, '還沒按按鈕時輸入框不該有游標').not.toBe(input)
  fireEvent.click(screen.getByRole('button', { name: '聚焦輸入框' }))
  expect(document.activeElement, '按下按鈕後 document.activeElement 應該是輸入框').toBe(input)
})
