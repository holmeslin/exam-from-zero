import { useRef } from 'react'

export function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input placeholder="搜尋" />
      {/* TODO：按下按鈕時讓輸入框取得游標 */}
      <button onClick={() => {}}>聚焦輸入框</button>
    </>
  )
}
