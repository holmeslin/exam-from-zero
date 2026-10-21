'use client'

import { useState } from 'react'

export default function Collapsible({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setOpen(!open)}>{open ? '收起來' : '看簡介'}</button>
      {open && <div>{children}</div>}
    </div>
  )
}
