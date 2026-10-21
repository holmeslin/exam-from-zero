import { useRef } from 'react'

export function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input ref={inputRef} placeholder="搜尋" />
      <button onClick={() => inputRef.current?.focus()}>聚焦輸入框</button>
    </>
  )
}
