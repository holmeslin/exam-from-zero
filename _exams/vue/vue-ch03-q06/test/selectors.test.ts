import { readFileSync } from 'node:fs'
import { beforeAll, expect, test } from 'vitest'

beforeAll(() => {
  const css = readFileSync(`${import.meta.dirname}/style.css`, 'utf8')
  document.head.innerHTML = `<style>${css}</style>`
  document.body.innerHTML = `
    <nav><a id="nav-link">首頁</a></nav>
    <h1 id="title">水果介紹</h1>
    <h2 id="subtitle">蘋果</h2>
    <p id="plain">蘋果很甜。</p>
    <p id="warn" class="warning">注意：蘋果籽有微量毒性。</p>
    <p id="footer">製作：我自己</p>
    <a id="other-link">維基百科</a>`
})

const style = (id: string) => getComputedStyle(document.getElementById(id)!)
const GRAY = 'rgb(128, 128, 128)'
const RED = 'rgb(255, 0, 0)'
const WHITE = 'rgb(255, 255, 255)'
const NAVY = 'rgb(0, 0, 128)'

test('一般段落是灰色', () => {
  expect(style('plain').color, '<p id="plain"> 應該是 gray').toBe(GRAY)
})

test('class="warning" 的段落是紅色', () => {
  expect(style('warn').color, '有 class="warning" 的元素應該是 red（class 選擇器前面要加點）').toBe(RED)
})

test('id="footer" 的段落字比較小', () => {
  expect(style('footer').fontSize, 'id 為 footer 的元素應該是 12px（id 選擇器前面要加 #）').toBe('12px')
})

test('只有 nav 裡的連結是白色', () => {
  expect(style('nav-link').color, '<nav> 裡的 <a> 應該是 white').toBe(WHITE)
  expect(style('other-link').color, '<nav> 外面的 <a> 不該變成白色，用後代選擇器只選 nav 裡的連結').not.toBe(WHITE)
})

test('h1 和 h2 都是深藍色', () => {
  expect(style('title').color, '<h1> 應該是 navy').toBe(NAVY)
  expect(style('subtitle').color, '<h2> 也應該是 navy（用逗號把兩個選擇器寫在一起）').toBe(NAVY)
})
