import { cleanup, render } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Greeting } from './Greeting.tsx'

afterEach(cleanup)

test('沒傳 name 時用「訪客」', () => {
  const { container } = render(<Greeting />)
  expect(container.textContent, '沒傳 name 時應該顯示「你好，訪客」').toBe('你好，訪客')
})

test('有傳 name 時用傳進來的值', () => {
  const { container } = render(<Greeting name="小明" />)
  expect(container.textContent).toBe('你好，小明')
})
