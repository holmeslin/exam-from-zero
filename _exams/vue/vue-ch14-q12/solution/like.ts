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
  const stored = ((await storage.getItem('messages')) as Message[] | null) ?? []
  // 舊留言沒有 likes 欄位，補成 0
  const messages = stored.map((message) => ({ ...message, likes: message.likes ?? 0 }))
  const message = messages.find((message) => message.id === id)

  if (!message) {
    throw createError({ status: 404, message: '找不到這則留言' })
  }

  message.likes += 1
  await storage.setItem('messages', messages)
  return { likes: message.likes }
}
