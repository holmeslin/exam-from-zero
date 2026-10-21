import { useState } from 'react'

let nextId = 1

export function MessageBoard() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([])

  function addMessage(formData: FormData) {
    // TODO：從 formData 讀出 text 欄位，加進 messages
  }

  return (
    <>
      <form>
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
