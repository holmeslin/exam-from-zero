import { startTransition, useState } from 'react'

type Message = { id: number | string; text: string; sending?: boolean }

let nextId = 2

export function Chat({ send }: { send: (text: string) => Promise<string> }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 1, text: '你好' }])
  const [error, setError] = useState<string | null>(null)
  // TODO：用 useOptimistic 算出給畫面用的 optimisticMessages，
  //       樂觀的那一筆要帶 sending: true

  async function sendMessage(formData: FormData) {
    const text = formData.get('text') as string
    setError(null)
    // TODO：先樂觀地加上這一筆
    try {
      const saved = await send(text)
      startTransition(() => {
        setMessages((current) => [...current, { id: nextId++, text: saved }])
      })
    } catch (e) {
      startTransition(() => setError((e as Error).message))
    }
  }

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text}
            {message.sending && '（傳送中……）'}
          </li>
        ))}
      </ul>
      {error && <p role="alert">{error}</p>}
      <form action={sendMessage}>
        <input name="text" placeholder="輸入訊息" />
        <button type="submit">傳送</button>
      </form>
    </>
  )
}
