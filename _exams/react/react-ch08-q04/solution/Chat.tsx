import { startTransition, useOptimistic, useState } from 'react'

type Message = { id: number | string; text: string; sending?: boolean }

let nextId = 2

export function Chat({ send }: { send: (text: string) => Promise<string> }) {
  const [messages, setMessages] = useState<Message[]>([{ id: 1, text: '你好' }])
  const [error, setError] = useState<string | null>(null)
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (current: Message[], text: string) => [...current, { id: `sending-${text}`, text, sending: true }],
  )

  async function sendMessage(formData: FormData) {
    const text = formData.get('text') as string
    setError(null)
    addOptimisticMessage(text)
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
        {optimisticMessages.map((message) => (
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
