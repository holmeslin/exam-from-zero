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
