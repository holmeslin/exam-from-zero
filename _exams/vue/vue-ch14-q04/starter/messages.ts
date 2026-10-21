import type { Storage } from './storage'

export type Message = {
  id: string
  name: string
  text: string
  createdAt: string
}

// 讀出所有留言；還沒存過（getItem 回傳 null）時要回傳空陣列
export async function getMessages(storage: Storage): Promise<Message[]> {
  throw new Error('TODO: 實作 getMessages')
}

// 刪除指定 id 的留言：讀出全部、改一改、存回去（key 一樣是 "messages"）
export async function removeMessage(storage: Storage, id: string): Promise<void> {
  throw new Error('TODO: 實作 removeMessage')
}
