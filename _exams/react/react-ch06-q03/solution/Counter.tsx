import { useEffect, useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `你點了 ${count} 次`
  })

  return <button onClick={() => setCount(count + 1)}>點了 {count} 次</button>
}
