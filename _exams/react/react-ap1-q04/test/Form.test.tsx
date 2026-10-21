import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'
import { Form } from './Form.tsx'

afterEach(cleanup)

test('每個 label 都連到自己的 input', () => {
  const { container } = render(<Form />)
  const inputs = Array.from(container.querySelectorAll('input'))
  expect(inputs).toHaveLength(2)
  expect(inputs[0].id, 'input 要有 id').not.toBe('')
  expect(inputs[0].id, '兩個 input 的 id 不能一樣').not.toBe(inputs[1].id)
  expect(screen.getByLabelText('姓名'), '「姓名」應該對到第一個 input').toBe(inputs[0])
  expect(screen.getByLabelText('信箱'), '「信箱」應該對到第二個 input').toBe(inputs[1])
})
