import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import MenuPanel from './MenuPanel.vue'

test('關閉時元素還在，只是藏起來', () => {
  const w = mount(MenuPanel, { props: { open: false } })
  const menu = w.find('.menu')
  expect(menu.exists(), '關閉時 .menu 應該還在 HTML 裡（不是被拿掉）').toBe(true)
  expect((menu.element as HTMLElement).style.display, '關閉時應該是 display: none').toBe('none')
})

test('打開時正常顯示', () => {
  const w = mount(MenuPanel, { props: { open: true } })
  const menu = w.find('.menu')
  expect(menu.exists()).toBe(true)
  expect((menu.element as HTMLElement).style.display, '打開時不該有 display: none').toBe('')
  expect(menu.findAll('a').length).toBe(2)
})
