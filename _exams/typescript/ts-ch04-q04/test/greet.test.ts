import { expect, test } from 'vitest'
import { greet } from './greet.ts'

test('有傳稱謂', () => {
  expect(greet('王', '經理'), 'greet("王", "經理")').toBe('王經理您好')
})

test('沒傳稱謂時不能出現 undefined', () => {
  expect(greet('王'), 'greet("王")').toBe('王您好')
  expect(greet('林'), 'greet("林")').toBe('林您好')
})
