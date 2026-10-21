import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  function handleAddThree() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <div>
      <p>count：{count}</p>
      <button onClick={handleAddThree}>加三</button>
    </div>
  )
}
