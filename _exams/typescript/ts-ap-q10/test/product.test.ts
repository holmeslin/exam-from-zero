import { expect, test } from 'vitest'
import { checkProduct } from './product.ts'

const good = { id: 1, name: '鉛筆', price: 10, tags: ['文具'], status: 'draft' }

function paths(input: unknown): string[] {
  const result = checkProduct(input)
  return result.success ? [] : result.issues.map((issue) => issue.path)
}

test('合格的資料回傳 success: true 和 data', () => {
  expect(checkProduct(good)).toEqual({ success: true, data: good })
})

test('一次列出全部的問題，不在第一個錯就停', () => {
  expect(
    paths({ id: 1, name: '', price: -5, tags: ['文具'], status: 'deleted' }),
    '應該依序列出 name、price、status 三個問題',
  ).toEqual(['name', 'price', 'status'])
})

test('每個屬性的規則', () => {
  expect(paths({ ...good, id: 1.5 }), 'id 要是整數').toEqual(['id'])
  expect(paths({ ...good, id: 0 }), 'id 要是正數').toEqual(['id'])
  expect(paths({ ...good, price: 0 }), 'price 是 0 可以').toEqual([])
  expect(paths({ ...good, tags: ['a', 1] }), 'tags 每個元素都要是字串').toEqual(['tags'])
  expect(paths({ ...good, tags: 'a' }), 'tags 要是陣列').toEqual(['tags'])
  expect(paths({ ...good, status: 'published' })).toEqual([])
})

test('全部錯的時候五個屬性都要列出來', () => {
  expect(paths({})).toEqual(['id', 'name', 'price', 'tags', 'status'])
})

test('每個問題都要有說明文字', () => {
  const result = checkProduct({})
  expect(result.success).toBe(false)
  if (!result.success) {
    for (const issue of result.issues) {
      expect(typeof issue.message === 'string' && issue.message.length > 0, 'message 不能是空字串').toBe(true)
    }
  }
})

test('不是物件就回傳路徑為空字串的問題', () => {
  expect(paths(null)).toEqual([''])
  expect(paths('鉛筆')).toEqual([''])
})
