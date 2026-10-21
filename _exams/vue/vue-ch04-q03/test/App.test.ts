import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import App from './App.vue'
import AppFooter from './AppFooter.vue'
import AppHeader from './AppHeader.vue'

test('App 裡用到 AppHeader 和 AppFooter', () => {
  const w = mount(App)
  expect(w.findComponent(AppHeader).exists(), '畫面上找不到 AppHeader 元件').toBe(true)
  expect(w.findComponent(AppFooter).exists(), '畫面上找不到 AppFooter 元件').toBe(true)
})

test('順序是 header、main、footer', () => {
  const w = mount(App, { attachTo: document.body })
  const tags = Array.from(document.body.querySelectorAll('header, main, footer')).map((el) => el.tagName.toLowerCase())
  w.unmount()
  expect(tags, '畫面由上到下應該是 header、main、footer').toEqual(['header', 'main', 'footer'])
})
