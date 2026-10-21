import { useState } from 'react'

function Chat({ contact }: { contact: string }) {
  const [draft, setDraft] = useState('')

  return (
    <div>
      <h2>和 {contact} 聊天</h2>
      <input value={draft} onChange={(event) => setDraft(event.target.value)} />
    </div>
  )
}

export function ChatApp() {
  const [contact, setContact] = useState('小明')

  return (
    <div>
      <button onClick={() => setContact('小明')}>小明</button>
      <button onClick={() => setContact('小華')}>小華</button>
      <Chat key={contact} contact={contact} />
    </div>
  )
}
