export type User = { name: string; age: number }

export function isUser(value: unknown): value is User {
  // TODO: 每個屬性都要檢查「存在」與「型別」
  return typeof value === 'object' && value !== null
}
