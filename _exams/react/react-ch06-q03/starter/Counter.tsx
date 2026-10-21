import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  // TODO：讓分頁標題永遠是「你點了 N 次」

  return <button onClick={() => setCount(count + 1)}>點了 {count} 次</button>
}
