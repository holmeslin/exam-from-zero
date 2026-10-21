// @vitest-environment node
import { expect, test } from 'vitest'
import { loader } from './search'

const get = (url: string) => new Request(url)

test('沒有 ?name= 時回傳全部留言', async () => {
  const data = await loader({ request: get('http://localhost/guestbook') })
  expect(data.messages).toHaveLength(3)
})

test('?name=小明 只回傳小明的留言', async () => {
  const data = await loader({ request: get('http://localhost/guestbook?name=' + encodeURIComponent('小明')) })
  expect(data.messages.map((m) => m.text)).toEqual(['你好', '今天天氣很好'])
})

test('?name= 是空字串時回傳全部留言', async () => {
  const data = await loader({ request: get('http://localhost/guestbook?name=') })
  expect(data.messages).toHaveLength(3)
})
