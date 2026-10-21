// @vitest-environment jsdom
import { beforeEach, expect, test } from 'vitest'
import { setTitle } from './title.ts'

beforeEach(() => {
  document.body.innerHTML = ''
})

test('有 #title 時要換掉它的文字', () => {
  document.body.innerHTML = '<h1 id="title">標題</h1>'
  setTitle('你好，TypeScript')
  expect(document.querySelector('#title')?.textContent, '#title 的文字應該被換掉').toBe('你好，TypeScript')
})

test('找不到 #title 時要丟出錯誤，訊息包含 #title', () => {
  document.body.innerHTML = '<h1 id="other">標題</h1>'
  expect(() => setTitle('x'), '找不到元素時應該 throw，且訊息包含 "#title"').toThrow('#title')
})
