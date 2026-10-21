export type User = { name: string; age: number }

export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    typeof value.name === 'string' &&
    'age' in value &&
    typeof value.age === 'number'
  )
}

export async function loadUser(res: Response): Promise<User> {
  if (!res.ok) {
    throw new Error(`伺服器回應 ${res.status}`)
  }
  const data: unknown = await res.json()
  if (!isUser(data)) {
    throw new Error('資料格式不對')
  }
  return data
}
