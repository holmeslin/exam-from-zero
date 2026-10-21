import { expect, test } from 'vitest'
import { likeMessage } from './like'

function fakeStorage(messages: unknown[]) {
  const data: Record<string, unknown> = { messages }
  let writes = 0
  return {
    data,
    get writes() { return writes },
    async getItem(key: string) { return key in data ? structuredClone(data[key]) : null },
    async setItem(key: string, value: unknown) { writes++; data[key] = structuredClone(value) },
  }
}

const old = { id: 'old-1', name: '小明', text: '舊留言', createdAt: '2026-01-01T00:00:00.000Z' }
const fresh = { id: 'new-1', name: '小華', text: '新留言', createdAt: '2026-01-02T00:00:00.000Z', likes: 4 }

test('舊留言（沒有 likes）按一次讚 → likes 變成 1', async () => {
  const storage = fakeStorage([old, fresh])
  expect(await likeMessage(storage, 'old-1'), '沒有 likes 的舊留言要當成 0 個讚').toEqual({ likes: 1 })
})

test('連按兩次 → 第二次回傳 2，而且有存回去', async () => {
  const storage = fakeStorage([old])
  await likeMessage(storage, 'old-1')
  expect(await likeMessage(storage, 'old-1')).toEqual({ likes: 2 })
  const saved = storage.data.messages as { id: string; likes: number }[]
  expect(saved.find((m) => m.id === 'old-1')?.likes, '存回去的資料裡 likes 要是 2').toBe(2)
})

test('已有讚數的留言從原本的數字加一，其他留言不受影響', async () => {
  const storage = fakeStorage([old, fresh])
  expect(await likeMessage(storage, 'new-1')).toEqual({ likes: 5 })
  const saved = storage.data.messages as { id: string; likes?: number; text: string }[]
  expect(saved.map((m) => m.id)).toEqual(['old-1', 'new-1'])
  expect(saved[1].text, '其他欄位要保留').toBe('新留言')
})

test('找不到 id → 404「找不到這則留言」，不存檔', async () => {
  const storage = fakeStorage([old])
  let err: { status?: number; message?: string } | undefined
  try {
    await likeMessage(storage, 'nope')
  } catch (e) {
    err = e as typeof err
  }
  expect(err, '找不到留言時要 throw createError(...)').toBeDefined()
  expect(err?.status).toBe(404)
  expect(err?.message).toBe('找不到這則留言')
  expect(storage.writes).toBe(0)
})
