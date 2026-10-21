// @vitest-environment jsdom
import { expect, test } from 'vitest'
import { getInput } from './getInput.ts'

test('找到輸入框時回傳它', () => {
  document.body.innerHTML = '<input id="name" value="小明" />'
  const input = getInput('#name')
  expect(input, '應該回傳 HTMLInputElement').toBeInstanceOf(HTMLInputElement)
  expect(input.value).toBe('小明')
})

test('找不到元素時要丟出錯誤', () => {
  document.body.innerHTML = ''
  expect(() => getInput('#name'), '找不到 #name 時應該 throw，訊息包含 selector').toThrow('#name')
})

test('元素存在但不是 <input> 時也要丟出錯誤', () => {
  document.body.innerHTML = '<textarea id="name"></textarea>'
  expect(() => getInput('#name'), '#name 是 <textarea> 不是輸入框，應該 throw').toThrow('#name')
})
