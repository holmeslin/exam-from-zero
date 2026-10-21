// @vitest-environment jsdom
import { afterEach, expect, test, vi } from 'vitest'
import { loadProducts, showProducts } from './show.ts'

function mockFetch(status: number, body: unknown) {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(body), { status })))
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

const good = [
  { name: '筆記本', price: 45 },
  { name: '原子筆', price: 15 },
]

test('loadProducts 回傳驗證過的資料', async () => {
  mockFetch(200, good)
  await expect(loadProducts('/products.json')).resolves.toEqual(good)
})

test('loadProducts 碰到 404 要丟出「讀取失敗：404」', async () => {
  mockFetch(404, { message: 'not found' })
  await expect(loadProducts('/products.json'), 'fetch 遇到 404 不會自己 throw，要檢查 response.ok').rejects.toThrow('讀取失敗：404')
})

test('loadProducts 格式不對要丟出「資料格式不對」', async () => {
  mockFetch(200, [{ name: '筆記本', price: '45' }])
  await expect(loadProducts('/products.json')).rejects.toThrow('資料格式不對')
})

test('showProducts 把每一筆變成 <li>', async () => {
  mockFetch(200, good)
  document.body.innerHTML = '<ul id="products"></ul>'
  const list = document.querySelector('#products') as HTMLElement
  await showProducts(list, '/products.json')
  const items = [...list.querySelectorAll('li')].map((li) => li.textContent)
  expect(items, '每一筆商品應該是一個 <li>，文字像「筆記本：45 元」').toEqual(['筆記本：45 元', '原子筆：15 元'])
})

test('showProducts 失敗時在畫面上顯示訊息', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  mockFetch(200, [{ name: '筆記本', price: '45' }])
  document.body.innerHTML = '<ul id="products"></ul>'
  const list = document.querySelector('#products') as HTMLElement
  await showProducts(list, '/products.json')
  expect(list.textContent, '錯誤要用 try...catch 接住並顯示訊息').toBe('讀取失敗，請稍後再試')
})
