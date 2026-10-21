import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Profile } from './Profile.tsx'

afterEach(cleanup)

test('不多包一層 <div>', () => {
  const { container } = render(<Profile />)
  const tags = Array.from(container.children).map((el) => el.tagName)
  expect(tags, '最外層應該直接是 h1、p、label、input，請用 Fragment <>...</> 取代 <div>').toEqual(['H1', 'P', 'LABEL', 'INPUT'])
})

test('label 和 input 連在一起', () => {
  render(<Profile />)
  const input = screen.getByLabelText('信箱')
  expect(input.id, '<label> 要用 htmlFor="email" 指向輸入框').toBe('email')
  expect(screen.getByText('信箱').className, 'label 的 class 要是 field-label').toBe('field-label')
})
