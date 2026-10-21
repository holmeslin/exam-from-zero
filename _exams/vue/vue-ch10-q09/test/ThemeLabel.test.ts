import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { ref } from 'vue'
import { themeKey } from './keys'
import ThemeLabel from './ThemeLabel.vue'

test('外層用 themeKey 提供 dark 時顯示深色', () => {
  const w = mount(ThemeLabel, { global: { provide: { [themeKey as symbol]: ref('dark') } } })
  expect(w.text(), '外層 provide(themeKey, ref("dark")) 時應顯示「目前是 深色」').toBe('目前是 深色')
})

test('主題改變時畫面跟著更新', async () => {
  const theme = ref('dark')
  const w = mount(ThemeLabel, { global: { provide: { [themeKey as symbol]: theme } } })
  theme.value = 'light'
  await w.vm.$nextTick()
  expect(w.text(), '把提供的 ref 改成 "light" 後應顯示「目前是 淺色」').toBe('目前是 淺色')
})

test('沒有外層提供時用預設值 light', () => {
  const w = mount(ThemeLabel)
  expect(w.text(), '沒有 provide 時，inject 的預設值 ref("light") 應讓畫面顯示「目前是 淺色」').toBe('目前是 淺色')
})
