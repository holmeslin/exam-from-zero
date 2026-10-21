import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  function handleAddThree() {
    setCount((current) => current + 1)
    setCount((current) => current + 1)
    setCount((current) => current + 1)
  }

  return (
    <div>
      <p>count：{count}</p>
      <button onClick={handleAddThree}>加三</button>
    </div>
  )
}
