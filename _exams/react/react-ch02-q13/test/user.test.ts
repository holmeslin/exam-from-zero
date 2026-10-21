import { afterEach, expect, test, vi } from 'vitest'
import { loadUser, loadUserName } from './user.js'

function fakeFetch(ok: boolean, status: number, body: unknown) {
  return vi.fn(async () => ({ ok, status, json: async () => body }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

test('loadUser 成功時回傳轉好的物件', async () => {
  const fetchMock = fakeFetch(true, 200, { name: '小明', age: 20 })
  vi.stubGlobal('fetch', fetchMock)
  expect(await loadUser('/api/user'), '應回傳 await response.json() 的結果').toEqual({ name: '小明', age: 20 })
  expect(fetchMock, '應該用傳進來的網址呼叫 fetch').toHaveBeenCalledWith('/api/user')
})

test('loadUser 回應不成功時丟出錯誤', async () => {
  vi.stubGlobal('fetch', fakeFetch(false, 404, null))
  await expect(loadUser('/api/user'), 'response.ok 為 false 時要 throw new Error(`伺服器回應失敗：${response.status}`)').rejects.toThrow('伺服器回應失敗：404')
})

test('loadUserName 成功時回傳名字', async () => {
  vi.stubGlobal('fetch', fakeFetch(true, 200, { name: '小華' }))
  expect(await loadUserName('/api/user'), '記得 await loadUser(...)').toBe('小華')
})

test('loadUserName 失敗時回傳錯誤訊息，不丟出錯誤', async () => {
  vi.stubGlobal('fetch', fakeFetch(false, 500, null))
  expect(await loadUserName('/api/user'), '用 try...catch 接住錯誤').toBe('抓資料失敗：伺服器回應失敗：500')
})
