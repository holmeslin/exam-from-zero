export type User = { id: number; name: string }

const users: User[] = [
  { id: 1, name: '小明' },
  { id: 2, name: '小華' },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// 刻意讓 1 號比 2 號慢，模擬網路速度不穩
export async function fetchUser(id: number): Promise<User> {
  await delay(id === 1 ? 2000 : 500)
  const user = users.find((u) => u.id === id)
  if (!user) throw new Error('找不到使用者')
  return user
}
