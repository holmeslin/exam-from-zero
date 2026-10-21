import { afterEach, expect, test, vi } from 'vitest'
import { loadJson } from './api.js'

afterEach(() => {
  vi.unstubAllGlobals()
})

const fakeResponse = (ok: boolean, status: number, data: unknown) => ({
  ok,
  status,
  json: () => Promise.resolve(data),
})

test('成功時回傳 JSON 轉成的物件', async () => {
  const fetchMock = vi.fn(() => Promise.resolve(fakeResponse(true, 200, { name: '小明' })))
  vi.stubGlobal('fetch', fetchMock)
  const data = await loadJson('https://example.com/api/user')
  expect(fetchMock, '應該用傳進來的網址呼叫 fetch').toHaveBeenCalledWith('https://example.com/api/user')
  expect(data, '應回傳 response.json() 的結果（記得兩個 await）').toEqual({ name: '小明' })
})

test('回應失敗時丟出含狀態碼的錯誤', async () => {
  vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(fakeResponse(false, 404, null))))
  await expect(loadJson('https://example.com/missing'), '應丟出「伺服器回應失敗：404」').rejects.toThrow('伺服器回應失敗：404')
})
