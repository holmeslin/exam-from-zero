export type Message = {
  id: string
  name: string
  text: string
  likes?: number
}

export type LikedMessage = Message & { likes: number }

export function likeMessage(messages: Message[], id: unknown): LikedMessage[] {
  return messages.map((message) => {
    const likes = message.likes ?? 0
    return { ...message, likes: typeof id === 'string' && message.id === id ? likes + 1 : likes }
  })
}
