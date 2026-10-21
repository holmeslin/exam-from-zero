export type User = { id: number; name: string; email: string; password: string }

// 回傳套用 changes 之後的「新」使用者，不可以修改原本的 user
export function updateUser(user: User, changes: Partial<User>): User {
  Object.assign(user, changes)
  return user
}

// 回傳不含 password 的使用者
export function toPublicUser(user: User): Omit<User, 'password'> {
  return user
}
