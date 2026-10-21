import { mount } from '@vue/test-utils'
import { expect, test, vi } from 'vitest'
import ClickCounter from './ClickCounter.vue'

test('按兩下變成「點了 2 次」', async () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const w = mount(ClickCounter)
  expect(w.text(), '一開始應該顯示「點了 0 次」').toBe('點了 0 次')
  await w.find('button').trigger('click').catch(() => {})
  await w.find('button').trigger('click').catch(() => {})
  expect(w.text(), '按兩下之後應該顯示「點了 2 次」；methods 裡的函式拿得到 this 嗎？').toBe('點了 2 次')
})
