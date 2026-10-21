import { expect, test } from 'vitest'
import { htmlOf, routeOf } from './vitepress'

test('routeOf：每個 .md 檔對應一個網址', () => {
  expect(routeOf('api-examples.md')).toBe('/api-examples')
  expect(routeOf('counter.md')).toBe('/counter')
  expect(routeOf('guide/intro.md'), '子資料夾也要保留在網址裡').toBe('/guide/intro')
  expect(routeOf('index.md'), 'index.md 是首頁').toBe('/')
})

test('htmlOf：建置後每一頁是一個 .html 檔', () => {
  expect(htmlOf('counter.md')).toBe('counter.html')
  expect(htmlOf('index.md')).toBe('index.html')
  expect(htmlOf('guide/intro.md')).toBe('guide/intro.html')
})
