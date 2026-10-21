import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'

const html = readFileSync(`${import.meta.dirname}/index.html`, 'utf8')
const doc = new DOMParser().parseFromString(html, 'text/html')

test('第一行是 <!DOCTYPE html>', () => {
  expect(html.trimStart().toLowerCase().startsWith('<!doctype html>'), '檔案第一行要是 <!DOCTYPE html>').toBe(true)
})

test('<html> 標明繁體中文', () => {
  expect(doc.documentElement.getAttribute('lang'), '<html> 要有 lang="zh-TW"').toBe('zh-TW')
})

test('<head> 裡有文字編碼與標題', () => {
  const meta = doc.head.querySelector('meta[charset]')
  expect(meta, '<head> 裡要有 <meta charset="UTF-8" />').not.toBeNull()
  expect(meta!.getAttribute('charset')!.toUpperCase(), 'charset 的值要是 UTF-8').toBe('UTF-8')
  expect(doc.head.querySelector('title')?.textContent?.trim(), '<title> 要是「我的第一個網頁」').toBe('我的第一個網頁')
})

test('畫面內容留在 <body>', () => {
  expect(doc.body.querySelector('h1')?.textContent?.trim(), '<body> 裡要保留 <h1>哈囉，世界！</h1>').toBe('哈囉，世界！')
  expect(doc.body.querySelector('p')?.textContent?.trim(), '<body> 裡要保留原本的段落').toBe('這是我寫的第一個網頁。')
})
