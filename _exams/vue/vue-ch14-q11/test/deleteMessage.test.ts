import { expect, test } from 'vitest'
import { handleDelete } from './deleteMessage'

const a = { id: 'a', name: '小明', text: '第一則', createdAt: '2026-01-01T00:00:00.000Z' }
const b = { id: 'b', name: '小華', text: '第二則', createdAt: '2026-01-02T00:00:00.000Z' }

function fakeStorage() {
  const data: Record<string, unknown> = { messages: [a, b] }
  let reads = 0
  let writes = 0
  return {
    data,
    get reads() { return reads },
    get writes() { return writes },
    async getItem(key: string) { reads++; return key in data ? data[key] : null },
    async setItem(key: string, value: unknown) { writes++; data[key] = value },
  }
}

async function errorOf(p: Promise<unknown>) {
  try {
    await p
  } catch (err) {
    return err as { status?: number; message?: string }
  }
  throw new Error('預期要 throw createError(...)，但沒有丟出錯誤')
}

test('沒帶 cookie → 401「需要管理者權限」，留言不能被刪', async () => {
  const storage = fakeStorage()
  const err = await errorOf(handleDelete({ cookies: {}, params: { id: 'a' } }, storage))
  expect(err.status, '沒有暗號要回 401').toBe(401)
  expect(err.message).toBe('需要管理者權限')
  expect(storage.writes, '權限不通過時不能存檔').toBe(0)
  expect(storage.data.messages).toEqual([a, b])
})

test('暗號錯誤 → 401', async () => {
  const storage = fakeStorage()
  const err = await errorOf(
    handleDelete({ cookies: { admin_token: '猜錯的暗號' }, params: { id: 'a' } }, storage),
  )
  expect(err.status).toBe(401)
  expect(storage.writes).toBe(0)
})

test('權限要最先檢查：暗號錯又找不到 id 時，回 401 而不是 404，也不用去讀資料', async () => {
  const storage = fakeStorage()
  const err = await errorOf(
    handleDelete({ cookies: { admin_token: 'nope' }, params: { id: 'zzz' } }, storage),
  )
  expect(err.status, '一開始就檢查身分，不通過就停下來').toBe(401)
  expect(storage.reads, '權限不通過時不該讀取留言').toBe(0)
})

test('暗號正確但找不到留言 → 404「找不到這則留言」', async () => {
  const storage = fakeStorage()
  const err = await errorOf(
    handleDelete({ cookies: { admin_token: 'demo-secret-token' }, params: { id: 'zzz' } }, storage),
  )
  expect(err.status).toBe(404)
  expect(err.message).toBe('找不到這則留言')
  expect(storage.writes).toBe(0)
})

test('暗號正確 → 刪除並回傳 { ok: true }', async () => {
  const storage = fakeStorage()
  const result = await handleDelete(
    { cookies: { admin_token: 'demo-secret-token' }, params: { id: 'a' } },
    storage,
  )
  expect(result).toEqual({ ok: true })
  expect(storage.data.messages).toEqual([b])
})
