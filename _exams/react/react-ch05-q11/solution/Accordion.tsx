import { useState } from 'react'
import type { ReactNode } from 'react'

function Panel({
  title,
  isOpen,
  onShow,
  children,
}: {
  title: string
  isOpen: boolean
  onShow: () => void
  children: ReactNode
}) {
  return (
    <section>
      <h3>{title}</h3>
      {isOpen ? <p>{children}</p> : <button onClick={onShow}>顯示</button>}
    </section>
  )
}

export function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div>
      <Panel title="關於" isOpen={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        我們是一間賣電腦周邊的小店。
      </Panel>
      <Panel title="營業時間" isOpen={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        週一到週五，早上九點到晚上六點。
      </Panel>
    </div>
  )
}
