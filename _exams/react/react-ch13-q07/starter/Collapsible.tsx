'use client'

import { useState } from 'react'

export default function Collapsible({ children }: { children: React.ReactNode }) {
  // TODO: 用 open 狀態控制 children 要不要顯示，按鈕文字也要跟著換
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button>看簡介</button>
    </div>
  )
}
