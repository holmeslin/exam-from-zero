import { readFileSync } from 'node:fs'
import { beforeAll, expect, test } from 'vitest'

beforeAll(() => {
  const css = readFileSync(`${import.meta.dirname}/style.css`, 'utf8')
  document.head.innerHTML = `<style>${css}</style>`
  document.body.innerHTML = `
    <nav class="navbar">
      <span class="logo">我的網站</span>
      <div class="links">
        <a href="#">首頁</a>
        <a href="#">關於</a>
        <a href="#">聯絡</a>
      </div>
    </nav>`
})

const style = (sel: string) => getComputedStyle(document.querySelector(sel)!)

test('外層：logo 推到左邊、連結推到右邊，上下置中', () => {
  const s = style('.navbar')
  expect(s.display, '.navbar 的 display 應該是 flex').toBe('flex')
  expect(s.justifyContent, '.navbar 的 justify-content 應該是 space-between（兩端貼邊）').toBe('space-between')
  expect(s.alignItems, '.navbar 的 align-items 應該是 center（垂直置中）').toBe('center')
})

test('內層：三個連結排成一列，間距 16px', () => {
  const s = style('.links')
  expect(s.display, '.links 也要是 flex 容器').toBe('flex')
  expect(s.gap, '.links 的 gap 應該是 16px').toBe('16px')
})

test('連結沒有底線', () => {
  expect(style('.links a').textDecoration, '.links a 要用 text-decoration: none 拿掉底線').toBe('none')
})
