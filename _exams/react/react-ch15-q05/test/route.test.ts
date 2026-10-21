import { expect, test } from 'vitest'
import { GET, POST } from './route'

const post = (body: string) =>
  POST(new Request('http://localhost/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }))

test('不是 JSON 的內容要回傳 400，而不是丟出錯誤', async () => {
  const res = await post('這不是 JSON')
  expect(res.status, '無效的 JSON 應該回傳 400').toBe(400)
  expect(await res.json()).toEqual({ error: '請輸入名字' })
})

test('缺少名字或留言要回傳 400 與錯誤訊息', async () => {
  const noName = await post(JSON.stringify({ text: '沒有名字' }))
  expect(noName.status, '缺少 name 應該回傳 400').toBe(400)
  expect(await noName.json()).toEqual({ error: '請輸入名字' })
  const blankText = await post(JSON.stringify({ name: '小明', text: '   ' }))
  expect(blankText.status, '空白的 text 應該回傳 400').toBe(400)
  expect(await blankText.json()).toEqual({ error: '請輸入留言' })
  expect(await (await GET()).json(), '驗證失敗時不該新增留言').toEqual([])
})

test('正確的留言回傳 201，之後 GET 拿得到', async () => {
  const res = await post(JSON.stringify({ name: ' 小明 ', text: '來自 API' }))
  expect(res.status, '新增成功應該回傳 201').toBe(201)
  expect(await res.json()).toEqual({ ok: true })
  expect(await (await GET()).json()).toEqual([{ name: '小明', text: '來自 API' }])
})
