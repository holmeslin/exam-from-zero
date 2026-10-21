import { readFileSync } from 'node:fs'
import { beforeAll, expect, test } from 'vitest'

beforeAll(() => {
  const css = readFileSync(`${import.meta.dirname}/style.css`, 'utf8')
  document.head.innerHTML = `<style>${css}</style>`
  document.body.innerHTML = '<div class="card" id="card">卡片</div><p id="other">其他段落</p>'
})

const card = () => getComputedStyle(document.getElementById('card')!)

test('所有元素都用 border-box', () => {
  expect(card().boxSizing, '.card 的 box-sizing 應該是 border-box').toBe('border-box')
  expect(getComputedStyle(document.getElementById('other')!).boxSizing, '不只 .card，所有元素都要是 border-box（用萬用選擇器 *）').toBe('border-box')
})

test('寬度維持 300px', () => {
  expect(card().width, '.card 的 width 應該是 300px').toBe('300px')
})

test('內距：上下 10px、左右 20px', () => {
  const s = card()
  expect([s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft], 'padding 依序（上、右、下、左）應該是 10px 20px 10px 20px').toEqual(['10px', '20px', '10px', '20px'])
})

test('邊框：2px 實線橘色', () => {
  const s = card()
  expect(s.borderTopWidth, '邊框粗細應該是 2px').toBe('2px')
  expect(s.borderTopStyle, '邊框樣式應該是 solid').toBe('solid')
  expect(s.borderTopColor, '邊框顏色應該是 orange').toBe('rgb(255, 165, 0)')
})

test('水平置中：上下外距 0、左右 auto', () => {
  const s = card()
  expect([s.marginTop, s.marginBottom], '上下外距應該是 0').toEqual(['0px', '0px'])
  expect([s.marginLeft, s.marginRight], '左右外距應該是 auto').toEqual(['auto', 'auto'])
})
