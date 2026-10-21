import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return createPortal(
    <div role="dialog">
      <p>{children}</p>
      <button onClick={onClose}>關閉</button>
    </div>,
    document.body,
  )
}
