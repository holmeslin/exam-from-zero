import type { Storage } from './storage'

export type Message = {
  id: string
  name: string
  text: string
  createdAt: string
}

// 讀出所有留言；還沒存過（getItem 回傳 null）時要回傳空陣列
export async function getMessages(storage: Storage): Promise<Message[]> {
  const messages = (await storage.getItem('messages')) as Message[] | null
  return messages ?? []
}

// 刪除指定 id 的留言：讀出全部、改一改、存回去（key 一樣是 "messages"）
export async function removeMessage(storage: Storage, id: string): Promise<void> {
  const messages = await getMessages(storage)
  await storage.setItem(
    'messages',
    messages.filter((message) => message.id !== id),
  )
}
