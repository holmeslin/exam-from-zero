import { useEffect, useState } from 'react'

export function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setInterval(() => setSeconds((s) => s + 1), 1000)
  }, [])

  return <p>{seconds} 秒</p>
}
