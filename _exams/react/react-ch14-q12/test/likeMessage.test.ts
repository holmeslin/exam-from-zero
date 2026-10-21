import { expect, test } from 'vitest'
import { likeMessage } from './likes.ts'

const old = [
  { id: 'a', name: '小明', text: '你好' },
  { id: 'b', name: '小華', text: '好書', likes: 3 },
]

test('按讚：相符的那則加一', () => {
  expect(likeMessage(old, 'b').map((m) => m.likes), 'b 原本 3 個讚，要變成 4；a 沒有 likes 要補成 0').toEqual([0, 4])
})

test('舊留言沒有 likes 欄位，當成 0 個讚', () => {
  expect(likeMessage(old, 'a').map((m) => m.likes), 'a 沒有 likes，按讚後要是 1').toEqual([1, 3])
})

test('id 不是字串或找不到時不加讚', () => {
  expect(likeMessage(old, null).map((m) => m.likes), 'id 是 null 時不能加讚').toEqual([0, 3])
  expect(likeMessage(old, 'zzz').map((m) => m.likes), '找不到 id 時不能加讚').toEqual([0, 3])
})

test('不要修改傳進來的陣列', () => {
  const input = [{ id: 'a', name: '小明', text: '你好', likes: 1 }]
  const result = likeMessage(input, 'a')
  expect(input[0].likes, '原本的物件不能被改掉').toBe(1)
  expect(result[0], '其他欄位要保留').toEqual({ id: 'a', name: '小明', text: '你好', likes: 2 })
})
