export type Message = {
  id: string
  name: string
  text: string
  likes?: number // 舊留言沒有這個欄位
}

export type LikedMessage = Message & { likes: number }

export function likeMessage(messages: Message[], id: unknown): LikedMessage[] {
  // TODO: 補上 likes 預設值，並替 id 相符的那則留言加一個讚
  return messages as LikedMessage[]
}
