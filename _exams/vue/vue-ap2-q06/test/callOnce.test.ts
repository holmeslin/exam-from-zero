import { expect, test, vi } from 'vitest'
import { createCallOnce } from './callOnce'

test('同一個 key 只執行一次', async () => {
  const callOnce = createCallOnce()
  const fn = vi.fn()
  await callOnce('products', fn)
  await callOnce('products', fn)
  expect(fn, '同一個 key 呼叫兩次，fn 應該只執行一次').toHaveBeenCalledTimes(1)
})

test('不同 key 各自執行', async () => {
  const callOnce = createCallOnce()
  const a = vi.fn()
  const b = vi.fn()
  await callOnce('a', a)
  await callOnce('b', b)
  expect(a, 'key a 的 fn 應該執行一次').toHaveBeenCalledTimes(1)
  expect(b, 'key b 的 fn 應該執行一次').toHaveBeenCalledTimes(1)
})

test('await 會等到非同步的 fn 做完', async () => {
  const callOnce = createCallOnce()
  let list: string[] = []
  await callOnce('load', async () => {
    await Promise.resolve()
    list = ['鍵盤', '滑鼠']
  })
  expect(list, 'await callOnce 之後資料應該已經抓好').toEqual(['鍵盤', '滑鼠'])
})

test('同時呼叫兩次：只執行一次，而且兩邊都要等它做完', async () => {
  const callOnce = createCallOnce()
  let calls = 0
  let done = false
  const fn = async () => {
    calls++
    await new Promise((r) => setTimeout(r, 10))
    done = true
  }
  const first = callOnce('load', fn)
  const second = callOnce('load', fn)
  await second
  expect(done, '第二次呼叫也要等到第一次的 fn 做完才結束').toBe(true)
  await first
  expect(calls, '同時呼叫兩次，fn 只能執行一次').toBe(1)
})
