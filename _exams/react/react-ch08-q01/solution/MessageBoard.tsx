import { useState } from 'react'

let nextId = 1

export function MessageBoard() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([])

  function addMessage(formData: FormData) {
    const text = formData.get('text') as string
    setMessages([...messages, { id: nextId++, text }])
  }

  return (
    <>
      <form action={addMessage}>
        <input name="text" placeholder="說點什麼" />
        <button type="submit">送出</button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
    </>
  )
}
