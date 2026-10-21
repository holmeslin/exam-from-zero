import { beforeEach, expect, test } from 'vitest'
import { html } from './page'

beforeEach(() => {
  document.body.innerHTML = html
})

test('水果用沒有順序的清單列出', () => {
  const ul = document.querySelector('ul')
  expect(ul, '找不到 <ul>，沒有順序的清單要用 <ul>').not.toBeNull()
  const items = [...ul!.querySelectorAll('li')].map((li) => li.textContent?.trim())
  expect(items, '<ul> 裡應該有兩個 <li>：蘋果、香蕉').toEqual(['蘋果', '香蕉'])
})

test('圖片有 alt 文字說明', () => {
  const img = document.querySelector('img')
  expect(img, '找不到 <img>').not.toBeNull()
  expect(img!.getAttribute('src'), '<img> 的 src 應該是 apple.jpg').toBe('apple.jpg')
  expect((img!.getAttribute('alt') ?? '').trim(), '<img> 要寫 alt，而且不能是空的').not.toBe('')
})

test('「維基百科」是連到維基百科的連結', () => {
  const a = document.querySelector('a')
  expect(a, '找不到 <a>，連結要用 <a>').not.toBeNull()
  expect(a!.getAttribute('href'), '<a> 的 href 應該是 https://www.wikipedia.org/').toBe('https://www.wikipedia.org/')
  expect(a!.textContent?.trim(), '連結上可以點的字應該是「維基百科」').toBe('維基百科')
})
