import { useState } from 'react'
import type { ReactNode } from 'react'

function Panel({ title, children }: { title: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section>
      <h3>{title}</h3>
      {isOpen ? <p>{children}</p> : <button onClick={() => setIsOpen(true)}>顯示</button>}
    </section>
  )
}

export function Accordion() {
  return (
    <div>
      <Panel title="關於">我們是一間賣電腦周邊的小店。</Panel>
      <Panel title="營業時間">週一到週五，早上九點到晚上六點。</Panel>
    </div>
  )
}
