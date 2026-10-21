import { useState } from 'react'

function Draft() {
  const [text, setText] = useState('')
  return <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="寫點東西" />
}

function Inbox() {
  return <p>你沒有新信件</p>
}

export function Mailbox() {
  const [tab, setTab] = useState('draft')

  return (
    <>
      <button onClick={() => setTab('inbox')}>收件匣</button>
      <button onClick={() => setTab('draft')}>草稿</button>
      {/* TODO：切走再切回來時，草稿的內容要還在 */}
      {tab === 'inbox' && <Inbox />}
      {tab === 'draft' && <Draft />}
    </>
  )
}
