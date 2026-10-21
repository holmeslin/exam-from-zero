// @vitest-environment node
import { expect, test } from 'vitest'
import { action, messages } from './guestbook'

function post(fields: Record<string, string>) {
  return new Request('http://localhost/guestbook', {
    method: 'POST',
    body: new URLSearchParams(fields),
  })
}

test('空白的表單回傳錯誤，不加進陣列', async () => {
  const result = await action({ request: post({ name: '  ', text: '哈囉' }) })
  expect(result).toEqual({ error: '請輸入名字與留言' })
  expect(messages, '驗證失敗時不該 push').toEqual([])
})

test('缺少欄位也算錯誤', async () => {
  const result = await action({ request: post({ name: '小明' }) })
  expect(result).toEqual({ error: '請輸入名字與留言' })
  expect(messages).toEqual([])
})

test('成功時去掉前後空白後加進陣列，回傳 { error: null }', async () => {
  const result = await action({ request: post({ name: ' 小明 ', text: ' 你好 ' }) })
  expect(result).toEqual({ error: null })
  expect(messages).toEqual([{ name: '小明', text: '你好' }])
})
