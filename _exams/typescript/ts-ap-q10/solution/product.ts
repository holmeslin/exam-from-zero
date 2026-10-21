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

export function checkProduct(input: unknown): CheckResult {
  if (typeof input !== 'object' || input === null) {
    return { success: false, issues: [{ path: '', message: '不是物件' }] }
  }
  const value = input as Record<string, unknown>
  const issues: Issue[] = []
  if (typeof value.id !== 'number' || !Number.isInteger(value.id) || value.id <= 0) {
    issues.push({ path: 'id', message: '要是正整數' })
  }
  if (typeof value.name !== 'string' || value.name.length < 1) {
    issues.push({ path: 'name', message: '要是至少一個字的字串' })
  }
  if (typeof value.price !== 'number' || value.price < 0) {
    issues.push({ path: 'price', message: '要是大於等於 0 的數字' })
  }
  if (!Array.isArray(value.tags) || !value.tags.every((tag) => typeof tag === 'string')) {
    issues.push({ path: 'tags', message: '要是字串陣列' })
  }
  if (value.status !== 'draft' && value.status !== 'published') {
    issues.push({ path: 'status', message: '要是 "draft" 或 "published"' })
  }
  if (issues.length > 0) {
    return { success: false, issues }
  }
  return { success: true, data: value as Product }
}
