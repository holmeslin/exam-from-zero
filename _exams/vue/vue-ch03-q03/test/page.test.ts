import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'

const html = readFileSync(`${import.meta.dirname}/index.html`, 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

test('三個 div 換成有語意的標籤', () => {
  expect(doc.querySelector('header h1')?.textContent?.trim(), '<h1> 要放在 <header> 裡').toBe('水果介紹')
  expect(doc.querySelector('main img'), '圖片要放在 <main> 裡').not.toBeNull()
  expect(doc.querySelector('main a'), '連結要放在 <main> 裡').not.toBeNull()
  expect(doc.querySelector('main button'), '按鈕要放在 <main> 裡').not.toBeNull()
  expect(doc.querySelector('footer p')?.textContent, '「製作：我自己」要放在 <footer> 裡').toContain('製作')
  expect(doc.querySelectorAll('body > div').length, '<body> 底下不該再有 <div>').toBe(0)
})

test('圖片有文字說明', () => {
  const img = doc.querySelector('img')!
  expect(img.getAttribute('src'), 'src 保持 apple.jpg').toBe('apple.jpg')
  expect((img.getAttribute('alt') ?? '').trim(), '<img> 要有不是空字串的 alt').not.toBe('')
})

test('連結在新分頁開啟', () => {
  const a = doc.querySelector('a')!
  expect(a.getAttribute('href'), 'href 保持原本的網址').toBe('https://www.wikipedia.org/')
  expect(a.getAttribute('target'), '<a> 要加上 target="_blank"').toBe('_blank')
})

test('按鈕被停用', () => {
  expect(doc.querySelector('button')!.hasAttribute('disabled'), '<button> 要加上 disabled').toBe(true)
})
