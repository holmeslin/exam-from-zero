export type Product = {
  id: number
  name: string
  price: number
  tags: string[]
  status: 'draft' | 'published'
}

export type Issue = { path: string; message: string }

export type CheckResult =
  | { success: true; data: Product }
  | { success: false; issues: Issue[] }

// TODO：現在碰到第一個錯就停了，要改成檢查完全部的屬性
export function checkProduct(input: unknown): CheckResult {
  if (typeof input !== 'object' || input === null) {
    return { success: false, issues: [{ path: '', message: '不是物件' }] }
  }
  const value = input as Record<string, unknown>
  if (typeof value.id !== 'number') {
    return { success: false, issues: [{ path: 'id', message: '要是正整數' }] }
  }
  if (typeof value.name !== 'string') {
    return { success: false, issues: [{ path: 'name', message: '要是至少一個字的字串' }] }
  }
  return { success: true, data: value as Product }
}
