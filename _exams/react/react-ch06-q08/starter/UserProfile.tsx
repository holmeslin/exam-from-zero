import { useEffect, useState } from 'react'
import { fetchUser, type User } from './api.ts'

export function UserProfile({ id }: { id: number }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetchUser(id).then((data) => setUser(data))
  }, [id])

  if (user === null) return <p>載入中……</p>
  return <p>使用者：{user.name}</p>
}
