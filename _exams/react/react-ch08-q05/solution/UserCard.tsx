import { use } from 'react'

type User = { id: number; name: string }

const users: User[] = [
  { id: 1, name: '小明' },
  { id: 2, name: '小華' },
]

export async function fetchUser(id: number): Promise<User | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 20)) // 模擬網路延遲
  return users.find((user) => user.id === id)
}

const cache = new Map<number, Promise<User | undefined>>()

export function loadUser(id: number): Promise<User | undefined> {
  if (!cache.has(id)) cache.set(id, fetchUser(id))
  return cache.get(id)!
}

export function UserCard({ id }: { id: number }) {
  const user = use(loadUser(id))
  return <p>使用者：{user?.name}</p>
}
