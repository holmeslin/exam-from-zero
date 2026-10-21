import { expect, test } from 'vitest'
import { repeat, collectRounds } from './repeat.ts'

test('repeat 依序傳入 1 到 times', () => {
  const seen: number[] = []
  repeat(3, (round) => { seen.push(round) })
  expect(seen, 'repeat(3, ...) 應該依序傳入 1、2、3').toEqual([1, 2, 3])
})

test('times 是 0 時不呼叫 callback', () => {
  let count = 0
  repeat(0, () => { count++ })
  expect(count, 'repeat(0, ...) 不應該呼叫 callback').toBe(0)
})

test('collectRounds 用 repeat 收集編號', () => {
  expect(collectRounds(4), 'collectRounds(4)').toEqual([1, 2, 3, 4])
  expect(collectRounds(0), 'collectRounds(0)').toEqual([])
})
