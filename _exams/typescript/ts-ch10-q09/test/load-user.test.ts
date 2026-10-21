import { expect, test } from 'vitest'
import { loadUser } from './load-user.ts'

test('正常的回應', async () => {
  const res = new Response(JSON.stringify({ name: '小明', age: 20 }))
  expect(await loadUser(res)).toEqual({ name: '小明', age: 20 })
})

test('狀態碼不正常時丟出「伺服器回應 狀態碼」', async () => {
  await expect(loadUser(new Response('找不到', { status: 404 }))).rejects.toThrow('伺服器回應 404')
  await expect(loadUser(new Response('{}', { status: 500 }))).rejects.toThrow('伺服器回應 500')
})

test('資料格式不對時丟出「資料格式不對」', async () => {
  await expect(loadUser(new Response(JSON.stringify({ name: '小華' })))).rejects.toThrow('資料格式不對')
  await expect(loadUser(new Response(JSON.stringify({ name: '小美', age: '二十' })))).rejects.toThrow('資料格式不對')
})
