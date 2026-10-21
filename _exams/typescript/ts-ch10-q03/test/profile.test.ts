import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { loadProfile } from './profile.ts'

beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

function later<T>(ms: number, value: T): () => Promise<T> {
  return () => new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

test('兩件工作要同時開始', async () => {
  let result: string | undefined
  loadProfile(later(50, '小明'), later(50, 20)).then((r) => { result = r })
  await vi.advanceTimersByTimeAsync(50)
  expect(result, '經過 50ms 應該已經完成；兩件工作是不是一個一個等（共要 100ms）？').toBe('小明 今年 20 歲')
})

test('結果照順序組合', async () => {
  const p = loadProfile(later(30, '小華'), later(10, 22))
  await vi.advanceTimersByTimeAsync(30)
  expect(await p).toBe('小華 今年 22 歲')
})
