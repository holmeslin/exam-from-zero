import { createError } from './errors'
import type { Storage } from './storage'

type Message = { id: string; name: string; text: string; createdAt: string }

// 模擬一次請求：cookies 是瀏覽器帶來的 cookie，params 是網址裡的路由參數
export type RequestEvent = {
  cookies: Record<string, string>
  params: Record<string, string>
}

// 示範用的暗號
const adminToken = 'demo-secret-token'

export async function handleDelete(event: RequestEvent, storage: Storage) {
  if (event.cookies.admin_token !== adminToken) {
    throw createError({ status: 401, message: '需要管理者權限' })
  }

  const id = event.params.id
  const messages = ((await storage.getItem('messages')) as Message[] | null) ?? []

  if (!messages.some((message) => message.id === id)) {
    throw createError({ status: 404, message: '找不到這則留言' })
  }

  await storage.setItem(
    'messages',
    messages.filter((message) => message.id !== id),
  )
  return { ok: true }
}
