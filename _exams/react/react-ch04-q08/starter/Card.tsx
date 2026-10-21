import type { ReactNode } from 'react'

// TODO: 讓 Card 可以像 HTML 標籤一樣包住內容：
// 畫出 <section className="card">，裡面先放 <h2>{title}</h2>，再放標籤中間的內容
export function Card({ title }: { title: string; children?: ReactNode }) {
  return (
    <section className="card">
      <h2>{title}</h2>
    </section>
  )
}
