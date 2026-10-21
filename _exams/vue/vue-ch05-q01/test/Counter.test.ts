import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import Counter from './Counter.vue'

test('點兩次「加一」後畫面顯示 2', async () => {
  const w = mount(Counter)
  expect(w.find('p').text(), '一開始應該顯示「目前：0」').toBe('目前：0')
  await w.find('button').trigger('click')
  await w.find('button').trigger('click')
  expect(w.find('p').text(), '點了兩次，畫面卻沒有更新：count 是不是普通變數？').toBe('目前：2')
})

test('每個元件實例有自己的 count', async () => {
  const a = mount(Counter)
  const b = mount(Counter)
  await a.find('button').trigger('click')
  expect(b.find('p').text(), '點了 a 的按鈕，b 不應該跟著變').toBe('目前：0')
})
