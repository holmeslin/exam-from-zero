import { expect, test, vi } from 'vitest'
import { collect } from './collect.js'

test('回傳每次 callback 的結果', () => {
  expect(collect(3, (n) => `第 ${n + 1} 次`), 'collect(3, ...) 應得到三段文字').toEqual(['第 1 次', '第 2 次', '第 3 次'])
})

test('callback 被呼叫的次數與傳入的輪次正確', () => {
  const action = vi.fn((n) => n * 10)
  expect(collect(4, action)).toEqual([0, 10, 20, 30])
  expect(action, 'action 應被呼叫 4 次').toHaveBeenCalledTimes(4)
  expect(action.mock.calls.map((c) => c[0]), '每次應依序傳入 0、1、2、3').toEqual([0, 1, 2, 3])
})

test('次數為 0 時不呼叫 callback，回傳空陣列', () => {
  const action = vi.fn()
  expect(collect(0, action)).toEqual([])
  expect(action, 'times 為 0 時不該呼叫 action').not.toHaveBeenCalled()
})
