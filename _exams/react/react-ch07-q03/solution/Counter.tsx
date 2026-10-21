import { useReducer } from 'react'

export function counterReducer(count: number, action: { type: string }): number {
  switch (action.type) {
    case 'incremented':
      return count + 1
    case 'decremented':
      return Math.max(0, count - 1)
    case 'reset':
      return 0
    default:
      throw new Error(`未知的 action：${action.type}`)
  }
}

export function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0)
  return (
    <>
      <p>目前：{count}</p>
      <button onClick={() => dispatch({ type: 'incremented' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decremented' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>歸零</button>
    </>
  )
}
