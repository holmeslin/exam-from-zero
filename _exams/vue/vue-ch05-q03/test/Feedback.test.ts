import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Feedback from './Feedback.vue'

test('送出表單時阻止預設行為並計數', async () => {
  const w = mount(Feedback)
  const form = w.find('form').element
  const ev = new Event('submit', { cancelable: true })
  form.dispatchEvent(ev)
  expect(ev.defaultPrevented, '送出事件沒有被阻止，瀏覽器會重新載入頁面：<form> 要用 @submit.prevent').toBe(true)
  await w.vm.$nextTick()
  expect(w.find('p').text(), '送出一次後應該顯示「已送出 1 次」').toBe('已送出 1 次')
  await w.find('form').trigger('submit')
  expect(w.find('p').text(), '送出兩次後應該顯示「已送出 2 次」').toBe('已送出 2 次')
})
