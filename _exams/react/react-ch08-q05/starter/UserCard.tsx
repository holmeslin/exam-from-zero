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
  // TODO：同樣的 id 要回傳同一個 Promise（用 cache 存起來）
  return fetchUser(id)
}

export function UserCard({ id }: { id: number }) {
  const user = use(loadUser(id))
  return <p>使用者：{user?.name}</p>
}
