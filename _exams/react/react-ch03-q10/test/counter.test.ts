import { beforeEach, expect, test } from 'vitest'
import { setupCounter } from './counter'

beforeEach(() => {
  document.body.innerHTML = `
    <p>你按了 <span id="count">0</span> 次</p>
    <button id="add">按我</button>
    <button id="reset">歸零</button>
  `
  setupCounter(document.body)
})

const count = () => document.querySelector('#count')!.textContent
const click = (id: string) => (document.querySelector(id) as HTMLButtonElement).click()

test('按「按我」數字會增加', () => {
  click('#add')
  click('#add')
  click('#add')
  expect(count(), '按三次之後，#count 的文字應該是 3（記得改 textContent）').toBe('3')
})

test('按「歸零」數字回到 0，之後還能繼續加', () => {
  click('#add')
  click('#add')
  click('#reset')
  expect(count(), '按「歸零」之後，#count 的文字應該是 0').toBe('0')
  click('#add')
  expect(count(), '歸零後再按一次，應該是 1（變數 count 也要歸零）').toBe('1')
})
