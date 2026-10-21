import { mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import MessageBox from './MessageBox.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

test('一掛載輸入框就取得游標', () => {
  const w = mount(MessageBox, { attachTo: document.body })
  expect(document.activeElement, '掛載後游標應該在輸入框裡').toBe(w.find('input').element)
  w.unmount()
})

test('按清除會清空文字並把游標放回輸入框', async () => {
  const w = mount(MessageBox, { attachTo: document.body })
  const input = w.find('input')
  await input.setValue('你好')
  const button = w.find('button')
  ;(button.element as HTMLButtonElement).focus()
  await button.trigger('click')
  expect((input.element as HTMLInputElement).value, '按清除後輸入框要是空的').toBe('')
  expect(document.activeElement, '按清除後游標應該回到輸入框').toBe(input.element)
  w.unmount()
})
