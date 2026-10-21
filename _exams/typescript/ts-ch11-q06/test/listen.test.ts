// @vitest-environment jsdom
import { expect, test } from 'vitest'
import { listenInputs } from './listen.ts'

function setup() {
  document.body.innerHTML = `
    <div id="root">
      <input id="name" />
      <input id="city" />
      <textarea id="note"></textarea>
    </div>`
  const root = document.querySelector('#root') as HTMLElement
  const messages: string[] = []
  listenInputs(root, (m) => messages.push(m))
  return messages
}

function type(selector: string, value: string) {
  const el = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement
  el.value = value
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

test('任何一個輸入框打字都要記錄 id 和 value', () => {
  const messages = setup()
  type('#name', '小明')
  type('#city', '台北')
  expect(messages, '應該依序記錄「id：value」').toEqual(['name：小明', 'city：台北'])
})

test('不是 <input> 觸發的事件不理會', () => {
  const messages = setup()
  type('#note', '備註')
  expect(messages, '<textarea> 觸發的 input 事件不應該被記錄').toEqual([])
})
