import { flushPromises, mount } from '@vue/test-utils'
import { afterEach, expect, test } from 'vitest'
import Chat from './Chat.vue'

afterEach(() => {
  document.body.innerHTML = ''
})

test('送出後讀到的是更新後的畫面', async () => {
  const w = mount(Chat, { attachTo: document.body })
  await w.find('button').trigger('click')
  await flushPromises()
  expect(w.find('p').text(), '讀到的是舊畫面：改完資料要先 await nextTick() 再讀 DOM').toBe('畫面上有 3 則')
  await w.find('button').trigger('click')
  await flushPromises()
  expect(w.find('p').text()).toBe('畫面上有 4 則')
  w.unmount()
})
