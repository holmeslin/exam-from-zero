import { useEffect } from 'react'

export function Greeting({ name, count }: { name: string; count: number }) {
  useEffect(() => {
    document.title = `${name} 點了 ${count} 次`
  }, [name, count])

  return <p>{name}</p>
}
