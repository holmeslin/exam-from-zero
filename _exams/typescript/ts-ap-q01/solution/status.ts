export const Status = {
  Active: 'active',
  Inactive: 'inactive',
} as const

export type Status = (typeof Status)[keyof typeof Status]

export function describe(status: Status): string {
  return status === Status.Active ? '使用中' : '已停用'
}
