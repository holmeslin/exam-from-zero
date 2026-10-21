import { useState } from 'react'

export function Toggle() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? '收起' : '展開'}</button>
      {isOpen && <p>這是被藏起來的內容。</p>}
    </div>
  )
}
