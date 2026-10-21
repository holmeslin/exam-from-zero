import { expect, test } from 'vitest'
import { getMessages, removeMessage } from './messages'

function fakeStorage(initial: Record<string, unknown> = {}) {
  const data: Record<string, unknown> = { ...initial }
  return {
    data,
    async getItem(key: string) {
      return key in data ? data[key] : null
    },
    async setItem(key: string, value: unknown) {
      data[key] = value
    },
  }
}

const a = { id: 'a', name: '小明', text: '第一則', createdAt: '2026-01-01T00:00:00.000Z' }
const b = { id: 'b', name: '小華', text: '第二則', createdAt: '2026-01-02T00:00:00.000Z' }

test('還沒存過留言時，getMessages 回傳空陣列', async () => {
  expect(await getMessages(fakeStorage()), '沒有資料時 getItem 回傳 null，要換成 []').toEqual([])
})

test('getMessages 讀出 key 為 "messages" 的資料', async () => {
  expect(await getMessages(fakeStorage({ messages: [a, b] }))).toEqual([a, b])
})

test('removeMessage 把指定 id 的留言拿掉並存回 "messages"', async () => {
  const storage = fakeStorage({ messages: [a, b] })
  await removeMessage(storage, 'a')
  expect(storage.data.messages, '存回去的陣列應該只剩下 id 不是 "a" 的留言').toEqual([b])
})

test('還沒存過時 removeMessage 也不會出錯，存回空陣列', async () => {
  const storage = fakeStorage()
  await removeMessage(storage, 'x')
  expect(storage.data.messages).toEqual([])
})
