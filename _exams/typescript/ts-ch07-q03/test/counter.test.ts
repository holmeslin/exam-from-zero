import { expect, test } from 'vitest'
import { Counter } from './counter.ts'

test('一般呼叫可以累加', () => {
  const c = new Counter()
  c.increase()
  expect(c.count).toBe(1)
})

test('把 increase 單獨拿出來呼叫也要正常累加', () => {
  const c = new Counter()
  const increase = c.increase
  expect(() => { increase(); increase() }, '單獨呼叫 increase 時 this 不見了').not.toThrow()
  expect(c.count).toBe(2)
})

test('當成 callback 傳給 forEach 也要正常累加', () => {
  const c = new Counter()
  ;[1, 2, 3].forEach(c.increase)
  expect(c.count).toBe(3)
})
