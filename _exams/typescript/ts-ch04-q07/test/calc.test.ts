import { expect, test } from 'vitest'
import { add, multiply } from './calc.ts'

test('add 回傳數字相加的結果', () => {
  expect(add(2, 3), 'add(2, 3) 應該是數字 5，不是字串').toBe(5)
  expect(add(-1, 1), 'add(-1, 1)').toBe(0)
})

test('multiply 回傳兩數相乘的結果', () => {
  expect(multiply(2, 3), 'multiply(2, 3)').toBe(6)
  expect(multiply(4, 0), 'multiply(4, 0)').toBe(0)
})
