import { useEffect, useState } from 'react'
import { fetchUser, type User } from './api.ts'

type Result = { id: number; user?: User; error?: string }

export function UserProfile({ id }: { id: number }) {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    let ignore = false

    fetchUser(id)
      .then((user) => {
        if (!ignore) setResult({ id, user })
      })
      .catch((error: Error) => {
        if (!ignore) setResult({ id, error: error.message })
      })

    return () => {
      ignore = true
    }
  }, [id])

  if (result === null || result.id !== id) return <p>載入中……</p>
  if (result.error) return <p>出錯了：{result.error}</p>
  return <p>使用者：{result.user!.name}</p>
}
