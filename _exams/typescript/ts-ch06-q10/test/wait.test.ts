import { expect, test } from 'vitest'
import { wait } from './wait.ts'

test('回傳 Promise，完成後拿到 value', async () => {
  const p = wait(10, '好了')
  expect(p, 'wait 應回傳一個 Promise').toBeInstanceOf(Promise)
  expect(await p, 'await wait(10, "好了") 應拿到「好了」').toBe('好了')
  expect(await wait(5, 42), 'await wait(5, 42) 應拿到 42').toBe(42)
})

test('真的會等 ms 毫秒', async () => {
  const start = Date.now()
  await wait(40, null)
  expect(Date.now() - start, 'wait(40, ...) 應該至少等 40 毫秒左右').toBeGreaterThanOrEqual(35)
})
