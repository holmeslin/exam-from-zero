import { render } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Greeting } from './Greeting.tsx'

test('name 或 count 變了，標題都要更新', () => {
  document.title = ''
  const { rerender } = render(<Greeting name="小明" count={0} />)
  expect(document.title).toBe('小明 點了 0 次')
  rerender(<Greeting name="小華" count={0} />)
  expect(document.title, '只改 name 時標題也要更新：是不是漏了某個依賴？').toBe('小華 點了 0 次')
  rerender(<Greeting name="小華" count={1} />)
  expect(document.title, '改 count 時標題要更新').toBe('小華 點了 1 次')
})
