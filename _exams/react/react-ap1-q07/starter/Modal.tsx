import type { ReactNode } from 'react'

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  // TODO：改用 createPortal，把對話視窗渲染到 document.body 底下
  return (
    <div role="dialog">
      <p>{children}</p>
      <button onClick={onClose}>關閉</button>
    </div>
  )
}
