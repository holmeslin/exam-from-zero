import { mount } from '@vue/test-utils'
import { defineComponent, h, inject, unref } from 'vue'
import { expect, test } from 'vitest'
import ThemeRoot from './ThemeRoot.vue'

// 中間隔一層，模擬「路過」的元件
const ThemeButton = defineComponent({
  setup() {
    const injected = inject<any>('theme')
    return () =>
      h('button', { class: 'theme-btn', onClick: injected.toggleTheme }, `現在是 ${unref(injected.theme)}`)
  },
})
const ToolBar = defineComponent({ setup: () => () => h('div', [h(ThemeButton)]) })

test('深處的元件拿得到主題，按了之後兩邊都跟著變', async () => {
  const w = mount(ThemeRoot, { slots: { default: () => h(ToolBar) } })
  const btn = w.find('.theme-btn')
  expect(btn.text()).toBe('現在是 light')
  await btn.trigger('click')
  expect(w.find('.current').text(), '按下後 ThemeRoot 自己的主題要變成 dark').toBe('目前主題：dark')
  expect(w.find('.theme-btn').text(), '按下後深處的按鈕也要顯示 dark；provide 出去的是會變的東西嗎？').toBe('現在是 dark')
})
