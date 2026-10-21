import { expect, test } from 'vitest'
import handler from './messages'

function fakeRes() {
  const calls: { status?: number; body?: unknown; jsonCount: number } = { jsonCount: 0 }
  const res = {
    status(code: number) {
      calls.status = code
      return res
    },
    json(body: unknown) {
      calls.body = body
      calls.jsonCount++
    },
  }
  return { res, calls }
}

test('GET 回 200 與留言陣列', () => {
  const { res, calls } = fakeRes()
  handler({ method: 'GET' }, res)
  expect(calls.status, 'GET 的狀態碼要是 200').toBe(200)
  expect(calls.body).toEqual(['你好', '哈囉'])
})

test('POST 回 405 與錯誤訊息，而且只回應一次', () => {
  const { res, calls } = fakeRes()
  handler({ method: 'POST' }, res)
  expect(calls.status, '不是 GET 時狀態碼要是 405').toBe(405)
  expect(calls.body).toEqual({ error: '只支援 GET' })
  expect(calls.jsonCount, '回完 405 之後要 return，不要再回第二次').toBe(1)
})
