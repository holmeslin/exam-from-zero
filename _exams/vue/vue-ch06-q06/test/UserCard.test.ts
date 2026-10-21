import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test, vi } from 'vitest'
import UserCard from './UserCard.vue'

type Pending = { url: string; resolve: (r: unknown) => void }
let pending: Pending[] = []

function reply(url: string, status: number, body: unknown) {
  const p = pending.find((x) => x.url === url)
  if (!p) throw new Error(`沒有發出 ${url} 的請求`)
  p.resolve({ ok: status >= 200 && status < 300, status, json: async () => body })
}

function setup() {
  pending = []
  vi.stubGlobal('fetch', (url: string) => new Promise((resolve) => pending.push({ url: String(url), resolve })))
  return mount(UserCard)
}

afterEach(() => vi.unstubAllGlobals())

const U = 'https://jsonplaceholder.typicode.com/users/'

test('一打開就抓 1 號並顯示', async () => {
  const w = setup()
  await flushPromises()
  expect(w.find('.status').text(), '抓資料時要顯示「載入中……」').toBe('載入中……')
  reply(U + '1', 200, { name: 'Leanne Graham' })
  await flushPromises()
  expect(w.find('.status').text()).toBe('Leanne Graham')
})

test('晚回來的 1 號不可以蓋掉 2 號', async () => {
  const w = setup()
  await flushPromises()
  await w.findAll('button')[1].trigger('click')
  await flushPromises()
  reply(U + '2', 200, { name: 'Ervin Howell' })
  await flushPromises()
  reply(U + '1', 200, { name: 'Leanne Graham' })
  await flushPromises()
  expect(w.find('.status').text(), '選了 2 號，畫面卻被晚回來的 1 號蓋掉了（競態）').toBe('Ervin Howell')
})

test('過期請求的錯誤也不該顯示', async () => {
  const w = setup()
  await flushPromises()
  await w.findAll('button')[1].trigger('click')
  await flushPromises()
  reply(U + '2', 200, { name: 'Ervin Howell' })
  await flushPromises()
  reply(U + '1', 500, {})
  await flushPromises()
  expect(w.find('.status').text(), '過期請求的錯誤不該顯示出來').toBe('Ervin Howell')
})

test('404 顯示錯誤訊息', async () => {
  const w = setup()
  await flushPromises()
  reply(U + '1', 200, { name: 'Leanne Graham' })
  await flushPromises()
  await w.findAll('button')[2].trigger('click')
  await flushPromises()
  reply(U + '999', 404, {})
  await flushPromises()
  expect(w.find('.status').text()).toBe('出錯了：伺服器回應失敗：404')
})
