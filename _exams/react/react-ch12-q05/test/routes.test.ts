import { expect, test } from 'vitest'
import { pageFileToUrl } from './routes'

test('app/page.tsx 對應首頁 /', () => {
  expect(pageFileToUrl('app/page.tsx'), "pageFileToUrl('app/page.tsx')").toBe('/')
})

test('資料夾結構就是網址結構', () => {
  expect(pageFileToUrl('app/about/page.tsx'), "pageFileToUrl('app/about/page.tsx')").toBe('/about')
  expect(pageFileToUrl('app/books/page.tsx'), "pageFileToUrl('app/books/page.tsx')").toBe('/books')
  expect(pageFileToUrl('app/books/hot/page.tsx'), "pageFileToUrl('app/books/hot/page.tsx')").toBe('/books/hot')
})

test('不是 page.tsx 的檔案不會變成網址', () => {
  expect(pageFileToUrl('app/lib/books.ts'), "pageFileToUrl('app/lib/books.ts')").toBeNull()
  expect(pageFileToUrl('app/books/layout.tsx'), "pageFileToUrl('app/books/layout.tsx')").toBeNull()
  expect(pageFileToUrl('app/layout.tsx'), "pageFileToUrl('app/layout.tsx')").toBeNull()
})
