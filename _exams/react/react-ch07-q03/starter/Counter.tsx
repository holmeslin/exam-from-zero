import { useReducer } from 'react'

export function counterReducer(count: number, action: { type: string }): number {
  // TODO: 處理 incremented、decremented（不能小於 0）、reset
  return count
}

export function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0)
  return (
    <>
      <p>目前：{count}</p>
      {/* TODO: 每顆按鈕用 dispatch 報告發生了什麼事 */}
      <button>+1</button>
      <button>-1</button>
      <button>歸零</button>
    </>
  )
}
