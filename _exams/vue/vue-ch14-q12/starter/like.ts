import { createError } from './errors'
import type { Storage } from './storage'

export type Message = {
  id: string
  name: string
  text: string
  createdAt: string
  likes: number
}

// 對指定 id 的留言按讚，回傳 { likes: 新的讚數 }
export async function likeMessage(storage: Storage, id: string) {
  const messages = ((await storage.getItem('messages')) as Message[] | null) ?? []
  const message = messages.find((message) => message.id === id)

  // TODO: 舊留言沒有 likes 欄位；找不到留言時要回 404
  message!.likes += 1
  await storage.setItem('messages', messages)
  return { likes: message!.likes }
}
